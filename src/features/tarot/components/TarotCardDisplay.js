import React, { useState, useEffect, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { AdvancedImage } from '@cloudinary/react';

// Import Cloudinary helpers
import { getCloudinaryImage } from '../utils/cloudinaryHelper';

// Import ảnh mặt sau dự phòng
import fallbackCardBack from '../../../assets/images/ui/card-back.png';

/**
 * Component hiển thị lá bài Tarot với animation
 * @param {Object} props - Component props
 * @param {Object} props.card - Thông tin lá bài
 * @param {boolean} props.isRevealed - Trạng thái lá bài (đã lật hay chưa)
 * @param {Function} props.onCardClick - Callback khi click vào lá bài
 * @param {boolean} props.isSelectable - Có thể select lá bài hay không
 * @param {boolean} props.isSelected - Lá bài đã được chọn hay chưa
 * @param {string} props.size - Kích thước lá bài ("small", "medium", "large")
 * @param {string} props.position - Vị trí lá bài trong trải bài
 * @param {string} props.cardBackImage - Ảnh mặt sau của lá bài
 */
const TarotCardDisplay = memo(({ 
  card = {}, 
  isRevealed = false, 
  onCardClick, 
  isSelectable = false,
  isSelected = false,
  size = 'medium',
  position = '',
  cardBackImage = fallbackCardBack,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReversal, setIsReversal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [cloudinaryImage, setCloudinaryImage] = useState(null);
  const cldImage = useRef(null);

  // Log the incoming card prop, especially imageUrl
  useEffect(() => {
    if (card) {
      console.log('[TarotCardDisplay] Received card prop:', { 
        id: card.id, 
        name: card.name, 
        imageUrl: card.imageUrl,
        isReversedProp: card.isReversed 
      });
    } else {
      console.log('[TarotCardDisplay] Received card prop: null or undefined');
    }
  }, [card]);

  // Xác định lá bài ngược dựa vào dữ liệu card hoặc random
  useEffect(() => {
    if (card && card.isReversed !== undefined) {
      // Đảm bảo isReversed là boolean rõ ràng
      const isReversedBoolean = card.isReversed === true;
      setIsReversal(isReversedBoolean);
      console.log(`TarotCardDisplay - Card ${card.name}: received isReversed=${card.isReversed} (${typeof card.isReversed}), set to ${isReversedBoolean}`);
    } else {
      // 20% cơ hội lá bài sẽ ngược
      const randomReversed = Math.random() < 0.2;
      setIsReversal(randomReversed);
      console.log(`TarotCardDisplay - Card ${card?.name}: No isReversed prop, randomly set to ${randomReversed}`);
    }
  }, [card]);

  // Tạo Cloudinary image khi card thay đổi
  useEffect(() => {
    if (card && card.imageUrl) {
      try {
        console.log('Creating Cloudinary image for:', card.name, card.imageUrl);
        // Sử dụng kích thước dựa vào cấu hình size của card
        const currentWidth = currentSize.width * 2; // Nhân để có độ phân giải tốt hơn
        const currentHeight = currentSize.height * 2;
        const cldImg = getCloudinaryImage(card.imageUrl, currentWidth, currentHeight);
        setCloudinaryImage(cldImg);
        setImageError(false);
      } catch (error) {
        console.error('Failed to create Cloudinary image:', error);
        setImageError(true);
      }
    } else {
      setCloudinaryImage(null);
    }
  }, [card]);

  // Flip animation khi isRevealed thay đổi
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsFlipped(false);
    }
  }, [isRevealed]);

  // Xác định kích thước của lá bài
  const sizeMap = {
    small: { width: 96, height: 144 }, // w-24 h-36
    medium: { width: 128, height: 192 }, // w-32 h-48
    large: { width: 160, height: 240 }, // w-40 h-60
  };
  const currentSize = sizeMap[size] || sizeMap.medium;
  const sizeClasses = `w-${currentSize.width / 4} h-${currentSize.height / 4}`;

  // Handler khi hover vào lá bài
  const handleMouseEnter = () => {
    if (isSelectable) {
      setIsHovering(true);
    }
  };

  // Handler khi rời chuột khỏi lá bài
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Handler khi click vào lá bài
  const handleCardClick = () => {
    if (onCardClick && (isSelectable || isRevealed)) {
      onCardClick(card);
    }
  };

  const handleImageError = () => {
    console.error("Cloudinary image failed to load for card:", card?.name, card?.imageUrl);
    setImageError(true);
  };

  // Hiệu ứng cho lá bài
  const cardVariants = {
    hidden: { 
      scale: 0.9,
      opacity: 0,
      rotateY: 180
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotateY: isFlipped ? 0 : 180,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    selected: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Hiệu ứng cho mặt sau lá bài
  const cardBackVariants = {
    hidden: { opacity: 1, rotateY: 0 },
    visible: { 
      opacity: 1, 
      rotateY: isFlipped ? 180 : 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Hiệu ứng cho mặt trước lá bài
  const cardFrontVariants = {
    hidden: { opacity: 0, rotateY: 180 },
    visible: { 
      opacity: 1, 
      rotateY: isFlipped ? 0 : 180,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Hiệu ứng glow khi hover
  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: isHovering ? 0.7 : 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <div 
      className={`absolute ${position} transition-transform duration-300`}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        className={`relative ${sizeClasses} cursor-pointer perspective-500`}
        initial="hidden"
        animate={isRevealed ? "visible" : "hidden"}
        variants={cardVariants}
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-lg shadow-lg overflow-hidden"
          variants={cardBackVariants}
        >
          <img 
            src={cardBackImage} 
            alt="Card Back" 
            className="w-full h-full object-cover object-center"
            onError={e => {
              console.error("Error loading card back image:", e);
              e.target.src = fallbackCardBack;
            }}
          />
        </motion.div>
        
        {/* Card Front */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-lg shadow-lg overflow-hidden rotateY-180"
          variants={cardFrontVariants}
        >
          <div className={`w-full h-full relative ${isReversal ? 'rotate-180' : ''}`}>
            {cloudinaryImage && !imageError ? (
              <AdvancedImage 
                cldImg={cloudinaryImage} 
                alt={card.name || 'Tarot Card'} 
                className="w-full h-full object-cover object-center"
                onError={handleImageError}
                plugins={[] /* Add plugins if needed */}
              />
            ) : card.imageUrl && !imageError ? (
              // Fallback to direct URL if Cloudinary fails to generate
              <img
                src={card.imageUrl}
                alt={card.name || 'Tarot Card'}
                className="w-full h-full object-cover object-center"
                onError={handleImageError}
              />
            ) : (
              // Fallback display if all image attempts fail
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white text-center p-2">
                <p className="text-xs">Image unavailable<br/>{card.name}</p>
              </div>
            )}
            
            {/* Card Name */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-2">
              <p className="text-white text-center text-xs md:text-sm font-medium truncate">
                {card.name || 'Tarot Card'}
                {isReversal && ' (Reversed)'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

TarotCardDisplay.propTypes = {
  card: PropTypes.object,
  isRevealed: PropTypes.bool,
  onCardClick: PropTypes.func,
  isSelectable: PropTypes.bool,
  isSelected: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  position: PropTypes.string,
  cardBackImage: PropTypes.string,
};

export default TarotCardDisplay; 