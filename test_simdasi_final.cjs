const axios = require('./backend/node_modules/axios');
const https = require('https');

const url = 'https://webapi.bps.go.id/v1/api/interoperabilitas/datasource/simdasi/id/25/tahun/2025/id_tabel/WnFhSGhLZ2xHNmlZdkRRYzRsaG5Hdz09/wilayah/0000000/key/ba8deb0677a47ad516caa2348aeb8b79';
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function testFetch() {
    try {
        console.log('Fetching SIMDASI with Axios (SSL ignore)...');
        const res = await axios.get(url, { httpsAgent });
        const data = res.data;
        console.log('Keys:', Object.keys(data));
        if (data.data) {
            console.log('Data type:', typeof data.data, Array.isArray(data.data) ? 'Array' : 'Object');
            if (Array.isArray(data.data)) {
                console.log('Data length:', data.data.length);
                if (data.data.length > 1) {
                    console.log('Second item (actual data?):', JSON.stringify(data.data[1], null, 2));
                    console.log('Fields in second item:', Object.keys(data.data[1]));
                } else {
                    console.log('Only 1 item in data array:', JSON.stringify(data.data[0], null, 2));
                }
            } else {
                console.log('Data keys sample:', Object.keys(data.data).slice(0, 5));
                const firstKey = Object.keys(data.data)[0];
                console.log('Sample item:', JSON.stringify(data.data[firstKey], null, 2));
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
