import { useState, useEffect } from 'react'
import './SyncStatus.css'

export default function SyncStatus() {
  const [syncStatus, setSyncStatus] = useState(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)

  useEffect(() => {
    fetchSyncStatus()
    const interval = setInterval(fetchSyncStatus, 30000) // Check every 30s
    return () => clearInterval(interval)
  }, [])

  const fetchSyncStatus = async () => {
    try {
      const res = await fetch('/api/sync-status')
      const data = await res.json()
      setSyncStatus(data)
    } catch (err) {
      console.error('Error fetching sync status:', err)
    }
  }

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const res = await fetch('/api/sync-notion', { method: 'POST' })
      const result = await res.json()

      if (result.success) {
        alert(`Synced ${result.synced} ratings to Notion`)
        setLastSync(new Date().toLocaleTimeString())
        fetchSyncStatus()
      } else {
        alert(`Sync error: ${result.error}`)
      }
    } catch (err) {
      console.error('Error syncing to Notion:', err)
      alert('Error syncing to Notion')
    } finally {
      setIsSyncing(false)
    }
  }

  if (!syncStatus) {
    return <div className="sync-status">Loading sync status...</div>
  }

  return (
    <div className="sync-status">
      <div className="sync-info">
        <span className={`sync-indicator ${syncStatus.unsynced > 0 ? 'pending' : 'synced'}`}>
          ●
        </span>
        <span className="sync-text">
          {syncStatus.unsynced > 0
            ? `${syncStatus.unsynced} unsynced`
            : 'All synced'}
        </span>
      </div>

      {syncStatus.unsynced > 0 && (
        <button
          className="sync-button"
          onClick={handleSync}
          disabled={isSyncing}
        >
          {isSyncing ? 'Syncing...' : 'Sync to Notion'}
        </button>
      )}

      {lastSync && (
        <div className="last-sync">Last sync: {lastSync}</div>
      )}
    </div>
  )
}
