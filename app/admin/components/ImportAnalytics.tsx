'use client'

import { useMemo } from 'react'
import { calculateImportStats, formatImportRecord } from '@/lib/importAnalytics'

interface ImportAnalyticsProps {
  onClose: () => void
}

export default function ImportAnalytics({ onClose }: ImportAnalyticsProps) {
  const stats = useMemo(() => calculateImportStats(), [])

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 md:p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl border border-gray-700 p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Import Analytics</h3>
            <p className="text-sm text-gray-400 mt-1">Import performance and content trends</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-xs text-gray-400">Total Imports</p>
            <p className="text-2xl font-bold text-white">{stats.totalImports}</p>
          </div>
          <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
            <p className="text-xs text-green-400">Imported Posts</p>
            <p className="text-2xl font-bold text-green-400">{stats.totalPosts}</p>
          </div>
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <p className="text-xs text-blue-400">Success Rate</p>
            <p className="text-2xl font-bold text-blue-400">{stats.successRate}%</p>
          </div>
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
            <p className="text-xs text-purple-400">Avg Words/Post</p>
            <p className="text-2xl font-bold text-purple-400">{stats.averagePostLength}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Top Categories</h4>
            <div className="space-y-2">
              {stats.mostUsedCategories.slice(0, 6).map((c) => (
                <div key={c.name} className="flex justify-between text-sm">
                  <span className="text-gray-300">{c.name}</span>
                  <span className="text-orange-400 font-semibold">{c.count}</span>
                </div>
              ))}
              {stats.mostUsedCategories.length === 0 && <p className="text-xs text-gray-500">No data yet</p>}
            </div>
          </div>

          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Top Tags</h4>
            <div className="flex flex-wrap gap-2">
              {stats.mostUsedTags.slice(0, 12).map((t) => (
                <span key={t.name} className="px-2 py-1 rounded text-xs bg-blue-600/20 border border-blue-600/30 text-blue-300">
                  {t.name} ({t.count})
                </span>
              ))}
              {stats.mostUsedTags.length === 0 && <p className="text-xs text-gray-500">No data yet</p>}
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3">Recent Imports</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {stats.importHistory.slice(0, 20).map((record) => {
              const display = formatImportRecord(record)
              return (
                <div key={record.id} className="flex justify-between items-center text-sm border-b border-gray-700 pb-2">
                  <div>
                    <p className="text-gray-200">{display.icon} {display.summary}</p>
                    <p className="text-xs text-gray-500">{display.dateStr} {display.timeStr}</p>
                  </div>
                  <span className="text-xs text-gray-400">{record.fileCount} files</span>
                </div>
              )
            })}
            {stats.importHistory.length === 0 && <p className="text-xs text-gray-500">No import history yet.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
