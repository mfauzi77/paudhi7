// frontend/src/utils/apiService.js
import { API_BASE_URL } from './api';

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL || API_BASE_URL;
    this.baseURL = this.baseURL.endsWith("/api") ? this.baseURL : `${this.baseURL}/api`;
    this.token = localStorage.getItem("authToken");
  }

  // ================= AUTH =================
  setToken(token) {
    this.token = token;
    if (token) localStorage.setItem("authToken", token);
    else localStorage.removeItem("authToken");
  }

  getHeaders(contentType = "application/json") {
    const headers = {};
    if (contentType) headers["Content-Type"] = contentType;
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = { headers: this.getHeaders(), ...options };

    if (options.body instanceof FormData) delete config.headers["Content-Type"];

    try {
      if (import.meta.env.DEV) {
        console.log(`API Request: ${config.method || "GET"} ${url}`);
      }
      const response = await fetch(url, config);
      const contentType = response.headers.get("content-type");
      const data = contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const error = new Error(data.message || data.error || data || "Request failed");
        error.status = response.status;
        error.response = { data };
        throw error;
      }
      return data;
    } catch (error) {
      if (error.name === "TypeError" && error.message?.toLowerCase().includes("fetch")) {
        const networkError = new Error("Tidak dapat terhubung ke API. Periksa URL API (VITE_API_URL) dan status backend.");
        networkError.status = 0;
        throw networkError;
      }
      throw error;
    }
  }

  async login(email, password) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (data.token) this.setToken(data.token);
    return data;
  }

  async logout() { this.setToken(null); }

  isAuthenticated() { return !!this.token; }
  getToken() { return this.token; }

  // ================= FILE UPLOAD =================
  async uploadImage(file, options = {}) {
    if (!file) throw new Error("File gambar tidak valid");
    const allowedTypes = ["image/jpeg","image/jpg","image/png","image/gif","image/webp"];
    const maxSize = 5 * 1024 * 1024;
    if (!allowedTypes.includes(file.type)) throw new Error("Format file tidak didukung");
    if (file.size > maxSize) throw new Error("Ukuran file terlalu besar. Maksimal 5MB.");

    const formData = new FormData();
    formData.append("image", file);
    Object.keys(options).forEach(k => options[k] && formData.append(k, options[k]));

    return this.request("/upload/image", { method: "POST", body: formData });
  }

  async deleteImage(imageUrl) {
    if (!imageUrl) throw new Error("URL gambar tidak valid");
    return this.request("/upload/image", { method: "DELETE", body: JSON.stringify({ imageUrl }) });
  }

  // ================= NEWS =================
  async getNews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/news${queryString ? `?${queryString}` : ''}`);
  }

  async getNewsById(id) { return this.request(`/news/${id}`); }

  async createNews(newsData) {
    const formData = new FormData();
    if (newsData.image instanceof File) formData.append("image", newsData.image);
    Object.keys(newsData).forEach(k => k !== "image" && formData.append(k, typeof newsData[k]==='object'?JSON.stringify(newsData[k]):newsData[k]));
    return this.request("/news", { method: "POST", body: formData });
  }

  async updateNews(id, newsData) {
    const formData = new FormData();
    if (newsData.image instanceof File) formData.append("image", newsData.image);
    Object.keys(newsData).forEach(k => k !== "image" && formData.append(k, typeof newsData[k]==='object'?JSON.stringify(newsData[k]):newsData[k]));
    return this.request(`/news/${id}`, { method: "PUT", body: formData });
  }

  async deleteNews(id) { return this.request(`/news/${id}`, { method: "DELETE" }); }

  async searchNews(query) { return this.request(`/news?search=${encodeURIComponent(query)}`); }

  // ================= PEMBELAJARAN =================
  // List (admin/internal)
  async getPembelajaran(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/pembelajaran${queryString ? `?${queryString}` : ''}`);
  }

  // List publik (untuk halaman beranda/education section)
  async getPembelajaranPublic(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    // fallback ke endpoint utama bila endpoint /public tidak tersedia di backend
    try {
      return await this.request(`/pembelajaran/public${queryString ? `?${queryString}` : ''}`);
    } catch (err) {
      if (err.status === 404) {
        return this.getPembelajaran(params);
      }
      throw err;
    }
  }

  // Detail item pembelajaran
  async getPembelajaranDetail(id) {
    return this.request(`/pembelajaran/${id}`);
  }

  // CRUD pembelajaran (admin)
  async createPembelajaran(data) {
    const formData = new FormData();
    Object.entries(data || {}).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
      }
    });
    return this.request('/pembelajaran', { method: 'POST', body: formData });
  }

  async updatePembelajaran(id, data) {
    const formData = new FormData();
    Object.entries(data || {}).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
      }
    });
    return this.request(`/pembelajaran/${id}`, { method: 'PUT', body: formData });
  }

  async deletePembelajaran(id) {
    return this.request(`/pembelajaran/${id}`, { method: 'DELETE' });
  }

  // ================= RAN PAUD =================
  async getRanPaudData(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/ran-paud?${queryString}`);
  }

  async createRanPaud(data) { return this.request("/ran-paud", { method: "POST", body: JSON.stringify(data) }); }
  async updateRanPaud(id, data) { return this.request(`/ran-paud/${id}`, { method: "PUT", body: JSON.stringify(data) }); }
  async deleteRanPaud(id) { return this.request(`/ran-paud/${id}`, { method: "DELETE" }); }

  // RAN PAUD Dashboard functions
  async getRanPaudDashboard(year = "all") {
    const yearParam = year === "all" ? "all" : year;
    return this.request(`/ran-paud/dashboard-summary-unified?year=${yearParam}`);
  }

  async getRanPaudSummary() {
    return this.request("/ran-paud/summary");
  }

  async getRanPaudKLList() {
    return this.request("/ran-paud/kl-list");
  }

  // RAN PAUD Public functions
  async getRanPaudPublic(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/ran-paud/public?${queryString}`);
  }

  async getRanPaudPublicDashboard(year = "all") {
    const yearParam = year === "all" ? "all" : year;
    return this.request(`/ran-paud/dashboard-summary-unified/public?year=${yearParam}`);
  }

  // RAN PAUD Statistics
  async getRanPaudKLStatistics(year) {
    return this.request(`/ran-paud/kl-statistics?year=${year}`);
  }

  async getRanPaudAvailableYears() {
    return this.request("/ran-paud/available-years");
  }

  // RAN PAUD Export/Import
  async exportRanPaud(format = "excel", filters = {}) {
    return this.request("/ran-paud/export", { 
      method: "POST", 
      body: JSON.stringify({ format, filters }) 
    });
  }

  async importRanPaud(data, overwrite = false) {
    return this.request("/ran-paud/import", { 
      method: "POST", 
      body: JSON.stringify({ data, overwrite }) 
    });
  }

  // RAN PAUD Bulk operations
  async bulkRanPaudOperation(operation, items, updateData = null) {
    const body = { operation, items };
    if (updateData) body.updateData = updateData;
    return this.request("/ran-paud/bulk", { 
      method: "POST", 
      body: JSON.stringify(body) 
    });
  }

  // ================= USERS =================
  async getUsers() { return this.request("/users"); }
  async createUser(data) { return this.request("/users", { method: "POST", body: JSON.stringify(data) }); }
  async updateUser(id, data) { return this.request(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }); }
  async deleteUser(id) { return this.request(`/users/${id}`, { method: "DELETE" }); }
  async toggleUserStatus(id, isActive) { return this.request(`/users/${id}/status`, { method: "PATCH", body: JSON.stringify({ isActive }) }); }

  // ================= UTILITY =================
  async healthCheck() { return this.request("/health"); }
  async testConnection() { try { await this.healthCheck(); return { success: true }; } catch(e){ return { success:false, message:e.message }; } }

  validateImageFile(file) {
    const allowedTypes = ["image/jpeg","image/jpg","image/png","image/gif","image/webp"];
    const maxSize = 5*1024*1024;
    const errors = [];
    if(!allowedTypes.includes(file.type)) errors.push("File type not allowed");
    if(file.size>maxSize) errors.push("File too big, max 5MB");
    return { isValid: errors.length===0, errors };
  }

  async convertToBase64(file){
    return new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.onload = ()=>resolve(reader.result);
      reader.onerror = ()=>reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }
}

// Singleton instance
const apiService = new ApiService();
export default apiService;
export { ApiService };
