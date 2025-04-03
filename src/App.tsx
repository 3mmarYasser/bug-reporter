import { useState, useEffect } from "react"
import { ChromeService } from "./services/chrome"
import Header from "./components/Header"
import Notification from "./components/Notification"
import ReportsList from "./components/ReportsList"
import Footer from "./components/Footer"
import HighlightMode from "./components/HighlightMode"
import "./styles/app.scss"

interface Report {
  url: string;
  elementText: string;
  note: string;
  timestamp: string;
}

declare global {
  interface Window {
    chrome: typeof chrome;
  }
}

const App = () => {
  const [reports, setReports] = useState<Report[]>([])
  const [isHighlightMode, setIsHighlightMode] = useState(false)
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    ChromeService.getReports().then(setReports)

    const cleanup = ChromeService.addMessageListener((message) => {
      if (message.type === "NEW_REPORT") {
        setReports((prev) => [...prev, message.report as Report].slice(-5))
        showNotification("Report submitted successfully!")
      }
    })

    return cleanup
  }, [])

  const showNotification = (msg: string) => {
    setMessage(msg)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  const toggleHighlightMode = async () => {
    try {
      setIsHighlightMode(!isHighlightMode)
      await ChromeService.toggleHighlightMode()
    } catch (error) {
      showNotification("Failed to toggle highlight mode")
      console.error(error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).format(date)
  }

  const truncateUrl = (url: string, maxLength = 30) => {
    if (url.length <= maxLength) return url
    return url.substring(0, maxLength) + "..."
  }

  return (
    <div className="popup-container bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <HighlightMode isHighlightMode={isHighlightMode} onToggle={toggleHighlightMode} />
      
      {showMessage && (
        <Notification message={message} onClose={() => setShowMessage(false)} />
      )}

      <ReportsList
        reports={reports}
        formatDate={formatDate}
        truncateUrl={truncateUrl}
      />
      
      <Footer />
    </div>
  )
}

export default App

