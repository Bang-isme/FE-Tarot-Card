import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality } from "@cloudinary/url-gen/actions/delivery";

// Initialize Cloudinary with your Cloud Name
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dfp2ne3nn',
  },
});

/**
 * Helper function to extract public ID from Cloudinary URL or convert other URLs to usable format
 * Handles various URL formats:
 * - https://res.cloudinary.com/your-cloud-name/image/upload/v12345/folder/image.jpg -> folder/image
 * - https://asset.cloudinary.com/your-cloud-name/public_id_string -> public_id_string
 * - Raw GitHub URLs or other sources are converted to a safe public ID format
 */
export const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  
  try {
    console.log('Processing URL:', url);
    
    // Xử lý URL Cloudinary dạng asset
    if (url.includes('asset.cloudinary.com')) {
      const parts = url.split('/');
      return parts[parts.length - 1]; // Lấy phần cuối cùng của URL
    }
    
    // Xử lý URL Cloudinary dạng res.cloudinary.com
    if (url.includes('res.cloudinary.com')) {
      // Phân tích URL để trích xuất public ID
      // URL format: https://res.cloudinary.com/cloudName/image/upload/[transformations]/publicId
      const uploadIndex = url.indexOf('/image/upload/');
      if (uploadIndex !== -1) {
        let publicId = url.substring(uploadIndex + '/image/upload/'.length);
        
        // Loại bỏ các tham số biến đổi nếu có (bắt đầu từ v...)
        if (publicId.match(/^v\d+\//)) {
          publicId = publicId.substring(publicId.indexOf('/') + 1);
        }
        
        // Loại bỏ phần mở rộng file (.jpg, .png, etc)
        if (publicId.includes('.')) {
          publicId = publicId.substring(0, publicId.lastIndexOf('.'));
        }
        
        console.log('Extracted Cloudinary public ID:', publicId);
        return publicId;
      }
      
      // Fallback nếu không thể phân tích URL theo cấu trúc chuẩn
      return url.split('/').pop().split('.')[0];
    }
    
    // Xử lý GitHub raw URLs và chuyển thành định dạng có thể sử dụng
    if (url.includes('githubusercontent.com')) {
      // Tách path từ URL GitHub
      let path = '';
      if (url.includes('/main/assets/')) {
        path = url.split('/main/assets/')[1];
      } else if (url.includes('/master/assets/')) {
        path = url.split('/master/assets/')[1];
      } else {
        // Fallback: sử dụng phần cuối URL
        path = url.split('/').pop();
      }
      
      // Loại bỏ phần mở rộng file nếu có
      if (path.includes('.')) {
        path = path.substring(0, path.lastIndexOf('.'));
      }
      
      console.log('Converted GitHub URL to path:', path);
      return path || 'fallback-image';
    }
    
    // Fallback: Sử dụng phần cuối URL
    return url.split('/').pop().split('.')[0];
  } catch (error) {
    console.error('Error parsing image URL:', error, url);
    return 'error-image'; // Fallback public ID
  }
};

/**
 * Helper function to get a Cloudinary image from a URL
 * @param {string} url - URL của ảnh
 * @param {number} width - Chiều rộng của ảnh (mặc định: 500)
 * @param {number} height - Chiều cao của ảnh (mặc định: 800) 
 * @returns {object|null} Đối tượng Cloudinary Image hoặc null nếu có lỗi
 */
export const getCloudinaryImage = (url, width = 500, height = 800) => {
  try {
    const publicId = getPublicIdFromUrl(url);
    if (!publicId) return null;
    
    console.log('Using public ID:', publicId);
    
    // Trả về ảnh với kích thước và chất lượng được chỉ định
    return cld
      .image(publicId)
      .resize(fill().width(width).height(height))
      .delivery(quality(90));
  } catch (error) {
    console.error('Error creating Cloudinary image:', error);
    return null;
  }
};

export { cld }; 