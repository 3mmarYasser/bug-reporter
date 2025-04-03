import "../styles/content.scss"
import { createFlagIcon, createFlagTooltip, createTooltip, createReportForm } from "./dom-elements"
import { createFlagManager } from "./flag-manager"
import { createHighlightManager } from "./highlight-manager"
import { createReportService } from "./report-service"
import { showNotification } from "../utils"

interface Report {
  url: string
  elementText: string
  note: string
  timestamp: string
}

let flagIcon: HTMLDivElement | null = null
let flagTooltip: HTMLDivElement | null = null
let tooltip: HTMLDivElement | null = null
let flagManager: ReturnType<typeof createFlagManager> | null = null
let highlightManager: ReturnType<typeof createHighlightManager> | null = null
let reportService: ReturnType<typeof createReportService> | null = null

const KEYBOARD_SHORTCUT = { ctrl: true, shift: true, key: "B" }

const initialize = (): void => {
  flagIcon = createFlagIcon()
  flagTooltip = createFlagTooltip()
  tooltip = createTooltip()
  
  if (flagIcon && flagTooltip) {
    flagManager = createFlagManager(flagIcon, flagTooltip)
  }
  
  highlightManager = createHighlightManager()
  reportService = createReportService()
  
  setupEventListeners()
  setupMessageListener()
}

const setupEventListeners = (): void => {
  document.addEventListener("mouseover", handleMouseOver)
  document.addEventListener("mouseout", handleMouseOut)
  document.addEventListener("keydown", handleKeyDown)
  flagIcon?.addEventListener("click", handleFlagClick)
}

const setupMessageListener = (): void => {
  if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "TOGGLE_HIGHLIGHT") {
        highlightManager?.toggle()
      }
    })
  } else {
    console.warn("Chrome runtime is not available. The extension may not function correctly.")
  }
}

const handleMouseOver = (e: MouseEvent): void => {
  if (!highlightManager?.active) return

  const target = e.target as HTMLElement
  
  if (target.closest('.bug-reporter-form') || 
      target.closest('.bug-reporter-flag-icon') || 
      target.closest('.bug-reporter-tooltip') ||
      target.closest('.bug-reporter-notification')) {
    return
  }
  
  const isButtonOrAnchor = target.tagName === "BUTTON" || target.tagName === "A"
  
  const containsButtonOrAnchor = target.querySelector("button, a") !== null
  
  const parentButtonOrAnchor = target.closest("button, a")
  
  if (isButtonOrAnchor || containsButtonOrAnchor || parentButtonOrAnchor) {
    const elementToReport = isButtonOrAnchor ? target : 
                           (parentButtonOrAnchor || target.querySelector("button, a") || target) as HTMLElement
    
    flagManager?.show(e.clientX, e.clientY, elementToReport)

    if (tooltip) {
      const elementType = elementToReport.tagName.toLowerCase()
      const elementText = elementToReport.textContent?.trim() || "No text"
      tooltip.textContent = `${elementType}: "${elementText.substring(0, 30)}${elementText.length > 30 ? "..." : ""}"`
      tooltip.style.left = `${e.clientX}px`
      tooltip.style.top = `${e.clientY - 10}px`
      tooltip.style.display = "block"

      setTimeout(() => {
        if (tooltip) {
          tooltip.style.opacity = "1"
          tooltip.style.transform = "translateY(-110%)"
        }
      }, 10)
    }
  }
}

const handleMouseOut = (e: MouseEvent): void => {
  const target = e.target as HTMLElement
  
  if (target.closest('.bug-reporter-form') || 
      target.closest('.bug-reporter-flag-icon') || 
      target.closest('.bug-reporter-tooltip') ||
      target.closest('.bug-reporter-notification')) {
    return
  }
  
  const isButtonOrAnchor = target.tagName === "BUTTON" || target.tagName === "A"
  
  const containsButtonOrAnchor = target.querySelector("button, a") !== null
  
  const parentButtonOrAnchor = target.closest("button, a")
  
  if (isButtonOrAnchor || containsButtonOrAnchor || parentButtonOrAnchor) {
    const relatedTarget = e.relatedTarget as HTMLElement
    if (
      relatedTarget &&
      (relatedTarget.classList.contains("bug-reporter-flag-icon") || relatedTarget.closest(".bug-reporter-flag-icon"))
    ) {
      return
    }

    if (!flagManager?.hovering) {
      flagManager?.hide()
    }
  }
}

const handleFlagClick = (): void => {
  const target = flagManager?.target
  if (!target || !reportService) return

  const elementType = target.tagName.toLowerCase()
  const elementText = target.textContent?.trim() || "No text"
  const elementInfo = `${elementType}: "${elementText}"`

  const form = createReportForm(target)
  
  const cancelButton = form.querySelector(".bug-reporter-cancel")
  const submitButton = form.querySelector(".bug-reporter-submit")
  const textarea = form.querySelector("textarea")

  cancelButton?.addEventListener("click", () => {
    form.classList.add("closing")
    
    setTimeout(() => {
      form.remove()
    }, 400)
  })

  submitButton?.addEventListener("click", () => {
    const note = textarea?.value || ""
    const report: Report = {
      url: window.location.href,
      elementText: elementInfo,
      note,
      timestamp: new Date().toISOString(),
    }

    if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
      chrome.runtime.sendMessage({ type: "SUBMIT_REPORT", report })
    }

    form.classList.add("closing")
    
    setTimeout(() => {
      form.remove()
      showNotification("Bug report submitted!", document.body)
    }, 400)
  })
}

const handleKeyDown = (e: KeyboardEvent): void => {
  if (
    e.ctrlKey === KEYBOARD_SHORTCUT.ctrl &&
    e.shiftKey === KEYBOARD_SHORTCUT.shift &&
    e.key.toLowerCase() === KEYBOARD_SHORTCUT.key.toLowerCase()
  ) {
    e.preventDefault()
    highlightManager?.toggle()
  }
}

initialize()