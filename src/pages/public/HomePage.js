import React, { useEffect, useState, useCallback, memo, useLayoutEffect, useRef } from 'react';
import Navbar from '../../shared/ui/NavBar';
import Footer from '../../shared/ui/Footer';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animated Tarot Deck Component
const TarotDeck = () => {
  const [shuffling, setShuffling] = useState(false);

  const handleShuffle = () => {
    setShuffling(true);
    setTimeout(() => setShuffling(false), 1200);
    };

    return (
    <div className="relative bg-gradient-to-br from-[#1a0933] to-[#2a1045] rounded-xl p-6 h-full min-h-[420px] flex flex-col items-center justify-center overflow-hidden border border-[#9370db]/30">
      {/* Decorative stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
                            </div>
      
      {/* Moon decoration in background */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 opacity-70 shadow-lg shadow-yellow-300/30"></div>
      
      {/* Tarot deck */}
      <div className="relative w-48 h-80 mx-auto mb-4">
        {/* Card stack effect (3 cards behind the main card) */}
        <div 
          className={`absolute -bottom-1 left-1 w-full h-full bg-gradient-to-br from-[#FFD700]/90 to-[#FFA500]/90 rounded-lg border-2 border-[#FFD700] transform ${shuffling ? 'rotate-[-8deg] translate-x-6' : 'rotate-[-4deg]'} transition-all duration-500 shadow-lg`} 
        />
        <div 
          className={`absolute -bottom-0.5 left-0.5 w-full h-full bg-gradient-to-br from-[#FFD700]/90 to-[#FFA500]/90 rounded-lg border-2 border-[#FFD700] transform ${shuffling ? 'rotate-[-4deg] translate-x-3' : 'rotate-[-2deg]'} transition-all duration-500 shadow-lg`} 
        />
        <div 
          className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-br from-[#FFD700]/90 to-[#FFA500]/90 rounded-lg border-2 border-[#FFD700] transform ${shuffling ? 'rotate-[2deg] translate-x-1' : 'rotate-[0deg]'} transition-all duration-500 shadow-lg`} 
        />
        
        {/* Main card with hover effects */}
        <div 
          className={`relative w-full h-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg border-2 border-[#FFD700] shadow-xl transform ${
            shuffling ? 'rotate-[8deg] translate-y-[-5px]' : 'rotate-0 hover:rotate-[2deg] hover:translate-y-[-10px]'
          } transition-all duration-500 cursor-pointer group`} 
        >
          {/* Card content */}
          <div className="absolute inset-0 m-1 bg-gradient-to-br from-[#0d0221] to-[#190934] rounded-md flex flex-col items-center justify-center p-4">
            {/* Moon icon in top left */}
            <div className="absolute top-2 left-2 text-yellow-300 text-lg">☽</div>
            
            {/* Moon icon in bottom right */}
            <div className="absolute bottom-2 right-2 text-yellow-300 text-lg transform rotate-180">☽</div>
            
            {/* Tarot symbol */}
            <div className="text-6xl mb-4 text-yellow-300 animate-pulse-slow">🌙</div>
            
            {/* Decorative stars */}
            <div className="absolute top-1/4 left-1/4 text-yellow-300 text-xs animate-float-y">✧</div>
            <div className="absolute bottom-1/3 right-1/4 text-yellow-300 text-xs animate-float-x">✦</div>
            
            {/* Decorative border */}
            <div className="absolute inset-3 border border-yellow-500/30 rounded-md pointer-events-none"></div>
                                                </div>
                                            </div>
                                        </div>
      
      {/* Shuffle button */}
      <button 
        onClick={handleShuffle}
        disabled={shuffling}
        className="bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white py-2 px-4 rounded-full shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0 mb-4"
      >
        Trộn bài
        <span className="ml-2">🔀</span>
      </button>
      
      {/* Quote */}
      <p className="text-center text-gray-300 italic text-sm mt-2 max-w-xs">
        "Mỗi lá bài là một cánh cửa mở ra thế giới nội tâm của bạn"
      </p>
    </div>
  );
};

// Mystic Background Component
const MysticBackground = memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Dynamic gradients instead of images */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9370db]/5 rounded-full filter blur-[100px] animate-pulse-slow"></div>
    <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#8a2be2]/5 rounded-full filter blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#f0c05a]/5 rounded-full filter blur-[70px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    
    {/* Gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0f0522] via-transparent to-[#0f0522]/30 opacity-40"></div>
    
    {/* Animated stars */}
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white opacity-70"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
    
    {/* Additional decorative patterns - SVG patterns are more reliable than images */}
    <div className="absolute inset-0 opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
                                    </div>
    
    {/* Vertical light beams */}
    <div className="absolute top-0 left-1/4 w-1 h-screen bg-gradient-to-b from-[#9370db]/0 via-[#9370db]/5 to-[#9370db]/0 opacity-70"></div>
    <div className="absolute top-0 right-1/3 w-2 h-screen bg-gradient-to-b from-[#8a2be2]/0 via-[#8a2be2]/3 to-[#8a2be2]/0 opacity-50"></div>
                                    </div>
));

// Section Title Component
const SectionTitle = memo(({ before, highlight, after }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 relative tracking-vn-tight">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">{before} </span>
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9370db] to-[#8a2be2]">{highlight}</span>
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white/80 via-white to-white"> {after}</span>
    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#9370db] to-transparent rounded-full"></div>
  </h2>
));

// Feature Card Component
const FeatureCard = memo(({ icon, title, desc, color, delay }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-[#9370db]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#9370db]/10 hover:-translate-y-2 cursor-pointer relative overflow-hidden group"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-gradient-to-tl from-[#9370db]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mx-auto mb-4 text-2xl shadow-xl transform group-hover:scale-110 transition-transform duration-300 border border-[#9370db]/20`}>
      {icon}
                                    </div>
    <h3 className="text-xl font-bold mb-3 text-center group-hover:text-[#9370db] transition-colors tracking-vn-tight">{title}</h3>
    <p className="text-gray-300 text-center leading-vn">{desc}</p>
                                    </div>
));

// Reading Type Card Component
const ReadingTypeCard = memo(({ icon, title, desc, cards, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay: delay * 0.1 }}
    className="bg-gradient-to-br from-[#1a0933]/90 to-[#2a1045]/90 backdrop-blur-sm rounded-lg border border-[#3a1c5a] hover:border-[#9370db]/30 transition-all duration-500 hover:shadow-xl group overflow-hidden"
  >
    <div className="relative p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#9370db]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-[#2a1045] border border-[#9370db]/20 flex items-center justify-center text-3xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
                                    </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-[#9370db] transition-colors tracking-vn-tight">{title}</h3>
        <p className="text-gray-300 mb-4 leading-vn">{desc}</p>
        <div className="flex space-x-1 mb-3">
          {cards.map((_, i) => (
            <div key={i} className="w-6 h-8 bg-[#1a0933] border border-[#9370db]/20 rounded-sm flex items-center justify-center text-xs">
              {i + 1}
                                </div>
          ))}
                            </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-[#2a1045] border border-[#9370db]/30 rounded-md text-[#9370db] text-sm font-medium hover:bg-[#3a1c5a] transition-colors tracking-vn-tight"
        >
          Khám phá
        </motion.button>
                        </div>
                    </div>
  </motion.div>
));

// AI Reading Demo Component
const AiReadingDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Auto cycle through steps for demo purposes
    const interval = setInterval(() => {
      setCurrentStep(prev => prev < 3 ? prev + 1 : 1);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Render the result reading
  const renderReading = () => (
    <div className="bg-gradient-to-br from-[#19082f] to-[#2a1045] p-4 rounded-lg border border-purple-600/30 shadow-lg shadow-purple-600/10 h-full">
      <div className="flex items-center mb-3">
        <span className="text-xl mr-2">✨</span>
        <h4 className="text-[#9370db] font-medium tracking-vn-tight">Kết quả đọc bài</h4>
                            </div>
      <p className="text-sm text-gray-300 mb-2 leading-vn">
        Lá <span className="text-[#9370db] font-medium">The Star</span> xuất hiện ở vị trí hiện tại cho thấy bạn đang trên đúng hướng.
      </p>
      <p className="text-sm text-gray-300 leading-vn">
        Thời gian tới bạn sẽ gặp nhiều cơ hội tích cực, hãy giữ vững niềm tin và tiếp tục con đường đã chọn.
      </p>
                        </div>
  );
  
  // Render fallback content if API fails to load
  const renderFallbackContent = () => (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-2xl text-[#9370db] mb-2 animate-pulse">⚙️</div>
      <p className="text-center text-sm text-gray-400 leading-vn">
        Đang kết nối với hệ thống AI...
      </p>
                            </div>
  );
  
  return (
    <div className="bg-gradient-to-br from-[#1a0933]/70 to-[#2a1045]/70 backdrop-blur-sm rounded-lg p-6 h-full border border-[#9370db]/20 shadow-lg shadow-[#9370db]/5 flex flex-col">
      <h3 className="text-xl font-medium text-center text-[#9370db] mb-6 tracking-vn-tight">Trải nghiệm đọc bài với AI</h3>
      
      {/* Step indicators */}
      <div className="flex justify-between items-center mb-8 px-2">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex flex-col items-center relative z-10">
            {/* Step connector line */}
            {step < 3 && (
              <div className="absolute top-4 left-[50%] w-full h-[2px] bg-gray-700" style={{ transform: 'translateX(50%)' }}>
                <div 
                  className="h-full bg-[#9370db] transition-all duration-500"
                  style={{ width: currentStep > step ? '100%' : '0%' }}
                ></div>
                        </div>
            )}
            
            {/* Step circle */}
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep === step 
                  ? 'border-[#9370db] bg-[#9370db]/20' 
                  : currentStep > step 
                    ? 'border-[#9370db] bg-[#9370db]' 
                    : 'border-gray-700 bg-gray-800'
              }`}
            >
              {currentStep > step ? (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <span className={`text-sm ${currentStep === step ? 'text-[#9370db]' : 'text-gray-400'}`}>
                  {step}
                </span>
              )}
                            </div>
            
            {/* Step label */}
            <span className={`text-xs mt-2 tracking-vn-tight ${
              currentStep === step 
                ? 'text-[#9370db]' 
                : currentStep > step 
                  ? 'text-gray-300' 
                  : 'text-gray-500'
            }`}>
              {step === 1 ? 'Chọn bài' : step === 2 ? 'Phân tích' : 'Kết quả'}
            </span>
                        </div>
        ))}
                    </div>

      {/* Step content */}
      <div className="flex-1 min-h-[180px] relative">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: currentStep === 1 ? 1 : 0,
            y: currentStep === 1 ? 0 : 20
          }}
          transition={{ duration: 0.5 }}
        >
          {currentStep === 1 && (
            <div className="flex items-center justify-center h-full">
              <div className="relative">
                <div className="w-32 h-48 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg border-2 border-[#FFD700] shadow-lg flex items-center justify-center mb-6">
                  <div className="absolute inset-1 bg-gradient-to-br from-[#0d0221] to-[#190934] rounded-md flex items-center justify-center">
                    <span className="text-4xl">🌙</span>
                            </div>
                        </div>
                <div className="text-center text-sm text-gray-300 leading-vn">
                  Chọn một lá bài để bắt đầu
                            </div>
                        </div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: currentStep === 2 ? 1 : 0,
            y: currentStep === 2 ? 0 : 20
          }}
          transition={{ duration: 0.5 }}
        >
          {currentStep === 2 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-[#9370db]/20 border border-[#9370db]/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#9370db]/30 flex items-center justify-center animate-pulse">
                    <svg className="w-6 h-6 text-[#9370db]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
                    </svg>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#9370db] border-2 border-[#190934] animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-300 max-w-xs leading-vn">
                AI đang phân tích lá bài và kết nối với các yếu tố liên quan đến tình huống của bạn
              </p>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: currentStep === 3 ? 1 : 0,
            y: currentStep === 3 ? 0 : 20
          }}
          transition={{ duration: 0.5 }}
        >
          {currentStep === 3 && (
            <div className="h-full">
              {isLoaded ? renderReading() : renderFallbackContent()}
            </div>
          )}
        </motion.div>
            </div>
        </div>
    );
};

// Primary Button Component
const PrimaryButton = memo(({ onClick, children }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-r from-[#9370db] via-[#9370db] to-[#8a2be2] text-white font-bold py-3 px-8 rounded-md hover:shadow-lg hover:shadow-[#9370db]/20 transition-all duration-300 relative overflow-hidden group"
  >
    <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
    <span className="relative z-10 flex items-center">
      {children}
    </span>
  </motion.button>
));

// Secondary Button Component
const SecondaryButton = memo(({ onClick, children }) => (
  <motion.button 
    onClick={onClick}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.95 }}
    className="border border-[#9370db] text-[#9370db] font-bold py-3 px-8 rounded-md hover:bg-[#9370db]/10 transition-all duration-300 relative overflow-hidden group"
  >
    <span className="absolute inset-0 bg-[#9370db]/5 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></span>
    <span className="relative z-10 flex items-center">
      {children}
    </span>
  </motion.button>
));

// Thêm component FontLoader để đảm bảo tải font tốt cho tiếng Việt
const FontLoader = () => {
  useEffect(() => {
    // Thêm Google Font hỗ trợ tiếng Việt tốt hơn
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap';
    document.head.appendChild(linkEl);
    
    // Cleanup khi component unmount
    return () => {
      document.head.removeChild(linkEl);
    };
  }, []);
  
  return null;
};

// Thay thế GlobalStyles với GlobalAnimationStyles
const GlobalAnimationStyles = () => {
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      /* Font settings cho tiếng Việt */
      html, body {
        font-family: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif;
        letter-spacing: -0.01em;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif;
        letter-spacing: -0.02em;
      }
      
      /* Điều chỉnh khoảng cách chữ cho tiếng Việt */
      .tracking-vn-tight {
        letter-spacing: -0.03em;
      }
      
      .leading-vn {
        line-height: 1.7;
      }
      
      /* Animation keyframes */
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      
      @keyframes pulse-slow {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
      }
      
      @keyframes float-y {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes float-x {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(5px); }
      }
      
      @keyframes rotate-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .animate-twinkle {
        animation: twinkle 3s ease-in-out infinite;
      }
      
      .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
      }
      
      .animate-float-y {
        animation: float-y 3s ease-in-out infinite;
      }
      
      .animate-float-x {
        animation: float-x 4s ease-in-out infinite;
      }
      
      .animate-rotate-slow {
        animation: rotate-slow 12s linear infinite;
      }
      
      .animate-gradient-shift {
        animation: gradient-shift 8s ease infinite;
        background-size: 200% 200%;
      }

      /* Fallback styles for broken images */
      img.error {
        position: relative;
        display: inline-block;
      }
      
      img.error::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #1a0933, #2a1045);
        border-radius: 4px;
      }
      
      img.error::after {
        content: '🔮';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  return null;
};

// Main HomePage Component
const HomePage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const mainContentRef = useRef(null);
  
  // Khôi phục vị trí cuộn khi reset trang
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    // Khôi phục scroll position hợp lý khi có hash URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // History scrollRestoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    return () => {
      clearTimeout(timer);
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const handleStartReading = useCallback(() => {
    navigate('/tarot-readings');
  }, [navigate]);

  const handleViewLibrary = useCallback(() => {
    navigate('/tarot-library');
  }, [navigate]);

  // Data for feature cards
  const features = [
    {
      icon: '🤖',
      title: 'Giải đọc AI chính xác',
      desc: 'Thuật toán AI hiểu ngữ cảnh cá nhân, mang lại giải đọc chi tiết và chính xác',
      color: 'from-[#9370db] to-[#8a2be2]',
      delay: 0
    },
    {
      icon: '📊',
      title: 'Phân tích dữ liệu',
      desc: 'Phân tích và theo dõi xu hướng từ các lần đọc bài trước đây của bạn',
      color: 'from-[#8a2be2] to-[#4e44ce]',
      delay: 100
    },
    {
      icon: '🌟',
      title: 'Hướng dẫn cá nhân',
      desc: 'Nhận lời khuyên thực tế và hướng dẫn riêng cho từng tình huống cụ thể',
      color: 'from-[#9370db] to-[#4e44ce]',
      delay: 200
    }
  ];

  // Data for reading types
  const readingTypes = [
    {
      icon: '❤️',
      title: 'Tình yêu & Mối quan hệ',
      desc: 'Tìm hiểu sâu hơn về các mối quan hệ và hành trình tình cảm của bạn',
      cards: Array(3),
      delay: 0
    },
    {
      icon: '💼',
      title: 'Sự nghiệp & Tài chính',
      desc: 'Khám phá cơ hội mới và giải quyết các thách thức về nghề nghiệp',
      cards: Array(5),
      delay: 1
    },
    {
      icon: '🧘',
      title: 'Phát triển bản thân',
      desc: 'Hiểu rõ hơn về bản thân và định hướng phát triển cá nhân của bạn',
      cards: Array(7),
      delay: 2
    }
  ];

    return (
    <div className="min-h-screen bg-[#0f0522] text-white relative overflow-hidden">
      <MysticBackground />
      <Navbar />
      <FontLoader />
      
      <main ref={mainContentRef} className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 pt-20 md:pt-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="px-4 py-2 bg-[#2a1045]/60 backdrop-blur-sm inline-block rounded-lg border border-[#9370db]/20 shadow-lg shadow-[#9370db]/5 mb-6">
                  <span className="text-[#9370db] uppercase tracking-wider text-sm font-medium">
                    GIẢI MÃ BÍ ẨN CUỘC SỐNG VỚI AI
                  </span>
                </div>
                
                {/* Sửa font cho tiêu đề */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9370db] via-[#8a2be2] to-[#4e44ce] drop-shadow-[0_2px_2px_rgba(147,112,219,0.3)] tracking-vn-tight leading-tight">
                  Tarot Thông Minh - Kết Nối Tâm Linh & Công Nghệ
                </h1>
                
                {/* Sửa line-height cho paragraph */}
                <p className="text-gray-300 mb-8 text-lg leading-vn">
                  Hệ thống Tarot AI đầu tiên tại Việt Nam kết hợp trí tuệ nhân tạo tiên tiến 
                  và tri thức huyền bí để mang lại trải nghiệm cá nhân hóa sâu sắc.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <PrimaryButton onClick={handleStartReading}>
                    <span className="tracking-vn-tight">Bắt đầu trải nghiệm ngay</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </PrimaryButton>
                  
                  <SecondaryButton onClick={handleViewLibrary}>
                    <span className="tracking-vn-tight">Xem thư viện bài</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:rotate-45 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </SecondaryButton>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <TarotDeck />
              </motion.div>
            </div>
            
            {/* Tính năng nổi bật */}
            <div className="mb-20">
              <SectionTitle 
                before="Tính năng"
                highlight="nổi bật"
                after="của chúng tôi"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <FeatureCard 
                      icon={feature.icon}
                      title={feature.title}
                      desc={feature.desc}
                      color={feature.color}
                      delay={feature.delay}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* AI Reading Demo Section */}
            <div className="mb-20">
              <SectionTitle 
                before="Trải nghiệm"
                highlight="đọc bài"
                after="với AI"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <AiReadingDemo />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-col justify-center"
                >
                  <h3 className="text-3xl font-bold mb-4 text-[#9370db] tracking-vn-tight">Công nghệ AI tiên tiến</h3>
                  <p className="text-gray-300 mb-6 leading-vn">
                    Hệ thống của chúng tôi kết hợp mạng neural tiên tiến với cơ sở dữ liệu hơn 10,000 phiên giải bài Tarot để mang lại phân tích chính xác và cá nhân hóa.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start group">
                      <span className="text-[#9370db] mr-2 transform group-hover:scale-125 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors leading-vn">Phân tích ngữ nghĩa sâu từ câu hỏi của bạn</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="text-[#9370db] mr-2 transform group-hover:scale-125 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors leading-vn">Kết hợp tri thức Tarot cổ xưa với AI hiện đại</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="text-[#9370db] mr-2 transform group-hover:scale-125 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors leading-vn">Bài đọc mang tính thực tiễn và hành động cụ thể</span>
                    </li>
                    <li className="flex items-start group">
                      <span className="text-[#9370db] mr-2 transform group-hover:scale-125 transition-transform">✓</span>
                      <span className="group-hover:text-white transition-colors leading-vn">Liên tục cải thiện từ phản hồi người dùng</span>
                    </li>
                  </ul>
                  <PrimaryButton onClick={handleStartReading}>
                    <span className="tracking-vn-tight">Thử ngay</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
                  </PrimaryButton>
                </motion.div>
              </div>
            </div>
            
            {/* Reading Types Section */}
            <div className="mb-20">
              <SectionTitle 
                before="Các kiểu"
                highlight="đọc bài"
                after="phổ biến"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {readingTypes.map((type, index) => (
                  <ReadingTypeCard 
                    key={index}
                    icon={type.icon}
                    title={type.title}
                    desc={type.desc}
                    cards={type.cards}
                    delay={type.delay}
                  />
                ))}
              </div>
            </div>
            
            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#1a0933]/90 to-[#2a1045]/90 backdrop-blur-md rounded-lg p-8 md:p-12 mb-10 text-center border border-[#9370db]/30 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#9370db]/5 to-[#4e44ce]/5 transform -skew-y-6 opacity-30"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#9370db]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
              <h2 className="text-3xl font-bold mb-4 relative z-10 text-[#9370db] tracking-vn-tight">Sẵn sàng khám phá bản thân?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto relative z-10 leading-vn">
                Hãy bắt đầu hành trình Tarot của bạn ngay hôm nay và khám phá những thông điệp 
                ý nghĩa từ vũ trụ dành riêng cho bạn.
              </p>
              <PrimaryButton onClick={handleStartReading}>
                <span className="tracking-vn-tight">Bắt đầu ngay</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
              </PrimaryButton>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <GlobalAnimationStyles />
    </div>
  );
};

export default HomePage;