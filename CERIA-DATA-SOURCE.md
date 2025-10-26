# CERIA Data Source Configuration

## Perubahan Sumber Data

CERIA sekarang mengambil data untuk analisis dari lokasi yang benar:

### **Sumber Data**
- **Lokasi**: `src/components/ceria/components/data/`
- **Runtime**: `public/data/` (disalin otomatis)

### **File JSON yang Digunakan**
1. `akta.json` - Data kepemilikan akta lahir
2. `anc.json` - Data kunjungan ANC dan persalinan
3. `gizi.json` - Data gizi (stunting, wasting, underweight)
4. `idl.json` - Data imunisasi dasar lengkap
5. `kasus_perlindungan_anak.json` - Data kasus kekerasan anak
6. `kemiskinan.json` - Data anak di bawah garis kemiskinan
7. `kesehatan_lingkungan.json` - Data kesehatan lingkungan
8. `partisipasi_paud.json` - Data partisipasi PAUD
9. `paud_akreditasi.json` - Data akreditasi PAUD
10. `paud_kualifikasi_guru.json` - Data kualifikasi guru PAUD
11. `perkawinan_anak.json` - Data perkawinan usia anak
12. `pkh.json` - Data keluarga penerima PKH
13. `populasi_anak_usia_dini.json` - Data populasi anak usia dini
14. `sanitasi.json` - Data sanitasi dan air minum

### **Cara Kerja**
1. **Source**: File JSON tersimpan di `src/components/ceria/components/data/`
2. **Build**: File disalin ke `public/data/` saat build atau manual
3. **Runtime**: CERIA mengambil data via `fetch('/data/*.json')`
4. **Processing**: Data diproses oleh `loadAndProcessData()` di `mockData.js`

### **Script Sinkronisasi**
Gunakan script PowerShell untuk sinkronisasi manual:
```powershell
powershell -ExecutionPolicy Bypass -File sync-ceria-data.ps1
```

Atau perintah langsung:
```powershell
Copy-Item -Path "src\components\ceria\components\data\*.json" -Destination "public\data\" -Force
```

### **Struktur Data**
Setiap file JSON berisi data per provinsi dengan format:
```json
{
    "Provinsi": {
        "indikator1": "nilai1",
        "indikator2": "nilai2"
    }
}
```

### **Pemrosesan**
- **Parsing**: Konversi string ke number dengan `parseValue()`
- **Risk Calculation**: Kalkulasi risk score per domain
- **Aggregation**: Gabungkan data PAUD akreditasi dan kualifikasi guru
- **Derivation**: Generate alerts, forecast, dan metrics

### **Mode Data**
CERIA mendukung dua mode:
1. **Mock Data**: Menggunakan file JSON (default)
2. **API Integration**: Menggunakan backend API (opsional)

Mode ditentukan oleh `useIntegration` di ThemeContext.

