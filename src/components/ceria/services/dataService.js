// JavaScript version of dataService for CERIA integration with PAUDHI7

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

export async function fetchIndicators(domain) {
  try {
    const res = await fetch(`${API_BASE}/dashboard/indicators?domain=${encodeURIComponent(domain)}`);
    if (!res.ok) throw new Error('Failed to fetch indicators');
    return await res.json();
  } catch (error) {
    console.error('Error fetching indicators:', error);
    return [];
  }
}

export async function fetchAlerts(domain) {
  try {
    const res = await fetch(`${API_BASE}/dashboard/alerts?domain=${encodeURIComponent(domain)}`);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return await res.json();
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
}

export async function fetchRegionalRisks(domain) {
  try {
    const res = await fetch(`${API_BASE}/dashboard/risks?domain=${encodeURIComponent(domain)}`);
    if (!res.ok) throw new Error('Failed to fetch risks');
    return await res.json();
  } catch (error) {
    console.error('Error fetching risks:', error);
    return [];
  }
}

export async function fetchLastUpdated() {
  try {
    const res = await fetch(`${API_BASE}/meta/last-updated`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.lastUpdated || null;
  } catch (error) {
    console.error('Error fetching last updated:', error);
    return null;
  }
}


