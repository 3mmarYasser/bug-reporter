const createFlagIcon = (): HTMLDivElement => {
    const icon = document.createElement("div")
    icon.className = "bug-reporter-flag-icon"
  
    const innerContainer = document.createElement("div")
    innerContainer.className = "bug-reporter-flag-icon-inner"
  
    innerContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.3));">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill="rgba(255,255,255,0.2)"></path>
        <line x1="4" y1="22" x2="4" y2="15"></line>
      </svg>
    `
  
    icon.appendChild(innerContainer)
    icon.style.display = "none"
    document.body.appendChild(icon)
  
    return icon
  }
  
  const createFlagTooltip = (): HTMLDivElement => {
    const tooltip = document.createElement("div")
    tooltip.className = "bug-reporter-flag-tooltip"
    tooltip.textContent = "Click to report this element"
    tooltip.style.display = "none"
    document.body.appendChild(tooltip)
  
    return tooltip
  }
  
  const createTooltip = (): HTMLDivElement => {
    const tooltipEl = document.createElement("div")
    tooltipEl.className = "bug-reporter-tooltip"
    tooltipEl.style.display = "none"
    tooltipEl.style.opacity = "0"
    tooltipEl.style.transform = "translateY(-100%)"
    tooltipEl.style.pointerEvents = "none"
    document.body.appendChild(tooltipEl)
  
    return tooltipEl
  }
  
  const createReportForm = (element: HTMLElement): HTMLDivElement => {
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
    return form
  }

  export {
    createFlagIcon,
    createFlagTooltip,
    createTooltip,
    createReportForm
  }