import type { Report } from "../types/types"
import { MESSAGE_TYPES } from "../constants"

declare const chrome: any

interface ReportService {
  submitReport: (element: HTMLElement, note: string) => void
  showReportForm: (element: HTMLElement, onSubmit: (element: HTMLElement, note: string) => void) => void
}

const createReportService = (): ReportService => {
  const submitReport = (element: HTMLElement, note: string): void => {
    const report: Report = {
      url: window.location.href,
      elementText: element.textContent || "",
      note: note,
      timestamp: new Date().toISOString(),
    }

    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage({ type: MESSAGE_TYPES.SUBMIT_REPORT, report })
    } else {
      console.warn("Chrome runtime is not available. Report cannot be submitted.")
    }
  }

  const showReportForm = (element: HTMLElement, onSubmit: (element: HTMLElement, note: string) => void): void => {
    const form = document.createElement("div")
    form.className = "bug-reporter-form"
    form.innerHTML = `
      <div class="bug-reporter-form-content">
        <h3>Report Broken Element</h3>
        <div class="bug-reporter-element-info">
          <span class="bug-reporter-element-type">${element.tagName.toLowerCase()}</span>
          <span class="bug-reporter-element-text">${element.textContent?.trim().substring(0, 50) || "No text"}</span>
        </div>
        <textarea placeholder="Describe the issue with this element..."></textarea>
        <div class="button-group">
          <button class="bug-reporter-cancel">Cancel</button>
          <button class="bug-reporter-submit">Submit Report</button>
        </div>
      </div>
    `

    document.body.appendChild(form)

    const submitBtn = form.querySelector(".bug-reporter-submit")
    const cancelBtn = form.querySelector(".bug-reporter-cancel")
    const textarea = form.querySelector("textarea")

    submitBtn?.addEventListener("click", () => {
      if (textarea) {
        form.classList.add("closing")
        
        setTimeout(() => {
          onSubmit(element, textarea.value)
          form.remove()
        }, 400)
      }
    })

    cancelBtn?.addEventListener("click", () => {
      form.classList.add("closing")
      
      setTimeout(() => {
        form.remove()
      }, 400)
    })

    textarea?.focus()
  }

  return {
    submitReport,
    showReportForm
  }
}

export { createReportService }
export type { ReportService }

