'use client'

import { motion } from 'framer-motion'

export interface ImportSummaryData {
  success: boolean
  totalFiles: number
  successCount: number
  failureCount: number
  duplicateCount: number
  skippedCount: number
  errors: string[]
  warnings: string[]
}

interface BlogImportSummaryProps {
  data: ImportSummaryData
  onClose: () => void
  onViewAnalytics?: () => void
}

export default function BlogImportSummary({ data, onClose, onViewAnalytics }: BlogImportSummaryProps) {
  const successRate = data.totalFiles > 0 ? Math.round((data.successCount / data.totalFiles) * 100) : 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 md:p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg bg-gray-800 rounded-xl border border-gray-700 p-6 md:p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className={`text-5xl md:text-6xl mb-4 ${data.success ? '✓' : '⚠'}`}>
            <span
              className={
                data.success
                  ? 'text-green-400'
                  : data.failureCount > 0
                    ? 'text-red-400'
                    : 'text-yellow-400'
              }
            >
              {data.success ? '✓' : data.failureCount > 0 ? '✗' : '⚠'}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {data.success ? 'Import Complete' : data.failureCount > 0 ? 'Import Failed' : 'Import with Issues'}
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Files Processed</div>
            <div className="text-2xl font-bold text-white">{data.totalFiles}</div>
          </div>

          <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
            <div className="text-xs text-green-400 mb-1">Successful</div>
            <div className="text-2xl font-bold text-green-400">{data.successCount}</div>
          </div>

          {data.failureCount > 0 && (
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
              <div className="text-xs text-red-400 mb-1">Failed</div>
              <div className="text-2xl font-bold text-red-400">{data.failureCount}</div>
            </div>
          )}

          {data.duplicateCount > 0 && (
            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
              <div className="text-xs text-yellow-400 mb-1">Duplicates</div>
              <div className="text-2xl font-bold text-yellow-400">{data.duplicateCount}</div>
            </div>
          )}

          {data.skippedCount > 0 && (
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
              <div className="text-xs text-blue-400 mb-1">Skipped</div>
              <div className="text-2xl font-bold text-blue-400">{data.skippedCount}</div>
            </div>
          )}
        </div>

        {/* Success Rate Bar */}
        {data.totalFiles > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Success Rate</span>
              <span className="text-sm font-semibold text-white">{successRate}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${successRate}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`h-full ${
                  successRate === 100
                    ? 'bg-green-500'
                    : successRate >= 75
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
              />
            </div>
          </div>
        )}

        {/* Errors */}
        {data.errors.length > 0 && (
          <div className="mb-6 bg-red-600/10 border border-red-600/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-red-400 mb-2">Errors</h4>
            <ul className="space-y-1">
              {data.errors.slice(0, 3).map((error, i) => (
                <li key={i} className="text-xs text-red-300">
                  • {error}
                </li>
              ))}
            </ul>
            {data.errors.length > 3 && (
              <p className="text-xs text-red-300 mt-2">+{data.errors.length - 3} more errors</p>
            )}
          </div>
        )}

        {/* Warnings */}
        {data.warnings.length > 0 && (
          <div className="mb-6 bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">Warnings</h4>
            <ul className="space-y-1">
              {data.warnings.slice(0, 3).map((warning, i) => (
                <li key={i} className="text-xs text-yellow-300">
                  • {warning}
                </li>
              ))}
            </ul>
            {data.warnings.length > 3 && (
              <p className="text-xs text-yellow-300 mt-2">+{data.warnings.length - 3} more warnings</p>
            )}
          </div>
        )}

        {/* Summary Message */}
        <div className="bg-gray-700/50 rounded-lg p-4 mb-6 text-center">
          <p className="text-sm text-gray-300">
            {data.success
              ? `${data.successCount} blog post${data.successCount !== 1 ? 's' : ''} imported successfully!`
              : data.failureCount > 0
                ? `Import failed: ${data.failureCount} error${data.failureCount !== 1 ? 's' : ''}`
                : `${data.successCount} imported with ${data.duplicateCount + data.skippedCount} skipped`}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {onViewAnalytics && (
            <button
              onClick={onViewAnalytics}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300 text-sm"
            >
              📊 Analytics
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 btn-gradient text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-sm"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  )
}
