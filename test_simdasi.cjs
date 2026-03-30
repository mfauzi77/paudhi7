const url = 'https://webapi.bps.go.id/v1/api/interoperabilitas/datasource/simdasi/id/25/tahun/2025/id_tabel/WnFhSGhLZ2xHNmlZdkRRYzRsaG5Hdz09/wilayah/0000000/key/ba8deb0677a47ad516caa2348aeb8b79';

async function testFetch() {
    try {
        console.log('Fetching SIMDASI...');
        // Node 22 native fetch
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Keys:', Object.keys(data));
        if (data.data) {
            console.log('Data type:', typeof data.data, Array.isArray(data.data) ? 'Array' : 'Object');
            if (Array.isArray(data.data)) {
                console.log('Data length:', data.data.length);
                console.log('First 2 items:', JSON.stringify(data.data.slice(0, 2), null, 2));
                
                // Inspect fields used for region and value
                const sample = data.data[0];
                console.log('Fields in sample item:', Object.keys(sample));
            } else {
                console.log('Data keys sample:', Object.keys(data.data).slice(0, 5));
                console.log('Sample item:', JSON.stringify(Object.values(data.data)[0], null, 2));
            }
        } else {
            console.log('Full response:', JSON.stringify(data, null, 2));
        }
        process.exit(0);
    } catch (err) {
        console.error('Fetch error:', err.message);
        process.exit(1);
    }
}

testFetch();
