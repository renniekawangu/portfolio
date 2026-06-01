/**
 * Import Analytics Tracking System
 * Tracks import history, failures, duplicates, categories, tags
 */

export interface ImportRecord {
  id: string
  timestamp: string
  fileCount: number
  successCount: number
  failureCount: number
  duplicateCount: number
  categories: string[]
  tags: string[]
  totalWords: number
  errors: string[]
}

export interface ImportStats {
  totalImports: number
  totalPosts: number
  successRate: number
  mostUsedCategories: Array<{ name: string; count: number }>
  mostUsedTags: Array<{ name: string; count: number }>
  totalContent: number // in characters
  averagePostLength: number
  importHistory: ImportRecord[]
}

/**
 * Local storage key for analytics
 */
const IMPORT_HISTORY_KEY = 'blog_import_history'

/**
 * Records a new import event
 */
export function recordImport(record: Omit<ImportRecord, 'id' | 'timestamp'>): ImportRecord {
  const newRecord: ImportRecord = {
    ...record,
    id: Math.random().toString(36).substring(2, 11),
    timestamp: new Date().toISOString()
  }

  // Get existing history
  const history = getImportHistory()
  history.push(newRecord)

  // Keep last 100 imports
  if (history.length > 100) {
    history.shift()
  }

  // Save to local storage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(IMPORT_HISTORY_KEY, JSON.stringify(history))
    } catch (err) {
      console.error('Failed to save import history:', err)
    }
  }

  return newRecord
}

/**
 * Gets import history from local storage
 */
export function getImportHistory(): ImportRecord[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = localStorage.getItem(IMPORT_HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (err) {
    console.error('Failed to read import history:', err)
    return []
  }
}

/**
 * Calculates aggregate statistics from import history
 */
export function calculateImportStats(): ImportStats {
  const history = getImportHistory()

  const categoryCount: Record<string, number> = {}
  const tagCount: Record<string, number> = {}

  let totalPosts = 0
  let totalWords = 0

  for (const record of history) {
    totalPosts += record.successCount

    record.categories.forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1
    })

    record.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })

    totalWords += record.totalWords
  }

  const mostUsedCategories = Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const mostUsedTags = Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)

  const totalImports = history.length
  const successCount = history.reduce((sum, r) => sum + r.successCount, 0)
  const totalAttempted = history.reduce((sum, r) => sum + r.fileCount, 0)
  const successRate = totalAttempted > 0 ? Math.round((successCount / totalAttempted) * 100) : 100

  return {
    totalImports,
    totalPosts: successCount,
    successRate,
    mostUsedCategories,
    mostUsedTags,
    totalContent: totalWords,
    averagePostLength: totalPosts > 0 ? Math.round(totalWords / totalPosts) : 0,
    importHistory: history.slice().reverse() // Most recent first
  }
}

/**
 * Clears import history (for admin)
 */
export function clearImportHistory(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(IMPORT_HISTORY_KEY)
    } catch (err) {
      console.error('Failed to clear import history:', err)
    }
  }
}

/**
 * Exports import history as JSON
 */
export function exportImportHistory(): string {
  const history = getImportHistory()
  return JSON.stringify(history, null, 2)
}

/**
 * Formats import record for display
 */
export function formatImportRecord(record: ImportRecord): {
  dateStr: string
  timeStr: string
  summary: string
  icon: string
} {
  const date = new Date(record.timestamp)
  const dateStr = date.toLocaleDateString()
  const timeStr = date.toLocaleTimeString()

  let icon = '✓'
  let summary = `${record.successCount} posts imported`

  if (record.failureCount > 0) {
    icon = '⚠'
    summary += ` (${record.failureCount} failed)`
  }

  if (record.duplicateCount > 0) {
    summary += `, ${record.duplicateCount} duplicates`
  }

  return {
    dateStr,
    timeStr,
    summary,
    icon
  }
}

/**
 * Gets recent imports (last N)
 */
export function getRecentImports(limit: number = 10): ImportRecord[] {
  const history = getImportHistory()
  return history.slice(-limit).reverse()
}

/**
 * Gets import statistics for a specific date range
 */
export function getImportsByDateRange(startDate: Date, endDate: Date): ImportRecord[] {
  const history = getImportHistory()
  const start = startDate.getTime()
  const end = endDate.getTime()

  return history.filter(record => {
    const time = new Date(record.timestamp).getTime()
    return time >= start && time <= end
  })
}

/**
 * Generates a CSV report of import history
 */
export function generateImportReport(): string {
  const history = getImportHistory()

  const headers = ['Date', 'Time', 'Files', 'Success', 'Failed', 'Duplicates', 'Categories', 'Tags']
  const rows = history.map(record => {
    const date = new Date(record.timestamp)
    return [
      date.toLocaleDateString(),
      date.toLocaleTimeString(),
      record.fileCount,
      record.successCount,
      record.failureCount,
      record.duplicateCount,
      record.categories.join(';'),
      record.tags.join(';')
    ]
  })

  const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

  return csv
}

const importAnalyticsUtils = {
  recordImport,
  getImportHistory,
  calculateImportStats,
  clearImportHistory,
  exportImportHistory,
  formatImportRecord,
  getRecentImports,
  getImportsByDateRange,
  generateImportReport
}

export default importAnalyticsUtils
