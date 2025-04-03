import type { Report } from "../types/types"
import type { SupabaseClient } from "./supabase-client"
import { MESSAGE_TYPES } from "../constants"

declare const chrome: any

type StorageService = {
  storeReportLocally: (report: Report) => Promise<void>
}

export const createReportHandler = (
  supabase: SupabaseClient,
  storageService: StorageService
) => ({
  handleNewReport: async (report: Report): Promise<{ success: boolean; localOnly?: boolean }> => {
    try {
      const { error } = await supabase.from("bug_reports").insert([{
        url: report.url,
        element_text: report.elementText,
        note: report.note,
        timestamp: report.timestamp,
      }])

      if (error) throw error

      await storageService.storeReportLocally(report)

      await chrome.runtime.sendMessage({
        type: MESSAGE_TYPES.NEW_REPORT,
        report,
        source: "supabase",
      })

      return { success: true }
    } catch (error) {
      await storageService.storeReportLocally(report)

      await chrome.runtime.sendMessage({
        type: MESSAGE_TYPES.NEW_REPORT,
        report,
        source: "local_only",
      })

      return { success: true, localOnly: true }
    }
  }
})

