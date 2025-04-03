import type { Report } from "../types/types"
import { MAX_REPORTS } from "../constants"

declare const chrome: any

interface StorageResult {
  reports?: Report[]
}

export const createStorageService = () => ({
  storeReportLocally: (report: Report): Promise<void> => 
    new Promise<void>((resolve) => {
      chrome.storage.local.get(["reports"], (result: StorageResult) => {
        const reports = result.reports || []
        reports.push(report)
        chrome.storage.local.set({ reports: reports.slice(-MAX_REPORTS) }, resolve)
      })
    })
})

