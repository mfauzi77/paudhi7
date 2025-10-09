// frontend/src/utils/apiService.js - UPDATED dengan RAN PAUD Methods
class ApiService {
  constructor(baseURL = "http://localhost:5000/api") {
    this.baseURL = baseURL;
    this.token = localStorage.getItem("authToken");
  }

  // Set auth token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }

  // Get headers with auth
  getHeaders(contentType = "application/json") {
    const headers = {};

    // Only set Content-Type for JSON requests
    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    // Handle FormData (for file uploads)
    if (options.body instanceof FormData) {
      // Remove Content-Type header for FormData (browser will set it)
      delete config.headers["Content-Type"];
    }

    try {
      console.log(`API Request: ${config.method || "GET"} ${url}`);
      console.log("🔐 Request headers:", config.headers);
      console.log("🔑 Auth token in headers:", config.headers.Authorization ? 'Present' : 'Missing');
      const response = await fetch(url, config);

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMessage =
          data.message || data.error || data || "Request failed";
        console.error("API Error Response:", errorMessage);

        // Create error object with status and response data
        const error = new Error(errorMessage);
        error.status = response.status;
        error.response = { data };
        throw error;
      }

      console.log(`API Response: ${response.status}`, data);
      return data;
    } catch (error) {
      console.error("API Request Error:", error);

      // Handle network errors
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        const networkError = new Error(
          "Koneksi ke server gagal. Pastikan backend berjalan di port 5000."
        );
        networkError.status = 0;
        throw networkError;
      }

      throw error;
    }
  }

  // ============ AUTH METHODS ============
  async login(email, password) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async logout() {
    this.setToken(null);
  }

  // ============ IMAGE UPLOAD METHODS ============

  /**
   * Upload single image file to server
   * @param {File} imageFile - The image file to upload
   * @param {Object} options - Additional options like alt text, caption, etc.
   * @returns {Promise<Object>} Response with image URL and metadata
   */
  async uploadImage(imageFile, options = {}) {
    if (!imageFile || !(imageFile instanceof File)) {
      throw new Error("File gambar tidak valid");
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(imageFile.type)) {
      throw new Error(
        "Format file tidak didukung. Gunakan JPEG, PNG, GIF, atau WebP."
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (imageFile.size > maxSize) {
      throw new Error("Ukuran file terlalu besar. Maksimal 5MB.");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    // Add optional metadata
    if (options.alt) formData.append("alt", options.alt);
    if (options.caption) formData.append("caption", options.caption);
    if (options.category) formData.append("category", options.category);

    try {
      const response = await this.request("/upload/image", {
        method: "POST",
        body: formData,
      });

      return response;
    } catch (error) {
      console.error("Upload image error:", error);
      throw new Error(`Gagal mengupload gambar: ${error.message}`);
    }
  }

  /**
   * Upload multiple images
   * @param {FileList|Array} imageFiles - Array of image files
   * @param {Object} options - Upload options
   * @returns {Promise<Array>} Array of upload responses
   */
  async uploadMultipleImages(imageFiles, options = {}) {
    const files = Array.from(imageFiles);
    const uploadPromises = files.map((file) => this.uploadImage(file, options));

    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      throw new Error(`Gagal mengupload beberapa gambar: ${error.message}`);
    }
  }

  /**
   * Delete image from server
   * @param {string} imageUrl - URL of the image to delete
   * @returns {Promise<Object>} Delete response
   */
  async deleteImage(imageUrl) {
    if (!imageUrl) {
      throw new Error("URL gambar tidak valid");
    }

    try {
      const response = await this.request("/upload/image", {
        method: "DELETE",
        body: JSON.stringify({ imageUrl }),
      });

      return response;
    } catch (error) {
      console.error("Delete image error:", error);
      throw new Error(`Gagal menghapus gambar: ${error.message}`);
    }
  }

  // ==================== NEWS METHODS ====================
  
  async getNews(params = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/news${queryString ? `?${queryString}` : ''}`;
    
    console.log("📡 getNews called with params:", params);
    console.log("🔗 Endpoint:", endpoint);
    console.log("🔐 Auth token exists:", !!this.token);
    
    return this.request(endpoint);
  }

  async getNewsById(id) {
    return this.request(`/news/${id}`);
  }

  async createNews(newsData) {
    console.log("🔄 createNews called with data:", newsData);
    console.log("🖼️ Image data in apiService:", {
      image: newsData.image,
      imageType: typeof newsData.image,
      isFile: newsData.image instanceof File,
      isObject: typeof newsData.image === 'object',
      hasFile: newsData.image?.file instanceof File,
      hasUrl: newsData.image?.url,
      urlType: typeof newsData.image?.url,
      urlValue: newsData.image?.url
    });
    
    const formData = new FormData();
    
    // Handle image (file, object with file, or string URL)
    if (newsData.image instanceof File) {
      formData.append('image', newsData.image);
      console.log("📁 Image file appended:", newsData.image.name);
    } else if (newsData.image && typeof newsData.image === 'object') {
      // Check if object has file property (from ImageUpload component)
      if (newsData.image.file instanceof File) {
        formData.append('image', newsData.image.file);
        console.log("📁 Image file from object appended:", newsData.image.file.name);
      } else if (newsData.image.url) {
        formData.append('image', newsData.image.url);
        console.log("🔗 Image URL (from object) appended:", newsData.image.url);
        console.log("⚠️ WARNING: This might be a base64 URL!");
      }
    } else if (typeof newsData.image === 'string' && newsData.image) {
      formData.append('image', newsData.image);
      console.log("🔗 Image URL appended:", newsData.image);
      console.log("⚠️ WARNING: This might be a base64 URL!");
    }
    
    // Handle other fields with proper mapping
    Object.keys(newsData).forEach(key => {
      if (key !== 'image' && newsData[key] !== undefined) {
        if (key === 'content') {
          // Ensure content field is always sent
          formData.append('content', newsData.content);
          console.log("📝 Content field appended:", newsData.content.substring(0, 50) + "...");
        } else if (typeof newsData[key] === 'object') {
          formData.append(key, JSON.stringify(newsData[key]));
          console.log(`📝 ${key} field appended (object):`, newsData[key]);
        } else {
          formData.append(key, newsData[key]);
          console.log(`📝 ${key} field appended:`, newsData[key]);
        }
      }
    });
    
    console.log("📤 FormData prepared, sending to API...");
    
    return this.request('/news', {
      method: 'POST',
      body: formData
    });
  }

  async updateNews(id, newsData) {
    const formData = new FormData();
    
    // Handle image (file, object with file, or string URL)
    if (newsData.image instanceof File) {
      formData.append('image', newsData.image);
    } else if (newsData.image && typeof newsData.image === 'object') {
      // Check if object has file property (from ImageUpload component)
      if (newsData.image.file instanceof File) {
        formData.append('image', newsData.image.file);
      } else if (newsData.image.url) {
        formData.append('image', newsData.image.url);
      }
    } else if (typeof newsData.image === 'string' && newsData.image) {
      formData.append('image', newsData.image);
    }
    
    // Handle other fields with proper mapping
    Object.keys(newsData).forEach(key => {
      if (key !== 'image' && newsData[key] !== undefined) {
        if (key === 'content') {
          // Ensure content field is always sent
          formData.append('content', newsData.content);
        } else if (typeof newsData[key] === 'object') {
          formData.append(key, JSON.stringify(newsData[key]));
        } else {
          formData.append(key, newsData[key]);
        }
      }
    });
    
    return this.request(`/news/${id}`, {
      method: 'PUT',
      body: formData
    });
  }

  async deleteNews(id) {
    return this.request(`/news/${id}`, {
      method: 'DELETE'
    });
  }

  // ==================== SEARCH METHODS ====================
  
  async searchNews(query) {
    return this.request(`/news?search=${encodeURIComponent(query)}`);
  }

  async searchRanPaud(query) {
    return this.request(`/ran-paud?search=${encodeURIComponent(query)}`);
  }

  async searchPembelajaran(query) {
    return this.request(`/pembelajaran?search=${encodeURIComponent(query)}`);
  }

  // ==================== NEWS APPROVAL METHODS ====================
  
  async getPendingNews() {
    return this.request('/news/pending');
  }

  async submitNewsForApproval(id) {
    return this.request(`/news/${id}/submit`, {
      method: 'POST'
    });
  }

  async approveNews(id) {
    return this.request(`/news/${id}/approve`, {
      method: 'POST'
    });
  }

  async rejectNews(id, reason) {
    return this.request(`/news/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
  }

  async returnNewsToDraft(id) {
    return this.request(`/news/${id}/return-draft`, {
      method: 'POST'
    });
  }

  // ============ FAQ METHODS ============
  async getFAQs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/faq?${queryString}`);
  }

  async getAllFAQs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/faq/all?${queryString}`);
  }

  async getFAQById(id) {
    return this.request(`/faq/${id}`);
  }

  async createFAQ(faqData) {
    return this.request("/faq", {
      method: "POST",
      body: JSON.stringify(faqData),
    });
  }

  async updateFAQ(id, faqData) {
    return this.request(`/faq/${id}`, {
      method: "PUT",
      body: JSON.stringify(faqData),
    });
  }

  async deleteFAQ(id) {
    return this.request(`/faq/${id}`, {
      method: "DELETE",
    });
  }

  async toggleFAQStatus(id) {
    return this.request(`/faq/${id}/toggle`, {
      method: "PATCH",
    });
  }

  async reorderFAQs(faqIds) {
    return this.request("/faq/reorder", {
      method: "PUT",
      body: JSON.stringify({ faqIds }),
    });
  }

  // ============ PEMBELAJARAN METHODS ============
  async getPembelajaran(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/pembelajaran?${queryString}`);
  }

  async getPembelajaranById(id) {
    return this.request(`/pembelajaran/${id}`);
  }

  async createPembelajaran(data) {
    // Handle image upload jika ada
    if (data.image && data.image instanceof File) {
      try {
        const uploadResult = await this.uploadImage(data.image, {
          alt: data.title,
          category: "pembelajaran",
        });
        data.thumbnail = uploadResult.url || uploadResult.imageUrl;
        delete data.image; // Remove file object
      } catch (error) {
        console.warn("Image upload failed:", error);
      }
    }

    return this.request("/pembelajaran", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatePembelajaran(id, data) {
    // Handle image upload jika ada
    if (data.image && data.image instanceof File) {
      try {
        const uploadResult = await this.uploadImage(data.image, {
          alt: data.title,
          category: "pembelajaran",
        });
        data.thumbnail = uploadResult.url || uploadResult.imageUrl;
        delete data.image; // Remove file object
      } catch (error) {
        console.warn("Image upload failed:", error);
      }
    }

    return this.request(`/pembelajaran/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deletePembelajaran(id) {
    return this.request(`/pembelajaran/${id}`, {
      method: "DELETE",
    });
  }

  async togglePembelajaranStatus(id) {
    return this.request(`/pembelajaran/${id}/toggle`, {
      method: "PATCH",
    });
  }

  async bulkPembelajaranOperation(data) {
    return this.request("/pembelajaran/bulk", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ============ RAN PAUD METHODS ============

  async getRanPaudDashboard(year) {
    const params = year && year !== "all" ? `?year=${year}` : '';
    return this.request(`/ran-paud/dashboard${params}`);
  }

  async getRanPaudSummary() {
    return this.request("/ran-paud/summary");
  }

  // New method for unified dashboard summary (same as dashboard RAN)
  async getRanPaudDashboardSummaryUnified(year) {
    const params = year && year !== "all" ? `?year=${year}` : '';
    return this.request(`/ran-paud/dashboard-summary-unified${params}`);
  }

  async getRanPaudData(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/ran-paud?${queryString}`);
  }

  async getRanPaudById(id) {
    return this.request(`/ran-paud/${id}`);
  }

  async getRanPaudPrograms() {
    return this.request("/ran-paud/programs");
  }

  async getRanPaudIndikators() {
    return this.request("/ran-paud/indikators");
  }

  async createRanPaud(data) {
    return this.request("/ran-paud", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateRanPaud(id, data) {
    return this.request(`/ran-paud/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteRanPaud(id) {
    return this.request(`/ran-paud/${id}`, {
      method: "DELETE",
    });
  }

  // Update RAN PAUD status (Super Admin only)
  async updateRanPaudStatus(id, status) {
    return this.request(`/ran-paud/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  // Bulk update RAN PAUD status (Super Admin only)
  async bulkUpdateRanPaudStatus(ids, status) {
    return this.request(`/ran-paud/bulk-status`, {
      method: "PATCH",
      body: JSON.stringify({ ids, status }),
    });
  }

  async bulkRanPaudOperation(data) {
    return this.request("/ran-paud/bulk", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getRanPaudKLList() {
    return this.request("/ran-paud/kl-list");
  }

  async exportRanPaudData(format = "excel", filters = {}) {
    const response = await fetch(`${this.baseURL}/ran-paud/export`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ format, filters }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Export failed");
    }

    if (format === "preview") {
      return response.json();
    } else {
      // Return binary data for file download
      return {
        data: await response.arrayBuffer(),
        filename:
          response.headers
            .get("content-disposition")
            ?.split("filename=")[1]
            ?.replace(/"/g, "") || `ran-paud-export.${format}`,
      };
    }
  }

  async importRanPaudData(data, overwrite = false) {
    return this.request("/ran-paud/import", {
      method: "POST",
      body: JSON.stringify({ data, overwrite }),
    });
  }

  async processRanPaudExcel(excelFile) {
    const formData = new FormData();
    formData.append("file", excelFile);

    return this.request("/ran-paud/process-excel", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async getRanPaudByKL(klId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/ran-paud/kl/${klId}?${queryString}`);
  }

  async updateRanPaudTahunData(id, tahun, tahunData) {
    return this.request(`/ran-paud/data/${id}/tahun/${tahun}`, {
      method: "PATCH",
      body: JSON.stringify(tahunData),
    });
  }

  async getRanPaudAchievementByYear(tahun) {
    return this.request(`/ran-paud/achievement/${tahun}`);
  }

  // ============ USER MANAGEMENT METHODS ============

  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/users?${queryString}`);
  }

  async getUserById(id) {
    return this.request(`/users/${id}`);
  }

  async createUser(data) {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateUser(id, data) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: "DELETE",
    });
  }

  async toggleUserStatus(id) {
    return this.request(`/users/${id}/toggle-status`, {
      method: "PATCH",
    });
  }

  // ============ EXPORT METHODS ============

  async exportPDF(filters, reportType, options = {}) {
    const {
      includeCharts = true,
      includeSummary = true,
      includeDetail = true,
    } = options;

    return this.request("/ran-paud/export-pdf", {
      method: "POST",
      body: JSON.stringify({
        filters,
        reportType,
        includeCharts,
        includeSummary,
        includeDetail,
      }),
    });
  }

  async exportExcel(filters, reportType, options = {}) {
    const {
      includeCharts = true,
      includeSummary = true,
      includeDetail = true,
    } = options;

    return this.request("/ran-paud/export-excel", {
      method: "POST",
      body: JSON.stringify({
        filters,
        reportType,
        includeCharts,
        includeSummary,
        includeDetail,
      }),
    });
  }

  async exportWord(filters, reportType, options = {}) {
    const {
      includeCharts = true,
      includeSummary = true,
      includeDetail = true,
    } = options;

    return this.request("/ran-paud/export-word", {
      method: "POST",
      body: JSON.stringify({
        filters,
        reportType,
        includeCharts,
        includeSummary,
        includeDetail,
      }),
    });
  }

  async exportPowerPoint(filters, reportType, options = {}) {
    const {
      includeCharts = true,
      includeSummary = true,
      includeDetail = true,
    } = options;

    return this.request("/ran-paud/export-powerpoint", {
      method: "POST",
      body: JSON.stringify({
        filters,
        reportType,
        includeCharts,
        includeSummary,
        includeDetail,
      }),
    });
  }

  // ============ DOCUMENT IMPORT METHODS ============

  async importDocument(file, metadata) {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("klId", metadata.klId);
    formData.append("tahun", metadata.tahun);
    formData.append("kategori", metadata.kategori);
    if (metadata.deskripsi) {
      formData.append("deskripsi", metadata.deskripsi);
    }

    return this.request("/ran-paud/import-document", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async importDocumentsBulk(files, metadata) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("documents", file);
    });

    formData.append("klId", metadata.klId);
    formData.append("tahun", metadata.tahun);
    formData.append("kategori", metadata.kategori);

    return this.request("/ran-paud/import-documents-bulk", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async getDocuments(klId, tahun) {
    return this.request(`/ran-paud/documents/${klId}/${tahun}`);
  }

  async downloadDocument(documentId) {
    const response = await fetch(
      `${this.baseURL}/ran-paud/documents/download/${documentId}`,
      {
        headers: this.getHeaders(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      response.headers
        .get("content-disposition")
        ?.split("filename=")[1]
        ?.replace(/"/g, "") || "document";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  async deleteDocument(documentId) {
    return this.request(`/ran-paud/documents/${documentId}`, {
      method: "DELETE",
    });
  }

  // ============ UTILITY METHODS ============

  async healthCheck() {
    return this.request("/health");
  }

  isAuthenticated() {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }

  async testConnection() {
    try {
      await this.healthCheck();
      return { success: true, message: "Connection successful" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // ============ FILE VALIDATION METHODS ============

  validateImageFile(file) {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const errors = [];

    if (!allowedTypes.includes(file.type)) {
      errors.push(
        "File type not allowed. Only JPEG, PNG, GIF, and WebP images are allowed."
      );
    }

    if (file.size > maxSize) {
      errors.push("File size too large. Maximum size is 5MB.");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  // Convert file to base64 for preview
  async convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  validateExcelFile(file) {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const errors = [];

    if (!allowedTypes.includes(file.type)) {
      errors.push(
        "File type not allowed. Only Excel (.xlsx, .xls) and CSV files are allowed."
      );
    }

    if (file.size > maxSize) {
      errors.push("File size too large. Maximum size is 10MB.");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  // ============ FORMATTING METHODS ============

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  isValidYouTubeId(id) {
    return /^[a-zA-Z0-9_-]{11}$/.test(id);
  }

  isValidDuration(duration) {
    return /^\d{1,2}:\d{2}$/.test(duration);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  formatNumber(num) {
    if (num === null || num === undefined) return "-";
    return new Intl.NumberFormat("id-ID").format(num);
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  formatPercentage(value, decimals = 1) {
    if (value === null || value === undefined) return "-";
    return value.toFixed(decimals) + "%";
  }

  formatCurrency(value) {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  parseExcelDate(value) {
    if (typeof value === "number") {
      // Excel date is number of days since 1900-01-01
      const excelEpoch = new Date(1900, 0, 1);
      const date = new Date(
        excelEpoch.getTime() + (value - 2) * 24 * 60 * 60 * 1000
      );
      return date.toISOString().split("T")[0];
    }
    return value;
  }
}

// Export singleton instance
const apiService = new ApiService();

// ============ USER MANAGEMENT METHODS ============
// These methods are now added to the already initialized apiService instance.
apiService.getUsers = () => apiService.request("/users");
apiService.createUser = (data) =>
  apiService.request("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
apiService.updateUser = (id, data) =>
  apiService.request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
apiService.deleteUser = (id) =>
  apiService.request(`/users/${id}`, {
    method: "DELETE",
  });
apiService.toggleUserStatus = (id, isActive) =>
  apiService.request(`/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });

export default apiService;

// Export class for testing
export { ApiService };
