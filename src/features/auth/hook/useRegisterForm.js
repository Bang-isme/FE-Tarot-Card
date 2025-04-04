import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import axios from 'axios';

// Blacklist các từ ngữ không phù hợp
const INAPPROPRIATE_WORDS = [
  // Admin related
  'admin', 'administrator', 'root', 'system', 'hack', 'crack',
  // Adult content
  'sex', 'sexy', 'fuck', 'shit', 'dick', 'porn', 'xxx',
  // Gambling
  'casino', 'bet', 'gambling', 'poker', 'slot',
  // Drugs
  'drug', 'cocaine', 'heroin', 'cannabis', 'marijuana',
  // Scam related
  'hack', 'cheat', 'spam', 'scam', 'free', 'winner',
  // Violence
  'kill', 'murder', 'death', 'blood', 'gun', 'weapon'
];

// Blacklist các domain email
const BLACKLISTED_DOMAINS = [
  // Temporary email services
  'tempmail.com', 'temp-mail.org', 'throwawaymail.com',
  'mailinator.com', 'guerrillamail.com', 'sharklasers.com',
  'yopmail.com', '10minutemail.com', 'disposablemail.com',
  'trash-mail.com', 'fakeinbox.com', 'tempinbox.com',
  'tempmail.net', 'jetable.org', 'maildrop.cc',
  'mailnesia.com', 'tempr.email', 'dispostable.com',
  
  // Free email services with weak verification
  'mail.ru', '163.com', 'yeah.net', 'foxmail.com',
  'qq.com', 'bk.ru', 'inbox.ru', 'list.ru',
  
  // Known spam domains
  'spam4.me', 'spamfree24.org', 'spamgourmet.com',
  'spam.la', 'zeroe.ml', 'zetmail.com',
  
  // Disposable domains
  'dropmail.me', 'wegwerfmail.de', 'trashmail.com',
  'anonymbox.com', 'generator.email', 'tmpmail.org'
];

// Regex cho tên tiếng Việt hợp lệ
const VIETNAMESE_NAME_REGEX = /^[A-ZĐÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ][a-zđáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]*(?:[ ][A-ZĐÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ][a-zđáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]*)+$/;

// Các từ phổ biến trong mật khẩu
const COMMON_PASSWORDS = [
  // Top 20 most common
  'password', 'password123', '123456', 'abc123', 'qwerty',
  'dragon', 'baseball', 'football', 'letmein', 'monkey',
  'liverpool', 'princess', 'rockyou', 'rosebud', 'sunshine',
  'superman', 'trustno1', 'whatever', '111111', '123123',
  
  // Keyboard patterns
  'qwerty', 'asdfgh', 'zxcvbn', '1qaz2wsx', 'qazwsx',
  
  // Simple patterns
  'abcd1234', '12341234', 'abcdefgh', '11111111',
  
  // Common words
  'welcome', 'admin', 'administrator', 'root', 'login',
  'user', 'pass', 'pwd', 'test', 'guest',
  
  // Years
  '2024', '2023', '2022', '2021', '2020',
  
  // Vietnamese words
  'matkhau', 'mk123', 'admin123', 'quantri', 'quanly'
];

// Danh sách họ phổ biến tiếng Việt
const VIETNAMESE_LAST_NAMES = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng',
  'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Đào', 'Đinh', 'Trịnh', 'Lương'
];

// Danh sách tên đệm phổ biến tiếng Việt
const VIETNAMESE_MIDDLE_NAMES = [
  'Văn', 'Thị', 'Hữu', 'Đức', 'Mạnh', 'Công', 'Quang', 'Minh', 'Hoàng', 'Thành',
  'Xuân', 'Hồng', 'Thanh', 'Ngọc', 'Đình', 'Bá', 'Thiện', 'Kim', 'Đăng', 'Thế'
];

// Danh sách tên tiếng Việt phổ biến
const VIETNAMESE_NAMES = [
  // Nam
  'An', 'Anh', 'Bảo', 'Bình', 'Cường', 'Dũng', 'Đức', 'Dương', 'Hải', 'Hiếu',
  'Hoàng', 'Hùng', 'Huy', 'Khải', 'Khoa', 'Khánh', 'Long', 'Minh', 'Nam', 'Nghĩa',
  'Phong', 'Phúc', 'Quân', 'Quang', 'Sơn', 'Thắng', 'Thiện', 'Thịnh', 'Trung', 'Tuấn',
  // Nữ
  'Anh', 'Chi', 'Diệp', 'Dung', 'Giang', 'Hà', 'Hạnh', 'Hiền', 'Hoa', 'Hoài',
  'Huệ', 'Hương', 'Lan', 'Linh', 'Mai', 'My', 'Nga', 'Ngọc', 'Nhung', 'Phương',
  'Quỳnh', 'Thảo', 'Thiên', 'Thủy', 'Trang', 'Trinh', 'Tuyết', 'Vân', 'Yến', 'Vi'
];

// Từ điển tiếng Việt phổ biến cho mật khẩu
const VIETNAMESE_DICTIONARY = [
  // Từ liên quan đến tài khoản
  'matkhau', 'taikhoan', 'dangnhap', 'dangky', 'quenmatkhau',
  'nguoidung', 'khachhang', 'thanhvien', 'quantri', 'admin',
  // Từ thông dụng
  'xinchaocacban', 'xinchao', 'tambiet', 'hengapnhe', 'hengaplai',
  'toiyeuem', 'anhyeuem', 'emyeuanh', 'iloveyou', 'yeunhau',
  // Ngày tháng
  'thang', 'ngay', 'nam', 'chunhat', 'thuhai', 'thuba', 'thutu',
  'thunam', 'thusau', 'thubay', 'sinh', 'nhat',
  // Số đếm tiếng Việt
  'khong', 'mot', 'hai', 'ba', 'bon', 'nam', 'sau', 'bay', 'tam', 'chin', 'muoi'
];

const useRegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { register, loading, error } = useAuth();

  // Clear form errors when inputs change
  useEffect(() => {
    if (name || email || password || confirmPassword || phone || gender || birthDate) {
      setFormErrors({});
    }
  }, [name, email, password, confirmPassword, phone, gender, birthDate]);

  // Kiểm tra domain email có tồn tại
  const checkEmailDomain = async (domain) => {
    try {
      const response = await axios.get(`https://dns.google/resolve?name=${domain}&type=MX`);
      return response.data.Answer && response.data.Answer.length > 0;
    } catch (error) {
      return false;
    }
  };

  // Kiểm tra mật khẩu có bị lộ
  const checkPasswordLeak = async (password) => {
    try {
      const sha1 = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(password));
      const hash = Array.from(new Uint8Array(sha1))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
      
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);
      
      const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
      const leaks = response.data.split('\n');
      
      return leaks.some(leak => {
        const [hashSuffix, count] = leak.split(':');
        return hashSuffix === suffix;
      });
    } catch (error) {
      return false;
    }
  };

  const validateName = async (name) => {
    const errors = [];
    
    if (!name.trim()) {
      errors.push('Họ tên không được để trống');
      return errors;
    }

    // Kiểm tra độ dài
    if (name.length > 50) {
      errors.push('Họ tên không được vượt quá 50 ký tự');
    }
    if (name.length < 4) {
      errors.push('Họ tên phải có ít nhất 4 ký tự');
    }

    // Kiểm tra tên tiếng Việt hợp lệ
    if (!VIETNAMESE_NAME_REGEX.test(name)) {
      errors.push('Họ tên phải viết hoa chữ cái đầu mỗi từ và chỉ chứa chữ cái tiếng Việt');
    }

    // Kiểm tra số từ trong tên
    const words = name.trim().split(/\s+/);
    if (words.length < 2) {
      errors.push('Vui lòng nhập đầy đủ họ và tên');
    }
    if (words.length > 6) {
      errors.push('Họ tên không được vượt quá 6 từ');
    }

    // Kiểm tra họ có hợp lệ
    const lastName = words[0];
    if (!VIETNAMESE_LAST_NAMES.includes(lastName)) {
      errors.push('Họ không hợp lệ hoặc không phổ biến trong tiếng Việt');
    }

    // Kiểm tra tên đệm nếu có
    if (words.length > 2) {
      const middleNames = words.slice(1, -1);
      const hasInvalidMiddleName = middleNames.some(
        name => !VIETNAMESE_MIDDLE_NAMES.includes(name)
      );
      if (hasInvalidMiddleName) {
        errors.push('Tên đệm không hợp lệ hoặc không phổ biến trong tiếng Việt');
      }
    }

    // Kiểm tra không chứa số và ký tự đặc biệt
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(name)) {
      errors.push('Họ tên không được chứa số hoặc ký tự đặc biệt');
    }

    // Kiểm tra từng từ trong tên có nằm trong blacklist không
    const lowerName = name.toLowerCase();
    const hasInappropriateWord = INAPPROPRIATE_WORDS.some(word => 
      lowerName.includes(word.toLowerCase())
    );
    if (hasInappropriateWord) {
      errors.push('Tên chứa từ ngữ không phù hợp');
    }

    // Kiểm tra độ dài của mỗi từ
    if (words.some(word => word.length < 2)) {
      errors.push('Mỗi từ trong tên phải có ít nhất 2 ký tự');
    }
    if (words.some(word => word.length > 20)) {
      errors.push('Mỗi từ trong tên không được vượt quá 20 ký tự');
    }

    // Kiểm tra khoảng trắng thừa
    if (/\s{2,}/.test(name)) {
      errors.push('Tên không được chứa nhiều khoảng trắng liên tiếp');
    }
    if (/^\s|\s$/.test(name)) {
      errors.push('Tên không được bắt đầu hoặc kết thúc bằng khoảng trắng');
    }

    // Kiểm tra tên chính có hợp lệ
    const firstName = words[words.length - 1];
    if (!VIETNAMESE_NAMES.includes(firstName)) {
      errors.push('Tên chính không hợp lệ hoặc không phổ biến trong tiếng Việt');
    }

    // Kiểm tra tính hợp lệ của các dấu trong tên
    const diacriticsPattern = /[áàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/;
    const hasInvalidDiacritics = words.some(word => {
      const diacriticCount = (word.match(diacriticsPattern) || []).length;
      return diacriticCount > 1; // Không cho phép nhiều hơn 1 dấu trong một từ
    });
    if (hasInvalidDiacritics) {
      errors.push('Tên có dấu không hợp lệ');
    }

    // Kiểm tra thứ tự của tên đệm
    if (words.length > 2) {
      const genderIndicators = ['Thị', 'Văn', 'Đức', 'Thành'];
      const middleNames = words.slice(1, -1);
      const hasInvalidOrder = middleNames.some((name, index) => {
        if (genderIndicators.includes(name)) {
          return index !== 0; // Các từ chỉ giới tính phải đứng đầu tên đệm
        }
        return false;
      });
      if (hasInvalidOrder) {
        errors.push('Thứ tự tên đệm không hợp lệ');
      }
    }

    return errors;
  };

  const validateEmail = async (email) => {
    const errors = [];
    
    if (!email.trim()) {
      errors.push('Email không được để trống');
      return errors;
    }

    // Kiểm tra độ dài
    if (email.length > 100) {
      errors.push('Email không được vượt quá 100 ký tự');
    }
    if (email.length < 6) {
      errors.push('Email quá ngắn');
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      errors.push('Email không hợp lệ');
      return errors;
    }

    // Kiểm tra domain có nằm trong blacklist không
    const domain = email.split('@')[1].toLowerCase();
    if (BLACKLISTED_DOMAINS.includes(domain)) {
      errors.push('Domain email này không được chấp nhận');
    }

    // Kiểm tra TLD hợp lệ
    const tld = domain.split('.').pop();
    const validTLDs = ['com', 'net', 'org', 'edu', 'gov', 'vn', 'com.vn', 'edu.vn'];
    if (!validTLDs.includes(tld)) {
      errors.push('Domain email không hợp lệ');
    }

    // Kiểm tra domain email có tồn tại
    const domainExists = await checkEmailDomain(domain);
    if (!domainExists) {
      errors.push('Domain email không tồn tại hoặc không hoạt động');
    }

    // Kiểm tra định dạng công ty/tổ chức
    if (domain.includes('company') || domain.includes('org')) {
      const username = email.split('@')[0].toLowerCase();
      const corporatePattern = /^[a-z]+\.[a-z]+$/; // format: firstname.lastname
      if (!corporatePattern.test(username)) {
        errors.push('Email công ty/tổ chức phải theo định dạng ten.ho@domain');
      }
    }

    // Kiểm tra email edu
    if (domain.includes('edu')) {
      const username = email.split('@')[0].toLowerCase();
      if (!/^[a-z]\d{8}$/.test(username)) { // format: x12345678
        errors.push('Email giáo dục phải theo định dạng tiêu chuẩn của trường');
      }
    }

    // Kiểm tra username của email
    const username = email.split('@')[0].toLowerCase();
    
    // Kiểm tra độ dài username
    if (username.length < 3) {
      errors.push('Tên email quá ngắn');
    }
    if (username.length > 30) {
      errors.push('Tên email không được vượt quá 30 ký tự');
    }

    // Kiểm tra username không bắt đầu hoặc kết thúc bằng ký tự đặc biệt
    if (/^[._-]|[._-]$/.test(username)) {
      errors.push('Tên email không được bắt đầu hoặc kết thúc bằng ký tự đặc biệt');
    }

    // Kiểm tra username không chứa ký tự đặc biệt liên tiếp
    if (/[._-]{2,}/.test(username)) {
      errors.push('Tên email không được chứa ký tự đặc biệt liên tiếp');
    }

    // Kiểm tra username không chứa ký tự Unicode
    if (/[^\x00-\x7F]/.test(username)) {
      errors.push('Tên email chỉ được chứa ký tự ASCII');
    }

    // Kiểm tra username có chứa từ không phù hợp
    if (INAPPROPRIATE_WORDS.some(word => username.includes(word.toLowerCase()))) {
      errors.push('Email chứa từ ngữ không phù hợp');
    }

    // Kiểm tra email có phải là email tạm thời
    const tempEmailPatterns = ['temp', 'tmp', 'disposable', 'trash', 'junk', 'spam'];
    if (tempEmailPatterns.some(pattern => username.includes(pattern))) {
      errors.push('Không được sử dụng email tạm thời');
    }

    return errors;
  };

  const validatePhone = (phone) => {
    const errors = [];

    if (!phone.trim()) {
      errors.push('Số điện thoại không được để trống');
      return errors;
    }

    // Kiểm tra định dạng số điện thoại Việt Nam
    const phoneRegex = /^(0|\+84)([35789])[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      errors.push('Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)');
    }

    // Kiểm tra đầu số nhà mạng Việt Nam
    const mobilePrefix = phone.startsWith('+84') ? phone.slice(3, 5) : phone.slice(1, 3);
    const validPrefixes = {
      '86': 'Viettel',
      '96': 'Viettel',
      '97': 'Viettel',
      '98': 'Viettel',
      '32': 'Viettel',
      '33': 'Viettel',
      '34': 'Viettel',
      '35': 'Viettel',
      '36': 'Viettel',
      '37': 'Viettel',
      '38': 'Viettel',
      '39': 'Viettel',
      '89': 'Mobifone',
      '90': 'Mobifone',
      '93': 'Mobifone',
      '70': 'Mobifone',
      '76': 'Mobifone',
      '77': 'Mobifone',
      '78': 'Mobifone',
      '79': 'Mobifone',
      '88': 'Vinaphone',
      '91': 'Vinaphone',
      '94': 'Vinaphone',
      '83': 'Vinaphone',
      '84': 'Vinaphone',
      '85': 'Vinaphone',
      '81': 'Vinaphone',
      '82': 'Vinaphone',
      '92': 'Vietnamobile',
      '56': 'Vietnamobile',
      '58': 'Vietnamobile',
      '99': 'Gmobile',
      '59': 'Gmobile'
    };

    if (!validPrefixes[mobilePrefix]) {
      errors.push('Đầu số điện thoại không hợp lệ');
    }

    // Kiểm tra số điện thoại spam
    const spamPatterns = ['1111111111', '2222222222', '3333333333', '4444444444', '5555555555'];
    const numberOnly = phone.replace(/\D/g, '').slice(-10);
    if (spamPatterns.includes(numberOnly)) {
      errors.push('Số điện thoại không hợp lệ');
    }

    return errors;
  };

  const validateGender = (gender) => {
    const errors = [];

    if (!gender) {
      errors.push('Vui lòng chọn giới tính');
      return errors;
    }

    const validGenders = ['male', 'female', 'other'];
    if (!validGenders.includes(gender)) {
      errors.push('Giới tính không hợp lệ');
    }

    return errors;
  };

  const validateBirthDate = (birthDate) => {
    const errors = [];

    if (!birthDate) {
      errors.push('Ngày sinh không được để trống');
      return errors;
    }

    const birthDateObj = new Date(birthDate);
    const today = new Date();
    
    // Kiểm tra ngày sinh hợp lệ
    if (isNaN(birthDateObj.getTime())) {
      errors.push('Ngày sinh không hợp lệ');
      return errors;
    }

    // Kiểm tra tuổi tối thiểu (13 tuổi)
    const minAge = new Date();
    minAge.setFullYear(today.getFullYear() - 13);
    if (birthDateObj > minAge) {
      errors.push('Bạn phải đủ 13 tuổi trở lên');
    }

    // Kiểm tra tuổi tối đa (100 tuổi)
    const maxAge = new Date();
    maxAge.setFullYear(today.getFullYear() - 100);
    if (birthDateObj < maxAge) {
      errors.push('Ngày sinh không hợp lệ');
    }

    // Kiểm tra ngày sinh trong tương lai
    if (birthDateObj > today) {
      errors.push('Ngày sinh không thể là ngày trong tương lai');
    }

    return errors;
  };

  const validatePassword = async (password) => {
    const errors = [];
    
    if (!password) {
      errors.push('Mật khẩu không được để trống');
      return errors;
    }

    // Kiểm tra độ dài
    if (password.length > 50) {
      errors.push('Mật khẩu không được vượt quá 50 ký tự');
    }
    if (password.length < 8) {
      errors.push('Mật khẩu phải có ít nhất 8 ký tự');
    }

    // Kiểm tra độ phức tạp cơ bản
    if (!/[A-Z]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất 1 chữ hoa');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất 1 chữ thường');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất 1 số');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');
    }

    // Kiểm tra không chứa khoảng trắng
    if (/\s/.test(password)) {
      errors.push('Mật khẩu không được chứa khoảng trắng');
    }

    // Kiểm tra không chứa ký tự đặc biệt liên tiếp
    if (/[!@#$%^&*(),.?":{}|<>]{2,}/.test(password)) {
      errors.push('Mật khẩu không được chứa ký tự đặc biệt liên tiếp');
    }

    // Kiểm tra không chứa số liên tiếp
    if (/\d{4,}/.test(password)) {
      errors.push('Mật khẩu không được chứa 4 số liên tiếp');
    }

    // Kiểm tra không chứa chuỗi ký tự liên tiếp
    const sequentialPatterns = [
      'abcd', 'qwerty', 'asdf', '1234', '2345', '3456', '4567', '5678', '6789',
      'zxcv', 'qwer', 'asdf', 'zxcv', 'wasd'
    ];
    if (sequentialPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
      errors.push('Mật khẩu không được chứa chuỗi ký tự liên tiếp');
    }

    // Kiểm tra không phải là mật khẩu phổ biến
    if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
      errors.push('Mật khẩu quá phổ biến, vui lòng chọn mật khẩu khác');
    }

    // Kiểm tra mật khẩu không được chứa thông tin cá nhân
    const lowerPassword = password.toLowerCase();
    const lowerName = name.toLowerCase();
    const lowerEmail = email.toLowerCase();

    if (lowerName) {
      const nameParts = lowerName.split(' ');
      if (nameParts.some(part => lowerPassword.includes(part))) {
        errors.push('Mật khẩu không được chứa bất kỳ phần nào của tên bạn');
      }
    }

    if (lowerEmail) {
      const emailParts = lowerEmail.split('@')[0].split(/[._-]/);
      if (emailParts.some(part => part.length > 2 && lowerPassword.includes(part))) {
        errors.push('Mật khẩu không được chứa phần nào của email');
      }
    }

    // Kiểm tra không chứa từ điển tiếng Việt phổ biến
    const commonVietnameseWords = ['matkhau', 'quanly', 'admin', 'quantri', 'nguoidung'];
    if (commonVietnameseWords.some(word => lowerPassword.includes(word))) {
      errors.push('Mật khẩu không được chứa từ điển tiếng Việt phổ biến');
    }

    // Kiểm tra độ phức tạp tổng thể
    let complexity = 0;
    complexity += /[A-Z]/.test(password) ? 1 : 0;
    complexity += /[a-z]/.test(password) ? 1 : 0;
    complexity += /[0-9]/.test(password) ? 1 : 0;
    complexity += /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 1 : 0;
    complexity += password.length >= 12 ? 1 : 0;
    
    if (complexity < 4) {
      errors.push('Mật khẩu chưa đủ phức tạp, vui lòng thêm độ dài hoặc ký tự đặc biệt');
    }

    // Kiểm tra mật khẩu có bị lộ
    const isLeaked = await checkPasswordLeak(password);
    if (isLeaked) {
      errors.push('Mật khẩu này đã bị lộ trong các vụ rò rỉ dữ liệu, vui lòng chọn mật khẩu khác');
    }

    // Kiểm tra từ điển tiếng Việt mở rộng
    if (VIETNAMESE_DICTIONARY.some(word => lowerPassword.includes(word))) {
      errors.push('Mật khẩu chứa từ tiếng Việt phổ biến, dễ đoán');
    }

    // Kiểm tra mẫu lặp lại
    const hasRepeatingPattern = /(.)\1{2,}/.test(password) || // Ký tự lặp lại
      /(..+)\1+/.test(password); // Mẫu lặp lại
    if (hasRepeatingPattern) {
      errors.push('Mật khẩu không được chứa mẫu ký tự lặp lại');
    }

    // Kiểm tra entropy (độ ngẫu nhiên) của mật khẩu
    const charTypes = {
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      numbers: /[0-9]/,
      symbols: /[^A-Za-z0-9]/
    };
    
    const uniqueChars = new Set(password).size;
    const usedTypes = Object.values(charTypes)
      .filter(regex => regex.test(password))
      .length;
    
    const entropy = Math.log2(Math.pow(uniqueChars, password.length)) * usedTypes;
    if (entropy < 50) {
      errors.push('Mật khẩu không đủ ngẫu nhiên, vui lòng sử dụng nhiều ký tự khác nhau hơn');
    }

    return errors;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    const errors = [];

    if (!confirmPassword) {
      errors.push('Vui lòng xác nhận mật khẩu');
    } else if (password !== confirmPassword) {
      errors.push('Mật khẩu xác nhận không khớp');
    }

    return errors;
  };

  const validateForm = async () => {
    const errors = {};
    let isValid = true;
    
    // Validate name
    const nameErrors = await validateName(name);
    if (nameErrors.length > 0) {
      errors.name = nameErrors;
      isValid = false;
    }
    
    // Validate email
    const emailErrors = await validateEmail(email);
    if (emailErrors.length > 0) {
      errors.email = emailErrors;
      isValid = false;
    }
    
    // Validate phone
    const phoneErrors = validatePhone(phone);
    if (phoneErrors.length > 0) {
      errors.phone = phoneErrors;
      isValid = false;
    }

    // Validate gender
    const genderErrors = validateGender(gender);
    if (genderErrors.length > 0) {
      errors.gender = genderErrors;
      isValid = false;
    }

    // Validate birthDate
    const birthDateErrors = validateBirthDate(birthDate);
    if (birthDateErrors.length > 0) {
      errors.birthDate = birthDateErrors;
      isValid = false;
    }
    
    // Validate password
    const passwordErrors = await validatePassword(password);
    if (passwordErrors.length > 0) {
      errors.password = passwordErrors;
      isValid = false;
    }
    
    // Validate confirm password
    const confirmPasswordErrors = validateConfirmPassword(password, confirmPassword);
    if (confirmPasswordErrors.length > 0) {
      errors.confirmPassword = confirmPasswordErrors;
      isValid = false;
    }
    
    // Validate terms
    if (!agreeTerms) {
      errors.agreeTerms = 'Bạn phải đồng ý với điều khoản dịch vụ';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (await validateForm()) {
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        gender,
        birthDate,
        password
      };
      
      await register(userData);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setGender('');
    setBirthDate('');
    setAgreeTerms(false);
    setFormErrors({});
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    phone,
    setPhone,
    gender,
    setGender,
    birthDate,
    setBirthDate,
    agreeTerms,
    setAgreeTerms,
    formErrors,
    loading,
    error,
    handleSubmit,
    resetForm
  };
};

export default useRegisterForm;
