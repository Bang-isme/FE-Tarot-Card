import React, { useState, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../shared/ui/NavBar';
import Footer from '../../shared/ui/Footer';

// Components
const SectionTitle = memo(({ title, subtitle, centered = false, light = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-[#9370db]' : 'text-white'} tracking-vn-tight`}>
      {title}
      <span className="block h-1 w-20 bg-gradient-to-r from-[#9370db] to-[#8a2be2] mt-2 rounded-full"></span>
    </h2>
    {subtitle && <p className={`${light ? 'text-gray-600' : 'text-gray-300'} leading-vn tracking-vn-tight text-lg`}>{subtitle}</p>}
  </div>
));

const ReadingTypeCard = memo(({ title, description, iconSrc, to, featured = false }) => (
  <div className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px] ${featured ? 'border-2 border-[#9370db]' : 'border border-purple-900/20'}`}>
    <div className="relative h-40 overflow-hidden bg-gradient-to-r from-[#2a1045] to-[#3a1c5a]">
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <img 
          src={iconSrc} 
          alt={title} 
          className="h-24 w-24 object-contain filter drop-shadow-lg"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/96?text=Tarot";
          }}
        />
      </div>
      {featured && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white text-xs font-bold px-3 py-1 rounded-full tracking-vn-tight">
          Phổ biến
        </div>
      )}
    </div>
    <div className="p-6 bg-white">
      <h3 className="text-xl font-bold mb-2 tracking-vn-tight">{title}</h3>
      <p className="text-gray-600 mb-4 tracking-vn-tight leading-vn min-h-[4rem]">{description}</p>
      <Link 
        to={to} 
        className="inline-block w-full text-center bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-5 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
      >
        Xem ngay
      </Link>
    </div>
  </div>
));

const FilterButton = memo(({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full mr-2 mb-2 text-sm font-medium transition-colors tracking-vn-tight
    ${active 
      ? 'bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white shadow-md' 
      : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'}`}
  >
    {label}
  </button>
));

const SearchBar = memo(({ value, onChange }) => (
  <div className="relative mb-6">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Tìm kiếm loại hình bói Tarot..."
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-purple-900/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#9370db] transition-colors tracking-vn-tight"
    />
  </div>
));

const TestimonialSimple = memo(({ quote, author }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-purple-900/20 p-6 rounded-lg mb-4">
    <p className="italic text-gray-300 mb-4 tracking-vn-tight leading-vn">"{quote}"</p>
    <p className="text-[#9370db] font-medium tracking-vn-tight">— {author}</p>
  </div>
));

const HowItWorksStep = memo(({ number, title, description, icon }) => (
  <div className="flex items-start">
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#9370db] to-[#8a2be2] flex-shrink-0 flex items-center justify-center text-white font-bold text-xl mr-4">
      {number}
    </div>
    <div>
      <h3 className="text-lg font-bold mb-2 tracking-vn-tight">{title}</h3>
      <p className="text-gray-400 tracking-vn-tight leading-vn">{description}</p>
    </div>
  </div>
));

// Decorative Elements
const MysticBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-20 right-[10%] w-64 h-64 bg-[#9370db]/10 rounded-full filter blur-[80px] animate-pulse-slow"></div>
    <div className="absolute bottom-40 left-[15%] w-72 h-72 bg-[#8a2be2]/10 rounded-full filter blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-[40%] left-[30%] w-2 h-2 bg-white rounded-full animate-twinkle"></div>
    <div className="absolute top-[20%] right-[25%] w-2 h-2 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-[30%] right-[40%] w-2 h-2 bg-white rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
  </div>
));

const TarotReadingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample data - would normally come from API/database
  const readingTypes = [
    {
      id: 1,
      title: "Bói tình yêu",
      description: "Khám phá đường tình duyên, tương lai của mối quan hệ hiện tại hoặc người ấy nghĩ gì về bạn.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg",
      to: "/love",
      featured: true,
      categories: ["tình yêu", "phổ biến"]
    },
    {
      id: 2,
      title: "Bói sự nghiệp",
      description: "Tìm hiểu về con đường sự nghiệp, cơ hội mới và hướng đi đúng đắn cho công việc của bạn.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg",
      to: "/career",
      featured: false,
      categories: ["sự nghiệp", "công việc"]
    },
    {
      id: 3,
      title: "Bói sức khỏe",
      description: "Nhận lời khuyên về sức khỏe thể chất và tinh thần, cảnh báo và cách cải thiện sức khỏe.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg",
      to: "/health",
      featured: false,
      categories: ["sức khỏe"]
    },
    {
      id: 4,
      title: "Bói hàng ngày",
      description: "Lá bài Tarot hàng ngày giúp bạn có cái nhìn tổng quan và lời khuyên cho một ngày trọn vẹn.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg",
      to: "/daily",
      featured: true,
      categories: ["hàng ngày", "phổ biến"]
    },
    {
      id: 5,
      title: "Bói năm mới",
      description: "Dự đoán và lên kế hoạch cho năm mới của bạn với những lời khuyên từ bài Tarot.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_12.jpg", 
      to: "/yearly",
      featured: false,
      categories: ["năm mới", "tương lai"]
    },
    {
      id: 6,
      title: "Phân tích tính cách",
      description: "Khám phá điểm mạnh, điểm yếu và tiềm năng ẩn sâu trong tính cách của bạn.",
      iconSrc: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_13.jpg",
      to: "/personality",
      featured: false,
      categories: ["tính cách", "phát triển bản thân"]
    }
  ];

  const filters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'phổ biến', label: 'Phổ biến' },
    { id: 'tình yêu', label: 'Tình yêu' },
    { id: 'sự nghiệp', label: 'Sự nghiệp' },
    { id: 'sức khỏe', label: 'Sức khỏe' },
    { id: 'tương lai', label: 'Tương lai' }
  ];

  const testimonials = [
    {
      quote: "Bói Tarot đã giúp tôi tìm ra hướng đi mới trong sự nghiệp, thật không ngờ lại chính xác đến vậy.",
      author: "Minh Anh, 28 tuổi"
    },
    {
      quote: "Tôi đã hiểu rõ hơn về mối quan hệ của mình nhờ vào phần bói tình yêu. Cảm ơn Bói Tarot!",
      author: "Thu Hà, 32 tuổi"
    }
  ];

  const filteredReadingTypes = readingTypes.filter(reading => {
    const matchesSearch = reading.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        reading.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || reading.categories.includes(activeFilter);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0933] to-[#0f051d] text-white relative overflow-hidden">
      <Helmet>
        <title>Bói Tarot Online | Bói Tarot</title>
        <meta name="description" content="Khám phá các loại hình bói Tarot online chính xác của Bói Tarot - từ tình yêu, sự nghiệp đến sức khỏe và phát triển bản thân." />
      </Helmet>
      
      <MysticBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-vn-tight">
              Khám Phá <span className="text-[#9370db]">Bói Tarot</span> Online
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto tracking-vn-tight leading-vn">
              Những lá bài Tarot sẽ mang đến cho bạn cái nhìn sâu sắc về cuộc sống, từ tình yêu, sự nghiệp 
              đến sức khỏe, tương lai và phát triển bản thân.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-12">
            <SearchBar 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="flex flex-wrap mb-8">
              {filters.map(filter => (
                <FilterButton
                  key={filter.id}
                  label={filter.label}
                  active={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Reading Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReadingTypes.length > 0 ? (
              filteredReadingTypes.map(reading => (
                <ReadingTypeCard
                  key={reading.id}
                  title={reading.title}
                  description={reading.description}
                  iconSrc={reading.iconSrc}
                  to={reading.to}
                  featured={reading.featured}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-gray-400 tracking-vn-tight">Không tìm thấy loại bói phù hợp. Vui lòng thử lại với từ khóa khác.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8 relative bg-[#1a0933]/80">
        <div className="container mx-auto max-w-5xl relative z-10">
          <SectionTitle 
            title="Cách Bói Tarot Hoạt Động" 
            subtitle="Quy trình đơn giản để nhận được lời giải đọc Tarot chính xác"
            centered
            light={false}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <HowItWorksStep
              number="1"
              title="Chọn loại bói"
              description="Lựa chọn loại hình bói Tarot phù hợp với câu hỏi và mối quan tâm của bạn."
            />
            <HowItWorksStep
              number="2"
              title="Tập trung và chọn bài"
              description="Tập trung vào câu hỏi của bạn và chọn các lá bài Tarot theo hướng dẫn."
            />
            <HowItWorksStep
              number="3"
              title="Nhận kết quả chi tiết"
              description="Nhận phân tích sâu sắc từ AI về ý nghĩa các lá bài và lời khuyên cho bạn."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials and FAQs Section */}
      <section className="py-16 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Testimonials */}
            <div>
              <SectionTitle 
                title="Trải nghiệm của người dùng" 
                subtitle="Những gì người dùng nói về dịch vụ bói Tarot của chúng tôi"
              />
              
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <TestimonialSimple
                    key={index}
                    quote={testimonial.quote}
                    author={testimonial.author}
                  />
                ))}
              </div>
            </div>
            
            {/* Why Choose Us */}
            <div>
              <SectionTitle 
                title="Tại sao chọn Bói Tarot?" 
                subtitle="Những ưu điểm nổi bật của dịch vụ bói Tarot online của chúng tôi"
              />
              
              <ul className="space-y-4">
                {[
                  "Kết hợp tri thức cổ xưa với công nghệ AI tiên tiến",
                  "Độ chính xác cao với phương pháp giải đọc chuyên sâu",
                  "Giao diện thân thiện, dễ sử dụng trên mọi thiết bị",
                  "Bảo mật thông tin và không gian riêng tư tuyệt đối",
                  "Cộng đồng người dùng và chuyên gia Tarot hỗ trợ"
                ].map((point, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#9370db] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300 tracking-vn-tight leading-vn">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="bg-gradient-to-r from-[#2a1045] to-[#3a1c5a] rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#9370db]/20 rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8a2be2]/20 rounded-full filter blur-[80px]"></div>
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 tracking-vn-tight">Sẵn sàng để khám phá?</h2>
              <p className="text-lg text-gray-300 mb-8 tracking-vn-tight leading-vn">
                Bắt đầu hành trình khám phá bản thân với các lá bài Tarot ngay hôm nay.
              </p>
              <Link 
                to="/daily-tarot" 
                className="inline-block bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight"
              >
                Xem bói Tarot hàng ngày
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default memo(TarotReadingsPage); 