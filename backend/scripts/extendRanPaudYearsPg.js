const pool = require('../dbPostgres');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function extendYears() {
    console.log('🚀 Starting RanPaud Year Extension (PostgreSQL)...');
    try {
        // Fetch all active RAN PAUD records
        const res = await pool.query('SELECT id, program, indikators FROM ran_paud');
        console.log(`📦 Found ${res.rows.length} records.`);

        let updatedCount = 0;
        const yearsToAdd = [2025, 2026, 2027, 2028, 2029];

        for (const row of res.rows) {
            let indicators = row.indikators;
            
            // Ensure indicators is an array
            if (typeof indicators === 'string') {
                try {
                    indicators = JSON.parse(indicators);
                } catch (e) {
                    console.error(`❌ Failed to parse indikators for ID ${row.id}:`, e.message);
                    continue;
                }
            }
            if (!Array.isArray(indicators)) indicators = [];

            let rowUpdated = false;

            // Iterate through each indicator
            indicators = indicators.map(ind => {
                if (!ind.tahunData || !Array.isArray(ind.tahunData)) {
                    ind.tahunData = [];
                }

                // Check and add missing years
                yearsToAdd.forEach(year => {
                    const exists = ind.tahunData.find(td => {
                        // Handle strict equality or string/number mismatch
                        return parseInt(td.tahun) === year;
                    });

                    if (!exists) {
                        ind.tahunData.push({
                            tahun: year,
                            target: 0,
                            realisasi: 0,
                            persentase: 0,
                            kategori: 'BELUM LAPORAN',
                            anggaran: '[ISI DISINI]'
                        });
                        rowUpdated = true;
                    }
                });
                
                // Sort by year to keep it tidy
                ind.tahunData.sort((a, b) => parseInt(a.tahun) - parseInt(b.tahun));
                
                return ind;
            });

            // If changes were made, update the database
            if (rowUpdated) {
                await pool.query(
                    'UPDATE ran_paud SET indikators = $1, updated_at = NOW() WHERE id = $2',
                    [JSON.stringify(indicators), row.id]
                );
                console.log(`✅ Updated ID: ${row.id} (${row.program})`);
                updatedCount++;
            }
        }

        console.log(`\n🎉 Process Complete.`);
        console.log(`✅ Total Records Updated: ${updatedCount}`);

    } catch (e) {
        console.error('❌ Fatal Error:', e);
    } finally {
        await pool.end(); // Close connection
        console.log('🔌 Database connection closed.');
    }
}

extendYears();
