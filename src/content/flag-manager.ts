interface FlagManager {
  show: (x: number, y: number, target: HTMLElement) => void
  hide: () => void
  get hovering(): boolean
  get target(): HTMLElement | null
}

const createFlagManager = (flagIcon: HTMLDivElement, tooltip: HTMLDivElement): FlagManager => {
  let isHoveringFlag = false
  let currentTarget: HTMLElement | null = null

  const setupFlagEvents = (): void => {
    flagIcon.addEventListener("mouseenter", () => {
      isHoveringFlag = true
    })

    flagIcon.addEventListener("mouseleave", () => {
      isHoveringFlag = false
      setTimeout(() => {
        if (!isHoveringFlag && currentTarget) {
          const mousePos = { x: 0, y: 0 }
          document.addEventListener(
            "mousemove",
            (e) => {
              mousePos.x = e.clientX
              mousePos.y = e.clientY
            },
            { once: true },
          )

          const rect = currentTarget.getBoundingClientRect()
          const isOverOriginal =
            mousePos.x >= rect.left && mousePos.x <= rect.right && mousePos.y >= rect.top && mousePos.y <= rect.bottom

          if (!isOverOriginal) {
            hide()
          }
        }
      }, 50)
    })
    
    // Add click event to ensure the flag is visible when clicked
    flagIcon.addEventListener("click", () => {
      if (currentTarget) {
        // Ensure the flag is visible when clicked
        flagIcon.style.display = "block"
        flagIcon.style.opacity = "1"
        flagIcon.classList.add("visible")
        flagIcon.classList.remove("hidden")
      }
    })
  }

  const show = (x: number, y: number, target: HTMLElement): void => {
    currentTarget = target
    flagIcon.style.left = `${x}px`
    flagIcon.style.top = `${y}px`
    flagIcon.style.display = "block"
    flagIcon.classList.remove("hidden")
    flagIcon.classList.add("visible")
    
    // Ensure the flag is visible and positioned correctly
    flagIcon.style.opacity = "1"
    flagIcon.style.zIndex = "9999"
    
    // Make sure the flag is above other elements
    if (tooltip) {
      tooltip.style.display = "block"
      tooltip.style.opacity = "1"
      tooltip.style.zIndex = "9999"
    }
  }

  const hide = (): void => {
    flagIcon.classList.remove("visible")
    flagIcon.classList.add("hidden")
    flagIcon.style.opacity = "0"

    if (tooltip) {
      tooltip.style.opacity = "0"
      tooltip.style.transform = "translateY(-100%)"

      setTimeout(() => {
        tooltip.style.display = "none"
      }, 200)
    }

    setTimeout(() => {
      if (flagIcon.classList.contains("hidden")) {
        flagIcon.style.display = "none"
        currentTarget = null
      }
    }, 300)
  }

  setupFlagEvents()

  return {
    show,
    hide,
    get hovering() {
      return isHoveringFlag
    },
    get target() {
      return currentTarget
    }
  }
}

export { createFlagManager }
export type { FlagManager }
  
  