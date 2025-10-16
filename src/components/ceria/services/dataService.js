// JavaScript version of dataService for CERIA integration with PAUDHI7

export async function fetchIndicators(domain) {
  try {
    const res = await fetch(`/api/dashboard/indicators?domain=${encodeURIComponent(domain)}`);
    if (!res.ok) throw new Error('Failed to fetch indicators');
    return await res.json();
  } catch (error) {
    console.error('Error fetching indicators:', error);
    return [];
  }
}

export async function fetchAlerts(domain) {
  try {
    const res = await fetch(`/api/dashboard/alerts?domain=${encodeURIComponent(domain)}`);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return await res.json();
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
}

export async function fetchRegionalRisks(domain) {
  try {
    const res = await fetch(`/api/dashboard/risks?domain=${encodeURIComponent(domain)}`);
    if (!res.ok) throw new Error('Failed to fetch risks');
    return await res.json();
  } catch (error) {
    console.error('Error fetching risks:', error);
    return [];
  }
}

export async function fetchLastUpdated() {
  try {
    const res = await fetch('/api/meta/last-updated');
    if (!res.ok) return null;
    const json = await res.json();
    return json.lastUpdated || null;
  } catch (error) {
    console.error('Error fetching last updated:', error);
    return null;
  }
}


