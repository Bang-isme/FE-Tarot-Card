import axios from 'axios';
import { enhanceNetworkError } from './errorUtils';

// Import API_URL
import { API_URL } from '../../../config/constants';

// Base config for axios
const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  timeout: 30000, // Tăng timeout lên 30 giây để tránh lỗi timeout
});

// Log config để debug
console.log('apiClient.js - Sử dụng baseURL:', `${API_URL}`);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // Add check for USE_MOCK_API before requiring token
    const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true' || 
                       process.env.REACT_APP_USE_MOCK_API === 'true';
    
    // Skip token check when using mock API
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Đã thêm token xác thực vào request');
    } else if (!useMockApi) {
      // Prepare for fallback authentication only when not using mock API
      console.log('Không tìm thấy token xác thực. Sử dụng chế độ khách.');
    }
    
    return config;
  },
  (error) => Promise.reject(enhanceNetworkError(error))
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log(`API Response [${response.config.method.toUpperCase()}] ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    // Enhance error with more details
    const enhancedError = enhanceNetworkError(error);
    
    // Check if we are using mock API
    const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true' ||
                       process.env.REACT_APP_USE_MOCK_API === 'true';
    
    // Handle 401 (Unauthorized) errors, but only if not using mock API
    if (error.response && error.response.status === 401 && !useMockApi) {
      console.log('Lỗi xác thực 401 - Token không hợp lệ hoặc hết hạn');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Thông báo cho người dùng trước khi chuyển hướng
      alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', enhancedError.enhancedData);
      return Promise.reject({ 
        message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.',
        originalError: enhancedError.enhancedData 
      });
    }
    
    // Handle 500 errors
    if (error.response.status >= 500) {
      console.error('Server Error:', enhancedError.enhancedData);
      return Promise.reject({ 
        message: 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.',
        originalError: enhancedError.enhancedData
      });
    }
    
    // Return the error response data for handling by the components
    return Promise.reject(enhancedError);
  }
);

// Debug helper for fetch errors
apiClient.debugFetchError = (error) => {
  console.group('Facebook Login Debug Info');
  
  if (error.name === 'TypeError' && error.message === 'Network request failed') {
    console.log('This is a common "Network request failed" error which can have many causes:');
    console.log('1. CORS issues - server not allowing cross-origin requests');
    console.log('2. Network connectivity issues');
    console.log('3. Server unreachable or timeout');
    console.log('4. Invalid SSL certificate');
    
    // Check for more specific details
    if (error.enhancedData) {
      console.log('Enhanced error details:', error.enhancedData);
    }
    
    console.log('\nTroubleshooting steps:');
    console.log('- Check network connection');
    console.log('- Verify the server is running and accessible');
    console.log('- Verify that you have the correct URL');
    console.log('- Check for CORS headers on server');
    console.log('- Check if you need a valid SSL certificate');
  } else {
    console.log('Error details:', error);
  }
  
  console.groupEnd();
  
  return error; // Return the error to allow chaining
};

export default apiClient; 