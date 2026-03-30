const axios = require('axios');

async function testSync() {
    try {
        const response = await axios.post('http://localhost:5000/api/ceria-settings/sync-bps', {
            id: 1,
            year_id: '125'
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('Status:', response.status);
        console.log('Body:', response.data);
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
