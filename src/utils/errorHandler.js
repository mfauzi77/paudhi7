// utils/errorHandler.js

/**
 * Utility untuk menangani error secara konsisten di seluruh aplikasi
 */

// Fungsi untuk memvalidasi email
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Fungsi untuk memvalidasi nomor telepon Indonesia
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone);
};

// Fungsi untuk membersihkan input dari whitespace
export const cleanInput = (input) => {
  return typeof input === 'string' ? input.trim() : '';
};

// Fungsi untuk memvalidasi panjang teks
export const validateLength = (text, min = 0, max = Infinity) => {
  const length = text ? text.length : 0;
  return length >= min && length <= max;
};

// Fungsi untuk menangani error API
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return '❌ Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
  }
  
  if (error.status) {
    switch (error.status) {
      case 400:
        return '❌ Data yang dikirim tidak valid.';
      case 401:
        return '❌ Sesi Anda telah berakhir. Silakan login kembali.';
      case 403:
        return '❌ Anda tidak memiliki akses untuk melakukan tindakan ini.';
      case 404:
        return '❌ Data yang diminta tidak ditemukan.';
      case 409:
        return '❌ Data sudah ada atau terjadi konflik.';
      case 422:
        return '❌ Format data tidak sesuai dengan yang diharapkan.';
      case 429:
        return '❌ Terlalu banyak permintaan. Silakan coba lagi nanti.';
      case 500:
        return '❌ Terjadi kesalahan pada server. Silakan coba lagi nanti.';
      case 503:
        return '❌ Server sedang maintenance. Silakan coba lagi nanti.';
      default:
        return `❌ Terjadi kesalahan (${error.status}). Silakan coba lagi.`;
    }
  }
  
  return error.message || '❌ Terjadi kesalahan yang tidak diketahui.';
};

// Fungsi untuk memvalidasi form
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];
    const cleanValue = cleanInput(value);
    
    // Required validation
    if (rule.required && !cleanValue) {
      errors[field] = rule.requiredMessage || `${field} wajib diisi.`;
      return;
    }
    
    // Skip other validations if field is empty and not required
    if (!cleanValue && !rule.required) {
      return;
    }
    
    // Length validation
    if (rule.minLength && cleanValue.length < rule.minLength) {
      errors[field] = rule.minLengthMessage || `${field} minimal ${rule.minLength} karakter.`;
      return;
    }
    
    if (rule.maxLength && cleanValue.length > rule.maxLength) {
      errors[field] = rule.maxLengthMessage || `${field} maksimal ${rule.maxLength} karakter.`;
      return;
    }
    
    // Email validation
    if (rule.email && !validateEmail(cleanValue)) {
      errors[field] = rule.emailMessage || 'Format email tidak valid.';
      return;
    }
    
    // Phone validation
    if (rule.phone && !validatePhoneNumber(cleanValue)) {
      errors[field] = rule.phoneMessage || 'Format nomor telepon tidak valid.';
      return;
    }
    
    // Custom validation
    if (rule.custom && !rule.custom(cleanValue)) {
      errors[field] = rule.customMessage || `${field} tidak valid.`;
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Fungsi untuk menangani form submission dengan error handling
export const handleFormSubmit = async (formData, validationRules, submitCallback) => {
  try {
    // Validasi form
    const validation = validateForm(formData, validationRules);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      throw new Error(firstError);
    }
    
    // Clean form data
    const cleanData = {};
    Object.keys(formData).forEach(key => {
      cleanData[key] = cleanInput(formData[key]);
    });
    
    // Submit form
    const result = await submitCallback(cleanData);
    return { success: true, data: result };
    
  } catch (error) {
    return { 
      success: false, 
      error: handleApiError(error)
    };
  }
};

// Fungsi untuk logging error
export const logError = (error, context = {}) => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  console.error('Application Error:', errorInfo);
  
  // Di production, kirim ke service monitoring seperti Sentry
  // if (process.env.NODE_ENV === 'production') {
  //   // Sentry.captureException(error, { extra: errorInfo });
  // }
  
  return errorInfo;
};

// Hook untuk menangani error state
export const useErrorHandler = () => {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };
  
  const showError = (errorMessage) => {
    setError(typeof errorMessage === 'string' ? errorMessage : handleApiError(errorMessage));
    setSuccess('');
  };
  
  const showSuccess = (successMessage) => {
    setSuccess(successMessage);
    setError('');
  };
  
  // Auto clear messages after 5 seconds
  React.useEffect(() => {
    if (error || success) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);
  
  return {
    error,
    success,
    showError,
    showSuccess,
    clearMessages
  };
};