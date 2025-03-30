// src/components/auth/LoginModal.js
import React, { useState, useEffect, memo } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useAuth } from '../hook/useAuth';

// Tách component header
const ModalHeader = memo(({ title, onClose }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9370db] via-[#8a2be2] to-[#4e44ce] bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(147,112,219,0.3)] tracking-vn-tight">
      {title}
    </h2>
    <button 
      onClick={onClose} 
      className="text-gray-400 hover:text-[#9370db] transition-colors p-1 hover:bg-white/5 rounded-full"
      aria-label="Đóng"
    >
      <X size={20} />
    </button>
  </div>
));

// Tách component divider
const Divider = memo(({ text }) => (
  <div className="relative mt-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-white/10"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-2 bg-gradient-to-b from-[#170b36] to-[#0f0a23] text-gray-400 tracking-vn-tight">{text}</span>
    </div>
  </div>
));

// Tách component social button
const SocialButton = memo(({ provider, icon }) => (
  <button className="flex justify-center items-center py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#9370db]/30 hover:shadow-lg hover:shadow-[#9370db]/5 transition-all hover:-translate-y-0.5 relative overflow-hidden group">
    <span className="absolute inset-0 bg-gradient-to-r from-[#9370db]/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
    <span className="relative z-10 flex items-center tracking-vn-tight">
      {icon}
      {provider}
    </span>
  </button>
));

// Tách component input field
const InputField = memo(({ id, label, type, value, onChange, placeholder, rightLink, delay }) => (
  <div className={`transition-all duration-500 ${delay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: delay }}>
    <div className="flex items-center justify-between mb-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 ml-1 tracking-vn-tight">
        {label}
      </label>
      {rightLink && (
        <a 
          href="#" 
          className="text-sm text-[#9370db] hover:text-[#9370db]/80 transition-colors relative group tracking-vn-tight"
        >
          {rightLink}
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#9370db]/50 group-hover:w-full transition-all duration-300"></span>
        </a>
      )}
    </div>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#9370db]/50 focus:border-[#9370db] transition-all placeholder:text-gray-500"
      placeholder={placeholder}
      required
    />
  </div>
));

// Main LoginForm component
const LoginForm = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { login, loading, error, clearAuthError } = useAuth();

  // Ngăn scroll trên body khi modal hiển thị
  useEffect(() => {
    // Lưu scroll position ban đầu
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    // Khóa scroll - sử dụng cách tiếp cận khác
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.paddingRight = '15px'; // Ngăn layout shift
    
    setIsLoaded(true);
    
    // Clean up khi component unmount
    return () => {
      // Khôi phục scroll position ban đầu
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.paddingRight = '';
      window.scrollTo(scrollX, scrollY);
      setIsLoaded(false);
      clearAuthError(); // Clear any auth errors when unmounting
    };
  }, [clearAuthError]);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const success = await login(email, password);
      if (success && onClose) {
        onClose();
      }
    }
  };

  // Icon cho social login 
  const googleIcon = (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  const facebookIcon = (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  );

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center z-[9999] overflow-y-auto"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div className="flex min-h-full items-center justify-center p-4 text-center relative z-[10000]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ 
            duration: 0.35, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="bg-gradient-to-b from-[#170b36] to-[#0f0a23] rounded-lg border border-[#9370db]/30 shadow-2xl max-w-md w-full p-6 relative overflow-hidden m-auto"
          onClick={handleModalClick}
        >
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#9370db]/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-[#8a2be2]/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10">
            <ModalHeader title="Đăng nhập" onClose={onClose} />

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-white text-sm">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="your@email.com"
                delay={isLoaded ? '100ms' : '0ms'}
              />

              <InputField
                id="password"
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                rightLink="Quên mật khẩu?"
                delay={isLoaded ? '200ms' : '0ms'}
              />

              <div className={`flex items-center transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/10 text-[#9370db] focus:ring-[#9370db] bg-white/5"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300 tracking-vn-tight">
                  Nhớ đăng nhập
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#8a2be2] to-[#9370db] text-white font-medium hover:shadow-lg hover:shadow-[#9370db]/20 transition-all hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group z-10 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                style={{ transitionDelay: '400ms' }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#9370db]/80 to-[#8a2be2]/80 blur-md transform scale-105 opacity-0 group-hover:opacity-70 transition-all duration-500"></span>
                <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                <span className="relative z-10 flex items-center justify-center tracking-vn-tight">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : 'Đăng nhập'}
                </span>
              </button>
            </form>

            <div className={`mt-6 text-center transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
              <p className="text-sm text-gray-400 tracking-vn-tight">
                Chưa có tài khoản?{" "}
                <button 
                  onClick={onSwitchToRegister} 
                  className="text-[#9370db] hover:text-[#9370db]/80 font-medium relative group tracking-vn-tight"
                >
                  Đăng ký
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#9370db]/50 group-hover:w-full transition-all duration-300"></span>
                </button>
              </p>
            </div>

            <Divider text="Hoặc đăng nhập với" />

            <div className={`mt-6 grid grid-cols-2 gap-3 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
              <SocialButton provider="Google" icon={googleIcon} />
              <SocialButton provider="Facebook" icon={facebookIcon} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Sử dụng Portal để render modal ở root level của DOM
  return createPortal(modalContent, document.body);
};

export default LoginForm;