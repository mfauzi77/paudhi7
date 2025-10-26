import { 
    RiskCategory, AlertLevel, InterventionStatus, InterventionPriority 
} from '../types';

// --- UTILITY FUNCTIONS ---
const parseValue = (val) => {
  if (!val || val.trim() === 'NA' || val.trim() === '–' || val.trim() === '') {
    return null;
  }
  return parseFloat(val.replace(',', '.'));
};

const parsePopulation = (val) => {
    if (!val) return 0;
    // Removes ~, dots, and then parses as integer.
    return parseInt(val.replace(/[~.]/g, ''), 10) || 0;
};

const generateId = (name) => {
    return name.toLowerCase().replace(/ /g, '-').replace(/\./g, '');
};

const generateHistoricalData = (baseScore, length = 6) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
    return months.slice(-length).map(month => ({
        month,
        score: parseFloat(Math.max(0, Math.min(100, baseScore + (Math.random() - 0.5) * 10)).toFixed(1))
    }));
};

// --- DATA LOADING & PROCESSING ---
export const loadAndProcessData = async () => {
    try {
        // --- FETCH RAW DATA FROM JSON FILES ---
        const [
            kesehatanLingkunganRawData,
            perkawinanAnakRawData,
            kasusPerlindunganAnakRawData,
            paudAccreditationRawData,
            paudTeacherQualificationRawData,
            ancData,
            nutritionData,
            aktaData,
            idlData,
            kemiskinanData,
            pkhData,
            sanitasiData,
            anakUsiaDiniPopulationRawData,
            paudParticipationRawData,
        ] = await Promise.all([
            fetch('/data/kesehatan_lingkungan.json').then(res => res.json()),
            fetch('/data/perkawinan_anak.json').then(res => res.json()),
            fetch('/data/kasus_perlindungan_anak.json').then(res => res.json()),
            fetch('/data/paud_akreditasi.json').then(res => res.json()),
            fetch('/data/paud_kualifikasi_guru.json').then(res => res.json()),
            fetch('/data/anc.json').then(res => res.json()),
            fetch('/data/gizi.json').then(res => res.json()),
            fetch('/data/akta.json').then(res => res.json()),
            fetch('/data/idl.json').then(res => res.json()),
            fetch('/data/kemiskinan.json').then(res => res.json()),
            fetch('/data/pkh.json').then(res => res.json()),
            fetch('/data/sanitasi.json').then(res => res.json()),
            fetch('/data/populasi_anak_usia_dini.json').then(res => res.json()),
            fetch('/data/partisipasi_paud.json').then(res => res.json()),
        ]);
        
        console.log('📊 Raw data loaded:', {
            aktaData: Object.keys(aktaData).length,
            nutritionData: Object.keys(nutritionData).length,
            paudParticipationRawData: Object.keys(paudParticipationRawData).length,
            kesehatanLingkunganRawData: Object.keys(kesehatanLingkunganRawData).length
        });
        
        const paudAccreditationData = paudAccreditationRawData.map((d) => ({
            'Provinsi': d.provinsi,
            'Jumlah PAUD': d.jumlah,
            'Status Akreditasi': `${d.akreditasi}%`,
            'Rasio Guru-Murid': d.rasio
        }));
        
        const paudTeacherQualificationData = paudTeacherQualificationRawData.map((d) => ({
            'Provinsi': d.provinsi,
            'Jumlah Guru PAUD': d.jumlah,
            'Guru Kualifikasi S1/D4': d.s1d4,
            'Persentase (%)': `${d.persentase.toFixed(2)}%`
        }));

        const allProvinceNames = new Set([
            ...Object.keys(aktaData),
            ...Object.keys(kesehatanLingkunganRawData),
            ...Object.keys(perkawinanAnakRawData)
        ]);
        const provinces = Array.from(allProvinceNames);
        
        console.log('📊 Provinces found:', provinces.length, provinces.slice(0, 5));

        // --- MOCK DATA GENERATION LOGIC ---
        const regionsDetails = {};

        provinces.forEach(provName => {
            try {
                const id = generateId(provName);
                
                const createDomainMetrics = (metrics) => {
                const validMetrics = metrics.filter((m) => m !== null);
                if (validMetrics.length === 0) return { riskScore: 0, metrics: [] };
                let totalRisk = 0;
                const riskContributingMetrics = validMetrics.filter(m => !m.label.trim().startsWith('-'));
                riskContributingMetrics.forEach(m => {
                    const value = typeof m.value === 'number' ? m.value : 0;
                    let risk;
                    if (m.maxValueForRisk) {
                        const normalizedValue = Math.min(100, (value / m.maxValueForRisk) * 100);
                        risk = m.higherIsBetter ? 100 - normalizedValue : normalizedValue;
                    } else {
                        risk = m.higherIsBetter ? 100 - value : value;
                    }
                    totalRisk += risk;
                });
                const riskScore = riskContributingMetrics.length > 0 ? parseFloat((totalRisk / riskContributingMetrics.length).toFixed(1)) : 0;
                return { riskScore, metrics: validMetrics };
            };
            
            let lookupKey = provName;
            if (provName === 'Kep. Riau') lookupKey = 'Kepulauan Riau';
            if (provName === 'Kep. Bangka Belitung') lookupKey = 'Kepulauan Bangka Belitung';

            const newHealthData = kesehatanLingkunganRawData[lookupKey];
            const vKeluhan = newHealthData ? newHealthData.keluhan : null;
            const vKesakitan = newHealthData ? newHealthData.kesakitan : null;
            const provNutrition = nutritionData[provName];
            const vStunting = provNutrition ? parseFloat((provNutrition.severelyStunted + provNutrition.stunted).toFixed(1)) : null;
            const vWasting = provNutrition ? parseFloat((provNutrition.severelyWasted + provNutrition.wasted).toFixed(1)) : null;
            const vUnderweight = provNutrition ? parseFloat((provNutrition.severelyUnderweight + provNutrition.underweight).toFixed(1)) : null;
            const vSeverelyStunted = provNutrition ? provNutrition.severelyStunted : null;
            const vStunted = provNutrition ? provNutrition.stunted : null;
            const vSeverelyWasted = provNutrition ? provNutrition.severelyWasted : null;
            const vWasted = provNutrition ? provNutrition.wasted : null;
            const vSeverelyUnderweight = provNutrition ? provNutrition.severelyUnderweight : null;
            const vUnderweightComponent = provNutrition ? provNutrition.underweight : null;
            const provAnc = ancData[provName];
            const vAnc = provAnc ? provAnc.anc : null;
            const vPersalinan = provAnc ? provAnc.persalinan : null;
            const vAkta = parseValue(aktaData[provName]);
            const vPerkawinanAnak = perkawinanAnakRawData[provName] ?? null;
            let provKasusName = provName;
            if (provName === 'Kepulauan Riau') provKasusName = 'Kep. Riau';
            const vKasus = kasusPerlindunganAnakRawData[provKasusName] ?? 0;
            const vIdl = parseValue(idlData[provName]);
            const vKemiskinan = parseValue(kemiskinanData[provName]);
            const vPkh = parseValue(pkhData[provName]);
            const sanData = sanitasiData[provName];
            const vAir = parseValue(sanData?.air);
            let vSanitasi = newHealthData?.sanitasi ?? parseValue(sanData?.sanitasi);
            const vCuci = parseValue(sanData?.cuci);
            const paudProvData = paudParticipationRawData[provName];
            const vPaud06 = parseValue(paudProvData?.partisipasi_0_6);
            const vPaudPraSD = parseValue(paudProvData?.partisipasi_pra_sd);
            
            const kesehatan = createDomainMetrics([
                vStunting !== null ? { label: 'Prevalensi Stunting (TB/U)', value: vStunting, unit: '%', nationalAverage: 21.8, higherIsBetter: false } : null,
                vSeverelyStunted !== null ? { label: '   - Sangat Pendek', value: vSeverelyStunted, unit: '%', nationalAverage: 7.0, higherIsBetter: false } : null,
                vStunted !== null ? { label: '   - Pendek', value: vStunted, unit: '%', nationalAverage: 14.8, higherIsBetter: false } : null,
                vIdl !== null ? { label: 'Cakupan Imunisasi Dasar (IDL)', value: vIdl, unit: '%', nationalAverage: 63.7, higherIsBetter: true } : null,
                vAnc !== null ? { label: 'Kunjungan ANC K4', value: vAnc, unit: '%', nationalAverage: 93.5, higherIsBetter: true } : null,
                vPersalinan !== null ? { label: 'Persalinan oleh Nakes', value: vPersalinan, unit: '%', nationalAverage: 90.3, higherIsBetter: true } : null,
                vKeluhan !== null ? { label: 'Tingkat Keluhan Kesehatan', value: vKeluhan, unit: '%', nationalAverage: 38.71, higherIsBetter: false } : null,
                vKesakitan !== null ? { label: 'Angka Kesakitan', value: vKesakitan, unit: '%', nationalAverage: 20.20, higherIsBetter: false } : null
            ]);
            const gizi = createDomainMetrics([
                vWasting !== null ? { label: 'Gizi Buruk (Wasting, BB/TB)', value: vWasting, unit: '%', nationalAverage: 7.7, higherIsBetter: false } : null,
                vSeverelyWasted !== null ? { label: '   - Sangat Kurus', value: vSeverelyWasted, unit: '%', nationalAverage: 2.0, higherIsBetter: false } : null,
                vWasted !== null ? { label: '   - Kurus', value: vWasted, unit: '%', nationalAverage: 5.7, higherIsBetter: false } : null,
                vUnderweight !== null ? { label: 'Gizi Kurang (Underweight, BB/U)', value: vUnderweight, unit: '%', nationalAverage: 17.7, higherIsBetter: false } : null,
                vSeverelyUnderweight !== null ? { label: '   - Berat Badan Sangat Kurang', value: vSeverelyUnderweight, unit: '%', nationalAverage: 5.0, higherIsBetter: false } : null,
                vUnderweightComponent !== null ? { label: '   - Berat Badan Kurang', value: vUnderweightComponent, unit: '%', nationalAverage: 12.7, higherIsBetter: false } : null,
            ]);
            const pendidikan = createDomainMetrics([
                vPaud06 !== null ? { label: 'Partisipasi PAUD (0–6 th)', value: vPaud06, unit: '%', nationalAverage: 27.3, higherIsBetter: true } : null,
                vPaudPraSD !== null ? { label: 'Partisipasi 1 Th Sebelum SD', value: vPaudPraSD, unit: '%', nationalAverage: 95.2, higherIsBetter: true } : null
            ]);
            const pengasuhan = createDomainMetrics([]);
            const perlindungan = createDomainMetrics([
                vAkta !== null ? { label: 'Kepemilikan Akta Lahir', value: vAkta, unit: '%', nationalAverage: 88, higherIsBetter: true } : null,
                vPerkawinanAnak !== null ? { label: 'Perkawinan Usia Anak (<18 th)', value: vPerkawinanAnak, unit: '%', nationalAverage: 5.9, higherIsBetter: false } : null,
                { label: 'Jumlah Kasus Kekerasan Anak', value: vKasus, unit: 'kasus', nationalAverage: 1000, higherIsBetter: false, maxValueForRisk: 5000 }
            ]);
            const kesejahteraan = createDomainMetrics([
                vKemiskinan !== null ? { label: 'Anak di Bawah Garis Kemiskinan', value: vKemiskinan, unit: '%', nationalAverage: 12.4, higherIsBetter: false } : null,
                vPkh !== null ? { label: 'Keluarga Penerima PKH', value: vPkh, unit: '%', nationalAverage: 15.1, higherIsBetter: false } : null
            ]);
            const lingkungan = createDomainMetrics([
                vAir !== null ? { label: 'Akses Air Minum Layak', value: vAir, unit: '%', nationalAverage: 91, higherIsBetter: true } : null,
                vSanitasi !== null ? { label: 'Akses Sanitasi Layak', value: vSanitasi, unit: '%', nationalAverage: 83.22, higherIsBetter: true } : null,
                vCuci !== null ? { label: 'Fasilitas Cuci Tangan', value: vCuci, unit: '%', nationalAverage: 78, higherIsBetter: true } : null
            ]);
            const bencana = createDomainMetrics([]);
            const domains = { Kesehatan: kesehatan, Gizi: gizi, Pendidikan: pendidikan, Pengasuhan: pengasuhan, Perlindungan: perlindungan, Kesejahteraan: kesejahteraan, Lingkungan: lingkungan, Bencana: bencana };
            const overallRisk = parseFloat(
                (Object.values(domains).reduce((sum, d) => sum + d.riskScore, 0) / Object.values(domains).filter(d => d.riskScore > 0).length).toFixed(1)
            );

            regionsDetails[id] = {
                id, name: provName, overallRisk, population: parsePopulation(anakUsiaDiniPopulationRawData[provName]), activeAlertsCount: 0, domains, historicalRisk: generateHistoricalData(overallRisk),
            };
            } catch (error) {
                console.error(`❌ Error processing province ${provName}:`, error);
            }
        });

        const nameToIdMap = new Map(Object.values(regionsDetails).map(r => [r.name, r.id]));
        paudAccreditationRawData.forEach((newProvData) => {
            const provNameKey = newProvData.provinsi === 'Kepulauan Bangka Belitung' ? 'Kep. Bangka Belitung' : newProvData.provinsi;
            const provinceId = nameToIdMap.get(provNameKey);
            if (provinceId && regionsDetails[provinceId]) {
                const province = regionsDetails[provinceId];
                if (newProvData.provinsi === 'Kepulauan Bangka Belitung') province.name = 'Kepulauan Bangka Belitung';
                const educationMetrics = province.domains.Pendidikan.metrics;
                educationMetrics.push({ label: 'Jumlah Satuan PAUD', value: newProvData.jumlah, unit: '', nationalAverage: 1500, higherIsBetter: true, });
                educationMetrics.push({ label: 'Persentase Akreditasi PAUD', value: newProvData.akreditasi, unit: '%', nationalAverage: 75, higherIsBetter: true, });
                const ratioValue = parseInt(newProvData.rasio.split(':')[1], 10);
                educationMetrics.push({ label: 'Rasio Guru-Murid', value: `1:${ratioValue}`, unit: '', nationalAverage: 12, higherIsBetter: false, });
                
                let totalRisk = 0;
                const riskMetrics = [];
                educationMetrics.forEach(m => {
                    if (typeof m.value === 'number' && m.label !== 'Jumlah Satuan PAUD') {
                        riskMetrics.push({ value: m.value, higherIsBetter: m.higherIsBetter });
                    }
                });
                riskMetrics.push({ value: ratioValue, higherIsBetter: false });
                riskMetrics.forEach(m => { totalRisk += m.higherIsBetter ? 100 - m.value : m.value; });
                province.domains.Pendidikan.riskScore = riskMetrics.length > 0 ? parseFloat((totalRisk / riskMetrics.length).toFixed(1)) : province.domains.Pendidikan.riskScore;
                province.overallRisk = parseFloat((Object.values(province.domains).reduce((sum, d) => sum + d.riskScore, 0) / Object.values(province.domains).filter(d => d.riskScore > 0).length).toFixed(1));
            }
        });

        paudTeacherQualificationRawData.forEach((teacherData) => {
            let provNameKey = teacherData.provinsi;
            if (provNameKey === 'Kep. Riau') provNameKey = 'Kepulauan Riau';
            const provinceId = nameToIdMap.get(provNameKey);
            if (provinceId && regionsDetails[provinceId]) {
                const province = regionsDetails[provinceId];
                const educationMetrics = province.domains.Pendidikan.metrics;
                educationMetrics.push({ label: 'Jumlah Guru PAUD', value: teacherData.jumlah, unit: '', nationalAverage: 35000, higherIsBetter: true, });
                educationMetrics.push({ label: 'Persentase Guru S1/D4', value: teacherData.persentase, unit: '%', nationalAverage: 94, higherIsBetter: true, });
                
                let totalRisk = 0;
                const riskMetrics = [];
                educationMetrics.forEach(m => {
                    if (typeof m.value === 'number' && m.label !== 'Jumlah Satuan PAUD' && m.label !== 'Jumlah Guru PAUD') {
                        riskMetrics.push({ value: m.value, higherIsBetter: m.higherIsBetter });
                    } else if (typeof m.value === 'string' && m.label === 'Rasio Guru-Murid' && m.value.includes(':')) {
                         const ratioValue = parseInt(m.value.split(':')[1], 10);
                         if (!isNaN(ratioValue)) riskMetrics.push({ value: ratioValue, higherIsBetter: false });
                    }
                });
                riskMetrics.forEach(m => { totalRisk += m.higherIsBetter ? 100 - m.value : m.value; });
                province.domains.Pendidikan.riskScore = riskMetrics.length > 0 ? parseFloat((totalRisk / riskMetrics.length).toFixed(1)) : province.domains.Pendidikan.riskScore;
                province.overallRisk = parseFloat((Object.values(province.domains).reduce((sum, d) => sum + d.riskScore, 0) / Object.values(province.domains).filter(d => d.riskScore > 0).length).toFixed(1));
            }
        });

        // --- DERIVED & OTHER MOCK DATA ---
        const kabupatenKotaDetails = {};
        const allActiveAlerts = Object.values(regionsDetails).flatMap(region => {
            const alerts = [];
            Object.entries(region.domains).forEach(([domainName, domainData]) => {
                if (domainData.riskScore > 85) alerts.push({ id: `${region.id}-${domainName}-crit`, level: AlertLevel.Critical, title: `Risiko Sangat Tinggi di Bidang ${domainName}`, region: region.name, domain: domainName, riskScore: domainData.riskScore });
                else if (domainData.riskScore > 70) alerts.push({ id: `${region.id}-${domainName}-high`, level: AlertLevel.High, title: `Risiko Tinggi di Bidang ${domainName}`, region: region.name, domain: domainName, riskScore: domainData.riskScore, trend: parseFloat(((Math.random()-0.2) * 5).toFixed(1)) });
            });
            return alerts;
        }).sort((a,b) => b.riskScore - a.riskScore);
        Object.values(regionsDetails).forEach(r => { r.activeAlertsCount = allActiveAlerts.filter(a => a.region === r.name).length; });
        const nationalHistoricalRisk = generateHistoricalData(Object.values(regionsDetails).reduce((sum, r) => sum + r.overallRisk, 0) / provinces.length, 6);
        
        // Generate key indicators by domain
        const calculateNationalAverage = (getter) => {
            const values = Object.values(regionsDetails).map(getter).filter((v) => v !== null && v !== undefined);
            const avg = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
            return { value: `${avg.toFixed(1)}%`, label: '', change: parseFloat(((Math.random() - 0.5) * 5).toFixed(1)), changeType: Math.random() > 0.5 ? 'increase' : 'decrease', domain: 'Semua' };
        };
        
        const keyIndicatorsByDomain = {
  'Semua': [
                { ...calculateNationalAverage(r => r.domains.Pendidikan.metrics.find(m => m.label.includes('PAUD (0–6 th)'))?.value), label: 'Rata-rata Partisipasi PAUD Nasional' },
                { ...calculateNationalAverage(r => r.domains.Perlindungan.metrics.find(m => m.label.includes('Akta'))?.value), label: 'Rata-rata Kepemilikan Akta Lahir' },
                { ...calculateNationalAverage(r => r.domains.Gizi.metrics.find(m => m.label.includes('Wasting'))?.value), label: 'Rata-rata Gizi Buruk (Wasting)' },
  ],
  'Kesehatan': [
                { ...calculateNationalAverage(r => r.domains.Kesehatan.metrics.find(m => m.label.includes('Stunting'))?.value), label: 'Prevalensi Stunting' },
                { ...calculateNationalAverage(r => r.domains.Kesehatan.metrics.find(m => m.label.includes('Imunisasi'))?.value), label: 'Cakupan Imunisasi Dasar' },
                { ...calculateNationalAverage(r => r.domains.Kesehatan.metrics.find(m => m.label.includes('ANC'))?.value), label: 'Kunjungan ANC K4' },
  ],
  'Gizi': [
                { ...calculateNationalAverage(r => r.domains.Gizi.metrics.find(m => m.label.includes('Wasting'))?.value), label: 'Gizi Buruk (Wasting)' },
                { ...calculateNationalAverage(r => r.domains.Gizi.metrics.find(m => m.label.includes('Underweight'))?.value), label: 'Gizi Kurang (Underweight)' },
  ],
  'Pendidikan': [
                { ...calculateNationalAverage(r => r.domains.Pendidikan.metrics.find(m => m.label.includes('PAUD (0–6 th)'))?.value), label: 'Partisipasi PAUD (0–6 th)' },
                { ...calculateNationalAverage(r => r.domains.Pendidikan.metrics.find(m => m.label.includes('Sebelum SD'))?.value), label: 'Partisipasi 1 Th Sebelum SD' },
            ],
            'Pengasuhan': [],
  'Perlindungan': [
                { ...calculateNationalAverage(r => r.domains.Perlindungan.metrics.find(m => m.label.includes('Akta'))?.value), label: 'Kepemilikan Akta Lahir' }
  ],
  'Kesejahteraan': [
                { ...calculateNationalAverage(r => r.domains.Kesejahteraan.metrics.find(m => m.label.includes('Kemiskinan'))?.value), label: 'Anak di Bawah Garis Kemiskinan' }
  ],
  'Lingkungan': [
                { ...calculateNationalAverage(r => r.domains.Lingkungan.metrics.find(m => m.label.includes('Air'))?.value), label: 'Akses Air Minum Layak' },
                { ...calculateNationalAverage(r => r.domains.Lingkungan.metrics.find(m => m.label.includes('Sanitasi'))?.value), label: 'Akses Sanitasi Layak' }
            ],
            'Bencana': [],
        };
        
        // Return all processed data
        console.log('📊 Generated keyIndicatorsByDomain:', keyIndicatorsByDomain);
        console.log('📊 Regions count:', Object.keys(regionsDetails).length);
        console.log('📊 Alerts count:', allActiveAlerts.length);
        
        return {
  regionsDetails,
  kabupatenKotaDetails,
  allActiveAlerts,
            nationalHistoricalRisk,
            paudAccreditationData,
            paudTeacherQualificationData,
            mockInterventionPlans: [],
            regionalRiskScores: Object.values(regionsDetails).map(r => ({ name: r.name, score: r.overallRisk })),
            keyIndicatorsByDomain,
        };
    } catch (error) {
        console.error('Error loading and processing data:', error);
        // Return empty data structure as fallback
        return {
            regionsDetails: {},
            kabupatenKotaDetails: {},
            allActiveAlerts: [],
            nationalHistoricalRisk: [],
            paudAccreditationData: [],
            paudTeacherQualificationData: [],
            mockInterventionPlans: [],
            regionalRiskScores: [],
            keyIndicatorsByDomain: {},
        };
    }
};

// Export default processed data (loaded at module level)
let processedData = null;

export const getMockData = async () => {
    if (!processedData) {
        processedData = await loadAndProcessData();
    }
    return processedData;
};

// Export individual data components for backward compatibility
export const mockInterventionPlans = [];
export const regionsDetails = {};
export const kabupatenKotaDetails = {};
export const allActiveAlerts = [];
export const nationalHistoricalRisk = [];
export const keyIndicatorsByDomain = {};
export const paudParticipationData2024 = [];
export const paudAccreditationData = [];
export const paudTeacherQualificationData = [];
export const riskAssessmentData = [];
export const forecastChartData = [];
export const dataSources = [];
export const processingLogs = [];
export const mockResourceData = { sdm: [], anggaran: [], material: [] };
export const regionalRiskScores = [];
export const mockParentData = {
    childProfile: { name: 'Anak Anda', age: 'Data belum ada', avatarUrl: 'https://i.pravatar.cc/150?u=defaultchild', lastWeight: null, lastHeight: null },
    upcomingEvents: [],
    growthHistory: [],
    stimulationChecklist: []
};
