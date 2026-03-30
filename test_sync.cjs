const axios = require('axios');

async function testSync() {
    try {
        console.log('Testing connectivity to http://localhost:5000/api/health...');
        const health = await axios.get('http://localhost:5000/api/health');
        console.log('Health:', health.data);

        console.log('Testing POST /api/ceria-settings/sync-bps...');
        const response = await axios.post('http://localhost:5000/api/ceria-settings/sync-bps', {
            id: 1,
            year_id: '125'
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('Status:', response.status);
    } catch (err) {
        if (err.response) {
            console.log('Error Status:', err.response.status);
            console.log('Error Data:', err.response.data);
        } else {
            console.error('Error:', err.message);
        }
    }
}

testSync();
