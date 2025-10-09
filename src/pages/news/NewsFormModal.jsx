// components/NewsFormModal.jsx - Versi simplified
import React, { useState, useEffect } from 'react';
import { Save, X, Eye, EyeOff } from 'lucide-react';
import ImageUpload from './ImageUpload';
import ImageMetadata from './ImageMetadata';

const NewsFormModal = ({
  editingNews,
  newsForm,
  formLoading,
  connectionStatus,
  onSave,
  onCancel
}) => {
  const [localForm, setLocalForm] = useState({
    title: '',
    excerpt: '',
    content: '', // Use content instead of fullContent
    tags: '',
    status: 'draft',
    image: null
  });
  
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Update local form ketika props berubah
  useEffect(() => {
    if (newsForm) {
      const normalizedImage = typeof newsForm.image === 'string' && newsForm.image
        ? { url: newsForm.image }
        : (newsForm.image || null);
      setLocalForm({
        title: newsForm.title || '',
        excerpt: newsForm.excerpt || '',
        content: newsForm.content || '', // Use content instead of fullContent
        tags: newsForm.tags || '',
        status: newsForm.status || 'draft',
        image: normalizedImage
      });
    }
  }, [newsForm]);

  // Handle perubahan field basic
  const handleChange = (field, value) => {
    setLocalForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle perubahan image
  const handleImageChange = (imageData) => {
    setLocalForm(prev => ({ ...prev, image: imageData }));
  };

  // Handle perubahan metadata image
  const handleImageMetadataChange = (metadata) => {
    if (localForm.image) {
      setLocalForm(prev => ({
        ...prev,
        image: { ...prev.image, ...metadata }
      }));
    }
  };

  // Handle submit
  const handleSubmit = () => {
    // Validasi basic
    if (!localForm.title.trim()) {
      alert('Judul tidak boleh kosong');
      return;
    }
    if (!localForm.excerpt.trim()) {
      alert('Ringkasan tidak boleh kosong');
      return;
    }
    if (!localForm.content.trim()) {
      alert('Konten tidak boleh kosong');
      return;
    }

    // Prepare data with standardized field
    const formDataToSend = {
      title: localForm.title.trim(),
      excerpt: localForm.excerpt.trim(),
      content: localForm.content.trim(), // Use content field directly
      tags: localForm.tags,
      status: localForm.status,
      image: localForm.image
    };

    console.log("📝 Form data being sent:", formDataToSend);
    onSave(formDataToSend);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {editingNews ? 'Edit Berita' : 'Buat Berita Baru'}
            </h3>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
              disabled={formLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Judul <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={localForm.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan judul berita..."
                  disabled={formLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Ringkasan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={localForm.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Ringkasan berita..."
                  disabled={formLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Konten Lengkap <span className="text-red-500">*</span>
                  {localForm.image && (
                    <button
                      type="button"
                      onClick={() => setShowImagePreview(!showImagePreview)}
                      className="ml-2 text-blue-600 hover:text-blue-800 text-xs underline"
                    >
                      {showImagePreview ? <EyeOff className="w-3 h-3 inline" /> : <Eye className="w-3 h-3 inline" />}
                      {showImagePreview ? ' Sembunyikan' : ' Tampilkan'} Preview
                    </button>
                  )}
                </label>
                
                {/* Image Preview dalam Konten */}
                {showImagePreview && ((typeof localForm.image === 'string' && localForm.image) || localForm.image?.url) && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
                    <div className="text-xs text-gray-600 mb-2">Preview gambar dalam artikel:</div>
                    <img
                      src={typeof localForm.image === 'string' ? localForm.image : localForm.image.url}
                      alt={(localForm.image && localForm.image.alt) || 'Preview'}
                      className="max-w-full h-auto max-h-48 object-contain rounded border mx-auto"
                    />
                    {localForm.image.caption && (
                      <p className="text-xs text-gray-500 mt-2 text-center italic">
                        {localForm.image.caption}
                      </p>
                    )}
                  </div>
                )}
                
                <textarea
                  value={localForm.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="10"
                  placeholder="Konten lengkap berita..."
                  disabled={formLoading}
                  required
                />
              </div>

              {/* Hidden fields: Tags and Status (disederhanakan sesuai permintaan) */}
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gambar Utama <span className="text-gray-400 text-xs">(opsional)</span>
                </label>
                
                <ImageUpload
                  value={localForm.image}
                  onChange={handleImageChange}
                  disabled={formLoading}
                />
              </div>

              {/* Image Metadata */}
              {localForm.image && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Detail Gambar
                  </label>
                  
                  <ImageMetadata
                    value={localForm.image}
                    onChange={handleImageMetadataChange}
                    disabled={formLoading}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 mt-6 pt-6 border-t">
            <button
              onClick={handleSubmit}
              disabled={formLoading || connectionStatus !== 'connected'}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              <Save className="w-4 h-4" />
              {formLoading ? 'Menyimpan...' : (editingNews ? 'Update Berita' : 'Simpan Berita')}
            </button>
            <button
              onClick={onCancel}
              disabled={formLoading}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 disabled:opacity-50 font-medium"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFormModal;