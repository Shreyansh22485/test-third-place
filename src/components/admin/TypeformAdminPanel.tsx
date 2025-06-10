"use client";

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface WebhookStatus {
  webhookConfigured: boolean;
  lastWebhookReceived?: string;
  totalResponsesProcessed: number;
  formId: string;
  webhookUrl?: string;
}

interface SyncStats {
  totalSynced: number;
  newResponses: number;
  errors: number;
  lastSyncTime: string;
}

export default function TypeformAdminPanel() {
  const [webhookStatus, setWebhookStatus] = useState<WebhookStatus | null>(null);
  const [syncStats, setSyncStats] = useState<SyncStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWebhookStatus = async () => {
    try {
      setLoading(true);
      const response = await api.get('/personality-test/admin/webhook-status');
      setWebhookStatus(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch webhook status');
    } finally {
      setLoading(false);
    }
  };

  const setupWebhook = async () => {
    try {
      setLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
      const webhookUrl = `${backendUrl}/api/personality-test/webhook`;
      
      await api.post('/personality-test/admin/setup-webhook', { webhookUrl });
      
      // Refresh status
      await fetchWebhookStatus();
      alert('Webhook setup successful!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to setup webhook');
    } finally {
      setLoading(false);
    }
  };

  const syncResponses = async () => {
    try {
      setLoading(true);
      const response = await api.post('/personality-test/admin/sync');
      setSyncStats(response.data.data);
      alert(`Sync completed! ${response.data.data.newResponses} new responses processed.`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to sync responses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhookStatus();
  }, []);

  if (loading && !webhookStatus) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Typeform Integration Admin</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Webhook Status */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Webhook Status</h2>
        
        {webhookStatus ? (
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-medium mr-2">Status:</span>
              <span className={`px-2 py-1 rounded text-sm ${
                webhookStatus.webhookConfigured 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {webhookStatus.webhookConfigured ? 'Configured' : 'Not Configured'}
              </span>
            </div>
            
            <div>
              <span className="font-medium mr-2">Form ID:</span>
              <span className="font-mono text-sm">{webhookStatus.formId}</span>
            </div>
            
            {webhookStatus.webhookUrl && (
              <div>
                <span className="font-medium mr-2">Webhook URL:</span>
                <span className="font-mono text-sm break-all">{webhookStatus.webhookUrl}</span>
              </div>
            )}
            
            <div>
              <span className="font-medium mr-2">Responses Processed:</span>
              <span>{webhookStatus.totalResponsesProcessed}</span>
            </div>
            
            {webhookStatus.lastWebhookReceived && (
              <div>
                <span className="font-medium mr-2">Last Webhook:</span>
                <span>{new Date(webhookStatus.lastWebhookReceived).toLocaleString()}</span>
              </div>
            )}
          </div>
        ) : (
          <p>No webhook status available</p>
        )}

        <div className="mt-4 space-x-2">
          <button
            onClick={setupWebhook}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Setting up...' : 'Setup Webhook'}
          </button>
          
          <button
            onClick={fetchWebhookStatus}
            disabled={loading}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Refresh Status
          </button>
        </div>
      </div>

      {/* Sync Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Response Sync</h2>
        
        {syncStats && (
          <div className="mb-4 p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Last Sync Results:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="block font-medium">Total Synced</span>
                <span className="text-lg">{syncStats.totalSynced}</span>
              </div>
              <div>
                <span className="block font-medium">New Responses</span>
                <span className="text-lg text-green-600">{syncStats.newResponses}</span>
              </div>
              <div>
                <span className="block font-medium">Errors</span>
                <span className="text-lg text-red-600">{syncStats.errors}</span>
              </div>
              <div>
                <span className="block font-medium">Last Sync</span>
                <span className="text-sm">{new Date(syncStats.lastSyncTime).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={syncResponses}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Syncing...' : 'Sync Historical Responses'}
        </button>
        
        <p className="text-sm text-gray-600 mt-2">
          This will fetch and process any historical responses from Typeform that may have been missed.
        </p>
      </div>
    </div>
  );
}
