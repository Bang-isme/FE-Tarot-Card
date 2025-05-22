// src/features/tarot/slices/tarotSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getAllCards, 
  getCardById, 
  getDailyTarot, 
  createStandardReading,
  createAIReading,
  getTwelveRandomCards,
  getUserReadings,
  saveReading,
  getSharedReading
} from '../services/tarotAPI';

import { interpretThreeCardReading } from '../services/tarotInterpretation';
import apiClient from '../../../shared/utils/api/apiClient';
import axios from 'axios';
import { API_URL } from '../../../config/constants';

// Async thunks
export const fetchAllCards = createAsyncThunk(
  'tarot/fetchAllCards',
  async (_, { rejectWithValue }) => {
    try {
      // Kiểm tra xem có sử dụng mock API không
      const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true' || 
                        process.env.REACT_APP_USE_MOCK_API === 'true';
                        
      if (useMockApi) {
        console.log('Sử dụng mock API để lấy tất cả lá bài');
        // Sử dụng getAllCards từ tarotAPI.js
        const mockCards = await getAllCards();
        return mockCards;
      }
      
      // Nếu không sử dụng mock, gọi API thực
      console.log(`Gọi API: /api/cards`);
      
      try {
        // Kiểm tra trạng thái API trước
        try {
          console.log('Kiểm tra health API trước khi fetch cards');
          await apiClient.get('/health', { timeout: 3000 });
        } catch (healthError) {
          console.error('API health check thất bại:', healthError);
          throw new Error('API server không hoạt động');
        }
        
        // Tạo request sử dụng apiClient
        console.log('Gọi API cards');
        const response = await apiClient.get('/cards', {
          timeout: 10000 // 10 giây
        });
        console.log('Raw API response for all cards:', response);
        
        // Kiểm tra cấu trúc dữ liệu
        if (response.data && response.data.data && Array.isArray(response.data.data.cards)) {
          console.log('Kết quả API (cards):', response.data.data.cards);
          return response.data.data.cards;
        } else if (response.data && Array.isArray(response.data.data)) {
          // Trường hợp API trả về data là mảng trực tiếp
          console.log('Kết quả API (data array):', response.data.data);
          return response.data.data;
        } else if (response.data && Array.isArray(response.data)) {
          // Trường hợp API trả về dữ liệu trực tiếp là mảng
          console.log('Kết quả API (direct array):', response.data);
          return response.data;
        } else {
          // Không thể tìm thấy dữ liệu cards, log và throw lỗi
          console.error('Cấu trúc dữ liệu API không khớp (all cards):', response.data);
          throw new Error('Cấu trúc dữ liệu API không khớp với mong đợi');
        }
      } catch (apiError) {
        console.error('Chi tiết lỗi API call (all cards):', apiError);
        
        // Thử chuyển sang dùng mock nếu API thất bại
        console.log('Chuyển sang dùng mock API sau khi không thể kết nối tới API');
        localStorage.setItem('USE_MOCK_API', 'true');
        
        // Gọi lại API với USE_MOCK_API = true (sử dụng dữ liệu mock)
        const mockCards = await getAllCards();
        return mockCards;
      }
    } catch (error) {
      console.error('Lỗi fetch cards:', error);
      // Nếu là lỗi CORS hoặc kết nối, hiển thị thông báo rõ ràng hơn
      if (error.message && (error.message.includes('Network Error') || error.message.includes('CORS'))) {
        return rejectWithValue({ 
          message: 'Không thể kết nối đến máy chủ API. Vui lòng kiểm tra kết nối mạng và CORS.',
          originalError: error.message
        });
      }
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch cards' });
    }
  }
);

export const fetchCardById = createAsyncThunk(
  'tarot/fetchCardById',
  async (cardId, { rejectWithValue }) => {
    try {
      return await getCardById(cardId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch card');
    }
  }
);

export const fetchDailyTarot = createAsyncThunk(
  'tarot/fetchDailyTarot',
  async (_, { rejectWithValue }) => {
    try {
      return await getDailyTarot();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch daily tarot');
    }
  }
);

export const fetchTwelveRandomCards = createAsyncThunk(
  'tarot/fetchTwelveRandomCards',
  async (_, { rejectWithValue, dispatch }) => {
    // Định nghĩa hàm retry với delay
    const fetchWithRetry = async (maxRetries = 3, delay = 1000) => {
      let lastError;
      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          console.log(`Thử kết nối API lần ${retryCount + 1}...`);
          
          // Kiểm tra xem có sử dụng mock API không
          const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true' || 
                            process.env.REACT_APP_USE_MOCK_API === 'true';
                            
          if (useMockApi) {
            console.log('Sử dụng mock API để lấy 12 lá bài ngẫu nhiên');
            // Sử dụng getTwelveRandomCards từ tarotAPI.js
            const mockCards = await getTwelveRandomCards();
            return mockCards;
          }
          
          // Nếu không sử dụng mock, gọi API thực
          console.log(`Gọi API random cards: /api/cards/random?limit=12 (lần ${retryCount + 1})`);
          
          // Gọi API với apiClient
          let response;
          console.log('Gọi API random cards');
          response = await apiClient.get('/cards/random?limit=12', {
            timeout: 5000 * (retryCount + 1) // Tăng timeout cho mỗi lần retry
          });
          
          console.log('Raw API response:', response);
          
          // Kiểm tra cấu trúc dữ liệu
          if (response.data && response.data.data && Array.isArray(response.data.data.cards)) {
            console.log('Kết quả API random cards (cards):', response.data.data.cards);
            return response.data.data.cards;
          } else if (response.data && Array.isArray(response.data.data)) {
            // Trường hợp API trả về data là mảng trực tiếp
            console.log('Kết quả API random cards (data array):', response.data.data);
            return response.data.data;
          } else if (response.data && Array.isArray(response.data)) {
            // Trường hợp API trả về dữ liệu trực tiếp là mảng
            console.log('Kết quả API random cards (direct array):', response.data);
            return response.data;
          } else {
            // Không thể tìm thấy dữ liệu cards, log và throw lỗi
            console.error('Cấu trúc dữ liệu API không khớp:', response.data);
            throw new Error('Cấu trúc dữ liệu API không khớp với mong đợi');
          }
        } catch (error) {
          console.error(`Lỗi fetch cards lần ${retryCount + 1}:`, error);
          lastError = error;
          
          // Chờ một chút trước khi thử lại
          if (retryCount < maxRetries - 1) {
            console.log(`Đợi ${delay}ms trước khi thử lại...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            // Tăng thời gian delay cho mỗi lần thử lại
            delay *= 1.5;
          }
        }
      }
      
      // Nếu tất cả các lần thử đều thất bại, throw lỗi
      throw lastError;
    };
    
    try {
      return await fetchWithRetry();
    } catch (error) {
      console.error('Tất cả các lần thử đều thất bại:', error);
      
      // Thử chuyển sang dùng mock nếu API thất bại
      console.log('Chuyển sang dùng mock API sau khi tất cả các lần thử đều thất bại');
      localStorage.setItem('USE_MOCK_API', 'true');
      
      // Gọi lại API với USE_MOCK_API = true
      try {
        const mockCards = await getTwelveRandomCards();
        return mockCards;
      } catch (mockError) {
        return rejectWithValue({ message: 'Failed to fetch random cards' });
      }
    }
  }
);

export const performStandardReading = createAsyncThunk(
  'tarot/performStandardReading',
  async (readingData, { rejectWithValue, getState }) => {
    try {
      // Kiểm tra xem có sử dụng mock API không
      const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true' || 
                        process.env.REACT_APP_USE_MOCK_API === 'true';
                        
      if (useMockApi) {
        // Sử dụng createStandardReading từ tarotAPI.js
        const mockReading = await createStandardReading(
          readingData.selectedIndices, 
          readingData.displayedCards, 
          readingData.domain, 
          readingData.question
        );
        
        console.log('Đã tạo đọc bài giả lập thành công:', mockReading);
        return mockReading;
      }

      // Logic gọi API thực tế
      const { auth } = getState();
      const config = {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      };

      // Extract selected cards from the displayed cards
      const selectedCards = readingData.selectedIndices.map(index => readingData.displayedCards[index]);
      
      // Map domain to topic_id
      const domainToTopicMap = {
        'love': 1,
        'career': 2,
        'finance': 3,
        'health': 4,
        'spiritual': 5
      };
      
      const requestData = {
        topic_id: domainToTopicMap[readingData.domain] || 1,
        spread_id: 1, // Assuming 3-card spread
        question: readingData.question || '',
        cards: selectedCards.map(card => ({
          id: card.id,
          is_reversed: Math.random() < 0.3 // 30% chance of reversed
        }))
      };

      const response = await apiClient.post('/readings', requestData, config);
      return response.data.data.reading;
    } catch (error) {
      console.error('Lỗi khi thực hiện đọc bài:', error);
      return rejectWithValue(error.response?.data || { message: 'Failed to perform reading' });
    }
  }
);

export const performAIReading = createAsyncThunk(
  'tarot/performAIReading',
  async (readingData, { rejectWithValue, getState }) => {
    try {
      // Kiểm tra xem có sử dụng mock API không
      const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true' || 
                        process.env.REACT_APP_USE_MOCK_API === 'true';
                        
      if (useMockApi) {
        // Sử dụng createAIReading từ tarotAPI.js
        const mockReading = await createAIReading(
          readingData.selectedIndices, 
          readingData.displayedCards, 
          readingData.domain, 
          readingData.question
        );
        
        console.log('Đã tạo đọc bài AI giả lập thành công:', mockReading);
        return mockReading;
      }

      // Logic gọi API thực tế
      const { auth } = getState();
      const config = {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      };

      // Extract selected cards from the displayed cards
      const selectedCards = readingData.selectedIndices.map(index => readingData.displayedCards[index]);
      
      // Map domain to topicId
      const domainToTopicMap = {
        'love': 1,
        'career': 2,
        'finance': 3,
        'health': 4,
        'spiritual': 5
      };
      
      const requestData = {
        topicId: domainToTopicMap[readingData.domain] || 1,
        spreadId: 1, // Assuming 3-card spread
        question: readingData.question || '',
        selectedCards: selectedCards.map(card => ({
          id: card.id,
          isReversed: Math.random() < 0.3 // 30% chance of reversed
        }))
      };

      const response = await apiClient.post('/readings/ai', requestData, config);
      return response.data.data.reading;
    } catch (error) {
      console.error('Lỗi khi thực hiện đọc bài AI:', error);
      return rejectWithValue(error.response?.data || { message: 'Failed to perform AI reading' });
    }
  }
);

export const fetchSharedReading = createAsyncThunk(
  'tarot/fetchSharedReading',
  async (shareToken, { rejectWithValue }) => {
    try {
      return await getSharedReading(shareToken);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch shared reading');
    }
  }
);

export const fetchUserReadings = createAsyncThunk(
  'tarot/fetchUserReadings',
  async (params, { rejectWithValue }) => {
    try {
      return await getUserReadings(params);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user readings');
    }
  }
);

export const saveReadingToHistory = createAsyncThunk(
  'tarot/saveReadingToHistory',
  async (reading, { rejectWithValue }) => {
    try {
      return await saveReading(reading);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to save reading');
    }
  }
);

const initialState = {
  cards: [],
  selectedCards: [],
  twelveCards: [], // 12 lá bài ngẫu nhiên để trải trên bàn
  selectedIndices: [], // Chỉ số của 3 lá bài được chọn (0-11)
  currentCard: null,
  dailyCard: null,
  readings: [],
  currentReading: null,
  interpretation: null,
  loading: false,
  error: null,
  userReadings: {
    readings: [],
    totalCount: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null
  }
};

const tarotSlice = createSlice({
  name: 'tarot',
  initialState,
  reducers: {
    selectCard: (state, action) => {
      // Chỉ cho phép chọn tối đa 3 lá bài
      if (state.selectedCards.length < 3) {
        state.selectedCards.push(action.payload);
      }
    },
    unselectCard: (state, action) => {
      state.selectedIndices = state.selectedIndices.filter(
        index => index !== action.payload
      );
    },
    clearSelectedCards: (state) => {
      state.selectedIndices = [];
      state.selectedCards = [];
      state.currentReading = null;
      state.interpretation = null;
    },
    setCurrentCard: (state, action) => {
      state.currentCard = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentReading: (state) => {
      state.currentReading = null;
      state.interpretation = null;
    },
    setTwelveCards: (state, action) => {
      state.twelveCards = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllCards
      .addCase(fetchAllCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchAllCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch cards';
      })
      
      // Handle fetchCardById
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCard = action.payload;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchDailyTarot
      .addCase(fetchDailyTarot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyTarot.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyCard = action.payload;
      })
      .addCase(fetchDailyTarot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchTwelveRandomCards
      .addCase(fetchTwelveRandomCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTwelveRandomCards.fulfilled, (state, action) => {
        state.loading = false;
        state.twelveCards = action.payload;
        state.selectedIndices = []; // Reset selected cards
      })
      .addCase(fetchTwelveRandomCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch random cards';
      })
      
      // Handle performStandardReading
      .addCase(performStandardReading.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performStandardReading.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReading = action.payload;
        state.interpretation = action.payload.interpretation;
        state.selectedCards = action.payload.selectedCards;
        state.readings.unshift(action.payload);
      })
      .addCase(performStandardReading.rejected, (state, action) => {
        state.loading = false;
        console.error('Reading error:', action.payload);
        // Kiểm tra nếu là lỗi xác thực và đang sử dụng USE_MOCK_API thì bỏ qua
        const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true';
        if (action.payload && action.payload.message === 'Unauthorized - Invalid token' && useMockApi) {
          // Bỏ qua lỗi xác thực nếu đang sử dụng mock API
          state.error = null;
          // Giả lập kết quả thành công
          console.log('Mock API: Bỏ qua lỗi xác thực và tiếp tục với dữ liệu giả lập');
        } else {
          state.error = action.payload?.message || 'Failed to perform reading';
        }
      })
      
      // Handle performAIReading
      .addCase(performAIReading.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performAIReading.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReading = action.payload;
        state.interpretation = action.payload.interpretation;
        state.selectedCards = action.payload.selectedCards;
        state.readings.unshift(action.payload);
      })
      .addCase(performAIReading.rejected, (state, action) => {
        state.loading = false;
        console.error('AI reading error:', action.payload);
        // Kiểm tra nếu là lỗi xác thực và đang sử dụng USE_MOCK_API thì bỏ qua
        const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true';
        if (action.payload && action.payload.message === 'Unauthorized - Invalid token' && useMockApi) {
          // Bỏ qua lỗi xác thực nếu đang sử dụng mock API
          state.error = null;
          // Giả lập kết quả thành công
          console.log('Mock API: Bỏ qua lỗi xác thực và tiếp tục với dữ liệu giả lập');
        } else {
          state.error = action.payload?.message || 'Failed to perform AI reading';
        }
      })
      
      // Handle fetchSharedReading
      .addCase(fetchSharedReading.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSharedReading.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReading = action.payload;
        state.interpretation = action.payload.interpretation;
        state.selectedCards = action.payload.selectedCards;
      })
      .addCase(fetchSharedReading.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchUserReadings
      .addCase(fetchUserReadings.pending, (state) => {
        state.userReadings.loading = true;
        state.userReadings.error = null;
      })
      .addCase(fetchUserReadings.fulfilled, (state, action) => {
        state.userReadings.loading = false;
        state.userReadings.readings = action.payload.readings;
        state.userReadings.totalCount = action.payload.totalCount;
        state.userReadings.page = action.payload.page;
        state.userReadings.limit = action.payload.limit;
      })
      .addCase(fetchUserReadings.rejected, (state, action) => {
        state.userReadings.loading = false;
        state.userReadings.error = action.payload;
      })
      
      // Handle saveReadingToHistory
      .addCase(saveReadingToHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveReadingToHistory.fulfilled, (state, action) => {
        state.loading = false;
        // Cập nhật thông tin reading hiện tại nếu đang lưu reading hiện tại
        if (state.currentReading && state.currentReading.id === action.payload.id) {
          state.currentReading = action.payload;
        }
      })
      .addCase(saveReadingToHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  selectCard, 
  unselectCard, 
  clearSelectedCards, 
  setCurrentCard,
  clearError,
  clearCurrentReading,
  setTwelveCards
} = tarotSlice.actions;

export default tarotSlice.reducer;