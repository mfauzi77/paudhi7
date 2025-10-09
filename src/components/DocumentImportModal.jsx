import React, { useState, useRef } from 'react';
import { 
  Upload, FileText, X, AlertCircle, CheckCircle, 
  Download, Trash2, Eye, Calendar, Building
} from 'lucide-react';
import apiService from '../utils/apiService';

const DocumentImportModal = ({ isOpen, onClose, klList, onImportSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [importResults, setImportResults] = useState(null);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    klId: '',
    tahun: new Date().getFullYear(),
    kategori: 'LAPORAN',
    deskripsi: ''
  });

  const documentCategories = [
    { id: 'LAPORAN', name: 'Laporan', description: 'Laporan resmi program/kegiatan' },
    { id: 'DOKUMEN_PENDUKUNG', name: 'Dokumen Pendukung', description: 'Dokumen pendukung kegiatan' },
    { id: 'EVIDENCE', name: 'Evidence', description: 'Bukti pelaksanaan kegiatan' },
    { id: 'LAPORAN_KEUANGAN', name: 'Laporan Keuangan', description: 'Laporan keuangan dan anggaran' },
    { id: 'LAINNYA', name: 'Lainnya', description: 'Dokumen lainnya' }
  ];

  const allowedFileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv'
  ];

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      if (!allowedFileTypes.includes(file.type)) {
        setError(`File ${file.name} tidak didukung. Hanya PDF, Word, Excel, dan CSV yang diizinkan.`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError(`File ${file.name} terlalu besar. Maksimal 10MB.`);
        return false;
      }
      return true;
    });
    
    setSelectedFiles(validFiles);
    setError(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.klId) {
      setError('Silakan pilih K/L');
      return false;
    }
    if (!formData.tahun) {
      setError('Silakan pilih tahun');
      return false;
    }
    if (!formData.kategori) {
      setError('Silakan pilih kategori dokumen');
      return false;
    }
    if (selectedFiles.length === 0) {
      setError('Silakan pilih file yang akan diupload');
      return false;
    }
    return true;
  };

  const handleImport = async () => {
    if (!validateForm()) return;

    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);

      let result;
      if (selectedFiles.length === 1) {
        // Single file upload
        result = await apiService.importDocument(selectedFiles[0], formData);
      } else {
        // Bulk upload
        result = await apiService.importDocumentsBulk(selectedFiles, formData);
      }

      setImportResults(result);
      
      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      setTimeout(() => {
        setUploading(false);
        if (onImportSuccess) {
          onImportSuccess(result);
        }
      }, 2000);

    } catch (error) {
      console.error('Import error:', error);
      setError(error.message || 'Gagal mengimport dokumen');
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setImportResults(null);
    setError(null);
    setUploadProgress(0);
    setFormData({
      klId: '',
      tahun: new Date().getFullYear(),
      kategori: 'LAPORAN',
      deskripsi: ''
    });
    onClose();
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Import Dokumen</h2>
              <p className="text-sm text-gray-600">Upload dokumen untuk RAN PAUD HI</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-red-900">Error</div>
                <div className="text-sm text-red-700 mt-1">{error}</div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {importResults && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-green-900">Import Berhasil!</div>
                <div className="text-sm text-green-700 mt-1">
                  {importResults.message}
                </div>
                {importResults.data && (
                  <div className="mt-2 text-xs text-green-600">
                    {importResults.data.successCount} file berhasil diimport
                    {importResults.data.errorCount > 0 && (
                      <span className="ml-2 text-red-600">
                        {importResults.data.errorCount} file gagal
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kementerian/Lembaga
              </label>
              <select
                value={formData.klId}
                onChange={(e) => handleFormChange('klId', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih K/L</option>
                {klList.map(kl => (
                  <option key={kl.id} value={kl.id}>{kl.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tahun
              </label>
              <select
                value={formData.tahun}
                onChange={(e) => handleFormChange('tahun', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori Dokumen
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => handleFormChange('kategori', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {documentCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi (Opsional)
              </label>
              <input
                type="text"
                value={formData.deskripsi}
                onChange={(e) => handleFormChange('deskripsi', e.target.value)}
                placeholder="Deskripsi dokumen..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Pilih File
              </button>
              <p className="text-sm text-gray-500 mt-2">
                PDF, Word, Excel, atau CSV (maksimal 10MB per file)
              </p>
            </div>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">File yang Dipilih ({selectedFiles.length})</h4>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                        <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {uploading && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Uploading...</span>
                <span className="text-sm text-gray-500">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleImport}
            disabled={uploading || selectedFiles.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Import Dokumen
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentImportModal; 