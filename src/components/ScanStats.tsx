import React from 'react'

interface ScanStatsProps {
  stats: {
    total: number
    successful: number
    failed: number
  }
}

const ScanStats: React.FC<ScanStatsProps> = ({ stats }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-primary-900 dark:text-primary-400">Scan Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Scans</p>
          <p className="text-2xl font-bold text-primary-900 dark:text-primary-400">{stats.total}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Successful</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.successful}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.failed}</p>
        </div>
      </div>
    </div>
  )
}

export default ScanStats

