import { createSupabaseClient } from './supabase-client';

interface Report {
  url: string
  elementText: string
  note: string
  timestamp: string
}

const supabaseUrl = "https://hsgatwbahspggubtafbx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZ2F0d2JhaHNwZ2d1YnRhZmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MTk1NjQsImV4cCI6MjA1OTI5NTU2NH0.T2VkNb6_itKaDnWV3-otU8Kf0o1YUaspjQaNG6K2LC8"
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

const storeReportLocally = (report: Report): Promise<void> => 
  new Promise<void>((resolve) => {
    chrome.storage.local.get(["reports"], (result: { reports?: Report[] }) => {
      const reports = result.reports || []
      reports.push(report)
      chrome.storage.local.set({ reports: reports.slice(-5) }, resolve)
    })
  })

const handleNewReport = async (report: Report): Promise<{ success: boolean; localOnly?: boolean }> => {
  await storeReportLocally(report)

  try {
    const { error } = await supabase.from("bug_reports").insert([{
      url: report.url,
      element_text: report.elementText,
      note: report.note,
      timestamp: report.timestamp,
    }])

    if (error) throw error

    await chrome.runtime.sendMessage({
      type: "NEW_REPORT",
      report,
      source: "supabase",
    })

    return { success: true }
  } catch (error) {
    console.error("Error submitting report to Supabase:", error);
    
    await chrome.runtime.sendMessage({
      type: "NEW_REPORT",
      report,
      source: "local_only",
    })

    return { success: true, localOnly: true }
  }
}

chrome.runtime.onMessage.addListener((
  message: { type: string; report: Report }, 
  _sender: chrome.runtime.MessageSender, 
  sendResponse: (response: { success: boolean; error?: string }) => void
) => {
  if (message.type === "SUBMIT_REPORT") {
    handleNewReport(message.report)
      .then(() => sendResponse?.({ success: true }))
      .catch((error) => sendResponse?.({ success: false, error: error.message }))
    return true
  }
})