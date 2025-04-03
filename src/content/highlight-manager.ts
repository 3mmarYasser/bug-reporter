import { showNotification } from "../utils"

interface HighlightManager {
  toggle: () => void
  get active(): boolean
}

const createHighlightManager = (): HighlightManager => {
  let isHighlightMode = false

  const toggle = (): void => {
    isHighlightMode = !isHighlightMode
    
    const buttons = document.querySelectorAll("button, a")
    
    const containers = document.querySelectorAll("*")
    const containersWithButtons = Array.from(containers).filter(el => 
      el.querySelector("button, a") !== null && 
      !(el.tagName === "BUTTON" || el.tagName === "A") &&
      !el.closest('.bug-reporter-form') &&
      !el.closest('.bug-reporter-flag-icon') &&
      !el.closest('.bug-reporter-tooltip') &&
      !el.closest('.bug-reporter-notification')
    )
    
    const allElements = [...buttons, ...containersWithButtons]
    
    const elementsToHighlight = allElements.filter(el => 
      !el.closest('.bug-reporter-form') &&
      !el.closest('.bug-reporter-flag-icon') &&
      !el.closest('.bug-reporter-tooltip') &&
      !el.closest('.bug-reporter-notification')
    )
    
    elementsToHighlight.forEach((element) => {
      if (isHighlightMode) {
        element.classList.add("bug-reporter-highlight")
      } else {
        element.classList.remove("bug-reporter-highlight")
      }
    })

    showNotification(
      isHighlightMode ? "Bug Reporter Activated" : "Bug Reporter Deactivated",
      document.body
    )
  }

  return {
    toggle,
    get active() {
      return isHighlightMode
    }
  }
}

export { createHighlightManager }
export type { HighlightManager }

