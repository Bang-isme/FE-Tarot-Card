import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TarotCardDisplay from './TarotCardDisplay';
// Import ảnh mặt sau
import cardBackImage from '../../../assets/images/ui/card-back.png';

/**
 * Component hiển thị kết quả đọc bài Tarot
 * @param {Object} props - Component props
 * @param {Object} props.reading - Kết quả đọc bài
 * @param {string} props.interpretation - Phần giải thích
 * @param {boolean} props.loading - Trạng thái loading
 * @param {Function} props.onSave - Callback khi lưu kết quả
 * @param {Function} props.onShare - Callback khi share kết quả
 * @param {Function} props.onRestart - Callback khi muốn bói lại
 * @param {boolean} props.isAI - Xác định phải kết quả bói AI hay không
 */
const ReadingResult = memo(({ 
  reading = {}, 
  interpretation = '', 
  loading = false,
  onSave,
  onShare,
  onRestart,
  isAI = false
}) => {
  const [allCardsRevealed, setAllCardsRevealed] = useState(false);
  const [revealsCount, setRevealsCount] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Auto reveal cards với delay
  useEffect(() => {
    if (reading && reading.selectedCards && Array.isArray(reading.selectedCards) && reading.selectedCards.length > 0) {
      const revealInterval = setInterval(() => {
        setRevealsCount(prev => {
          const next = prev + 1;
          if (next >= reading.selectedCards.length) {
            clearInterval(revealInterval);
            setAllCardsRevealed(true);
            return reading.selectedCards.length;
          }
          return next;
        });
      }, 1000);
      
      return () => clearInterval(revealInterval);
    } else {
      // Nếu không có cards, đặt allCardsRevealed = true để hiển thị phần giải thích
      setAllCardsRevealed(true);
    }
  }, [reading]);
  
  // Nếu không có kết quả, hiển thị trạng thái không có dữ liệu
  if (!reading || (reading.selectedCards && Array.isArray(reading.selectedCards) && reading.selectedCards.length === 0)) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 md:p-8 text-center">
        <p className="text-gray-300 tracking-vn-tight">Không có kết quả để hiển thị.</p>
        <button
          onClick={onRestart}
          className="mt-6 inline-block bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
        >
          Xem bói mới
        </button>
      </div>
    );
  }
  
  // Xác định loại trải bài và vị trí của từng lá
  const getCardPositions = () => {
    const readingType = reading.readingType || 'general';
    const cardsCount = reading.selectedCards && Array.isArray(reading.selectedCards) ? reading.selectedCards.length : 0;
    
    // Vị trí mặc định cho trải 3 lá (bản thân, hoàn cảnh, thử thách)
    if (cardsCount === 3) {
      return [
        'left-[20%] top-1/2 -translate-y-1/2',
        'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        'left-[80%] top-1/2 -translate-y-1/2'
      ];
    }
    
    // Trường hợp nhiều lá, xếp theo hình tròn
    const positions = [];
    const centralAngle = 2 * Math.PI / cardsCount;
    
    for (let i = 0; i < cardsCount; i++) {
      const angle = i * centralAngle;
      const radius = 40; // % từ trung tâm
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      positions.push(`left-[${x}%] top-[${y}%] -translate-x-1/2 -translate-y-1/2`);
    }
    
    return positions;
  };
  
  const cardPositions = getCardPositions();
  const readingDate = new Date(reading.createdAt || Date.now()).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Sections của lời giải
  let sections = [];
  
  if (interpretation) {
    // Nếu có interpretation, tách nó thành các sections
    try {
      if (typeof interpretation === 'string' && interpretation.trim() !== '') {
        // Try to parse from JSON string
        try {
          const parsedInterpretation = JSON.parse(interpretation);
          sections = parsedInterpretation.sections || [];
        } catch (e) {
          // Nếu parse fail, tạo một section duy nhất
          sections = [{
            title: 'Giải thích tổng quan',
            content: interpretation
          }];
        }
      } else if (interpretation.sections) {
        sections = interpretation.sections;
      } else if (interpretation.interpretation && interpretation.interpretation.sections) {
        sections = interpretation.interpretation.sections;
      }
    } catch (e) {
      // Nếu parse fail, tạo một section duy nhất
      sections = [{
        title: 'Giải thích tổng quan',
        content: 'Không thể hiển thị nội dung giải thích.'
      }];
    }
  } else if (reading.selectedCards && Array.isArray(reading.selectedCards)) {
    // Nếu không có interpretation, tạo sections từ cards
    sections = reading.selectedCards.map((card, index) => {
      // Xác định vị trí của lá bài
      const positions = ['Bản thân', 'Hoàn cảnh', 'Thử thách'];
      const position = positions[index] || `Vị trí ${index + 1}`;
      
      return {
        title: `${position}: ${card.name || 'Không tên'}`,
        content: card.meaning || 'Không có thông tin chi tiết.'
      };
    });
  }
  
  // Nếu vẫn không có sections, tạo một section mặc định
  if (sections.length === 0) {
    sections = [{
      title: 'Giải thích tổng quan',
      content: 'Hãy suy ngẫm về lá bài này và tìm ra ý nghĩa phù hợp với tình huống của bạn.'
    }];
  }
  
  // Tạo section tổng hợp
  const combinedSectionIndex = sections.length;
  const hasCombinedReading = reading.selectedCards && reading.selectedCards.length > 1;
  
  // Toggle section
  const toggleSection = (index) => {
    if (expandedSection === index) {
      setExpandedSection(null);
    } else {
      setExpandedSection(index);
    }
  };
  
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-vn-tight flex items-center">
          {reading.readingType === 'daily' ? 'Tarot Hàng Ngày' : `Trải bài ${reading.readingType || 'Tarot'}`}
          {isAI && <span className="ml-2 bg-[#9370db]/30 text-white text-xs px-2 py-1 rounded-full">AI</span>}
        </h2>
        <div className="flex flex-wrap items-center text-gray-300 text-xs sm:text-sm tracking-vn-tight">
          <div className="mr-4 mb-2">{readingDate}</div>
          {reading.question && (
            <div className="mr-4 mb-2 px-2 py-1 bg-[#9370db]/20 rounded-full max-w-full truncate">
              {reading.question.length > 25 ? `${reading.question.substring(0, 25)}...` : reading.question}
            </div>
          )}
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span>Hoàn thành</span>
          </div>
        </div>
      </div>
      
      {/* Cards Display Section */}
      {reading.selectedCards && Array.isArray(reading.selectedCards) && reading.selectedCards.length > 0 && (
        <div className="relative h-[320px] sm:h-[400px] md:h-[500px] mb-6 sm:mb-10 bg-gradient-to-br from-[#2a1045]/50 to-[#3a1c5a]/50 rounded-xl overflow-hidden p-4 border border-[#9370db]/20">
          {/* Debug information */}
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute top-2 left-2 text-xs text-white/50 bg-black/30 px-2 py-1 rounded z-50">
              Type: {reading.readingType}, Cards: {reading.selectedCards.length}
            </div>
          )}
          
          {/* Hiển thị vị trí lá bài (Bản thân, Hoàn cảnh, Thử thách) */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-8 sm:space-x-16 md:space-x-24 z-10 text-xs sm:text-sm text-white/80">
            {reading.selectedCards.map((_, index) => {
              const positions = ['Bản thân', 'Hoàn cảnh', 'Thử thách'];
              if (index < positions.length) {
                return (
                  <div key={`position-${index}`} className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full">
                    {positions[index]}
                  </div>
                );
              }
              return null;
            }).slice(0, 3)}
          </div>
          
          {reading.selectedCards.map((card, index) => {
            if (!card || index >= cardPositions.length) return null;
            
            // Đảm bảo isReversed là boolean rõ ràng
            const isReversed = card.isReversed === true;
            
            // Tạo bản sao của card với isReversed là boolean rõ ràng
            const processedCard = {
              ...card,
              isReversed: isReversed
            };
            
            return (
              <TarotCardDisplay
                key={`card-${index}-${card.id || index}`}
                card={processedCard}
                isRevealed={revealsCount > index}
                position={cardPositions[index]}
                size={window.innerWidth < 768 ? "small" : window.innerWidth < 1024 ? "medium" : "large"}
                cardBackImage={cardBackImage}
              />
            );
          })}
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0f051d]/70 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-[#9370db] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-white text-sm sm:text-base tracking-vn-tight">
                  {isAI ? "AI đang phân tích và diễn giải lá bài..." : "Đang giải mã năng lượng từ các lá bài..."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Interpretation Section */}
      {(allCardsRevealed || !reading.selectedCards || reading.selectedCards.length === 0) && !loading && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 tracking-vn-tight flex items-center">
            Giải Thích
            {isAI && (
              <span className="ml-2 bg-[#9370db]/30 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <span className="mr-1">🤖</span>AI
              </span>
            )}
          </h3>
          
          {/* Hiển thị câu hỏi người dùng nếu có */}
          {reading.question && (
            <div className="mb-4 sm:mb-6 bg-[#2a1045]/40 rounded-lg p-3 sm:p-4">
              <h4 className="text-white text-sm sm:text-base font-medium mb-1 tracking-vn-tight flex items-center">
                <span className="mr-2">❓</span> Câu hỏi của bạn:
              </h4>
              <p className="text-gray-300 text-sm sm:text-base tracking-vn-tight italic">
                "{reading.question}"
              </p>
            </div>
          )}
          
          {/* Phần kết quả tổng hợp hiển thị đầu tiên */}
          {hasCombinedReading && (
            <div className="mb-4 sm:mb-6 bg-gradient-to-r from-[#3a1c5a]/30 to-[#2a1045]/30 backdrop-blur-sm border border-[#9370db]/30 rounded-lg p-3 sm:p-5">
              <h4 className="text-[#9370db] text-base sm:text-lg font-medium mb-2 sm:mb-3 tracking-vn-tight">
                {isAI ? "Diễn Giải AI của 3 Lá Bài" : "Tổng Hợp 3 Lá Bài"}
              </h4>
              <div className="text-gray-200 text-sm sm:text-base tracking-vn-tight leading-vn whitespace-pre-line">
                {interpretation?.combinedReading || interpretation?.combined || 
                 (isAI 
                  ? "AI đã phân tích ba lá bài này cùng với vị trí Bản thân, Hoàn cảnh và Thử thách để tạo ra diễn giải độc đáo dựa trên năng lượng của các lá bài và mối quan hệ giữa chúng."
                  : "Ba lá bài này kết hợp với nhau cho thấy một hành trình chuyển đổi, từ quá khứ đến tương lai. Hãy xem xét mối quan hệ giữa các lá bài và tìm hiểu thông điệp tổng thể chúng mang lại cho tình huống của bạn.")}
              </div>
            </div>
          )}
          
          <div className="space-y-3 sm:space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-lg overflow-hidden">
                <button 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center text-left text-white font-medium tracking-vn-tight"
                  onClick={() => toggleSection(index)}
                >
                  <span className="text-sm sm:text-base">{section.title || `Phần ${index + 1}`}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 sm:h-5 sm:w-5 transform transition-transform ${expandedSection === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === index && (
                  <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-purple-900/20 text-gray-300 text-sm sm:text-base tracking-vn-tight leading-vn">
                    <p>{section.content || 'Không có nội dung'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {interpretation && interpretation.interpretation && interpretation.interpretation.conclusion && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#9370db]/10 rounded-lg">
              <p className="text-gray-300 text-sm sm:text-base tracking-vn-tight italic">
                "{interpretation.interpretation.conclusion}"
              </p>
            </div>
          )}
          
          {/* Hiển thị thông tin AI nếu là bói AI */}
          {isAI && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#9370db]/5 rounded-lg border border-[#9370db]/10">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#9370db]/20 flex items-center justify-center mr-3">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h4 className="text-white text-sm sm:text-base font-medium mb-1">Diễn giải bằng AI</h4>
                  <p className="text-gray-300 text-xs sm:text-sm tracking-vn-tight">
                    Diễn giải này được tạo bởi AI dựa trên các lá bài Tarot được chọn, vị trí và mối quan hệ giữa chúng. Kết quả được cá nhân hóa và độc đáo cho mỗi lần bói.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Actions Section */}
      {allCardsRevealed && !loading && (
        <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:gap-4 space-y-2 sm:space-y-0">
          {onSave && (
            <button
              onClick={onSave}
              className="w-full sm:w-auto bg-[#9370db]/20 hover:bg-[#9370db]/30 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium tracking-vn-tight inline-flex items-center justify-center transition-colors text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Lưu Kết Quả
            </button>
          )}
          
          {onShare && (
            <button
              onClick={onShare}
              className="w-full sm:w-auto bg-[#9370db]/20 hover:bg-[#9370db]/30 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium tracking-vn-tight inline-flex items-center justify-center transition-colors text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Chia Sẻ
            </button>
          )}
          
          {onRestart && (
            <button
              onClick={onRestart}
              className="w-full sm:w-auto bg-[#9370db]/20 hover:bg-[#9370db]/30 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium tracking-vn-tight inline-flex items-center justify-center transition-colors text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Bói Lại
            </button>
          )}
        </div>
      )}
    </div>
  );
});

ReadingResult.propTypes = {
  reading: PropTypes.object,
  interpretation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  loading: PropTypes.bool,
  onSave: PropTypes.func,
  onShare: PropTypes.func,
  onRestart: PropTypes.func,
  isAI: PropTypes.bool
};

export default ReadingResult; 