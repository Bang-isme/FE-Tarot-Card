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
        // Sử dụng getAllCards từ tarotAPI.js
        const mockCards = await getAllCards();
        return mockCards;
      }
      
      // Nếu không sử dụng mock, gọi API thực
      const response = await apiClient.get('/cards');
      
      // Check if the response has the expected structure and extract cards array
      if (response.data && response.data.data && Array.isArray(response.data.data.cards)) {
        console.log('Đã nhận được lá bài từ API:', response.data.data.cards.length);
        return response.data.data.cards;
      } else if (response.data && Array.isArray(response.data)) {
        // Some APIs might return the array directly
        console.log('Đã nhận được lá bài từ API (mảng trực tiếp):', response.data.length);
        return response.data;
      } else {
        console.error('Không tìm thấy mảng cards trong phản hồi API:', response.data);
        return rejectWithValue({ message: 'Cấu trúc phản hồi API không đúng format' });
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu bài Tarot:', error.message || 'Unknown error');
      return rejectWithValue(error.response?.data || { message: 'Không thể tải dữ liệu bài Tarot' });
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
  async (_, { rejectWithValue }) => {
    try {
      // Kiểm tra xem có sử dụng mock API không
      const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true' || 
                        process.env.REACT_APP_USE_MOCK_API === 'true';
                        
      if (useMockApi) {
        // Sử dụng getTwelveRandomCards từ tarotAPI.js
        const mockCards = await getTwelveRandomCards();
        return mockCards;
      }
      
      // Nếu không sử dụng mock, gọi API thực
      const response = await apiClient.get('/cards/random', {
        params: { limit: 12 }
      });
      
      // Check if the response has the expected structure and extract cards array
      if (response.data && response.data.data && Array.isArray(response.data.data.cards)) {
        console.log('Đã nhận được lá bài từ API:', response.data.data.cards.length);
        return response.data.data.cards;
      } else if (response.data && Array.isArray(response.data)) {
        // Some APIs might return the array directly
        console.log('Đã nhận được lá bài từ API (mảng trực tiếp):', response.data.length);
        return response.data;
      } else {
        console.error('Không tìm thấy mảng cards trong phản hồi API:', response.data);
        return rejectWithValue({ message: 'Cấu trúc phản hồi API không đúng format' });
      }
    } catch (error) {
      console.error('Lỗi khi tải lá bài ngẫu nhiên:', error.message || 'Unknown error');
      return rejectWithValue(error.response?.data || { message: 'Không thể tải lá bài ngẫu nhiên' });
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
        
        return mockReading;
      }

      // Logic gọi API thực tế
      const { auth } = getState();
      
      // Check if token exists to determine if we need to attach auth headers
      const headers = {};
      if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`;
      }
      
      const response = await apiClient.post('/tarot/readings', {
        type: 'standard',
        cards: readingData.selectedIndices.map(index => readingData.displayedCards[index]),
        domain: readingData.domain,
        question: readingData.question
      }, { headers });
      
      return response.data;
    } catch (error) {
      console.error('Error in performStandardReading:', error);
      return rejectWithValue(
        error.response?.data || { message: 'Không thể thực hiện bài đọc. Vui lòng thử lại.' }
      );
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
        
        return mockReading;
      }

      // Logic gọi API thực tế  
      const { auth } = getState();
      
      // Check if token exists to determine if we need to attach auth headers
      const headers = {};
      if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`;
      }
      
      const response = await apiClient.post('/readings/ai', {
        type: 'ai',
        cards: readingData.selectedIndices.map(index => readingData.displayedCards[index]),
        domain: readingData.domain,
        question: readingData.question
      }, { headers });
      
      return response.data;
    } catch (error) {
      console.error('Error in performAIReading:', error);
      return rejectWithValue(
        error.response?.data || { message: 'Không thể thực hiện bài đọc AI. Vui lòng thử lại.' }
      );
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
        // Handle both array and nested object response structures
        if (action.payload && Array.isArray(action.payload)) {
          state.cards = action.payload;
        } else if (action.payload && action.payload.data && Array.isArray(action.payload.data.cards)) {
          state.cards = action.payload.data.cards;
        } else {
          console.error('Unexpected payload structure in fetchAllCards:', action.payload);
          // Keep the previous state if the payload is invalid
        }
      })
      .addCase(fetchAllCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch cards';
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
        // Handle both array and nested object response structures
        if (action.payload && Array.isArray(action.payload)) {
          state.twelveCards = action.payload;
        } else if (action.payload && action.payload.data && Array.isArray(action.payload.data.cards)) {
          state.twelveCards = action.payload.data.cards;
        } else {
          console.error('Unexpected payload structure in fetchTwelveRandomCards:', action.payload);
          // Keep the previous state if the payload is invalid
        }
        state.selectedIndices = []; // Reset selected cards
      })
      .addCase(fetchTwelveRandomCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch random cards';
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
        // Kiểm tra nếu là lỗi xác thực và đang sử dụng USE_MOCK_API thì bỏ qua
        const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true';
        if (action.payload && action.payload.message === 'Unauthorized - Invalid token' && useMockApi) {
          // Bỏ qua lỗi xác thực nếu đang sử dụng mock API
          state.error = null;
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
        // Kiểm tra nếu là lỗi xác thực và đang sử dụng USE_MOCK_API thì bỏ qua
        const useMockApi = localStorage.getItem('USE_MOCK_API') === 'true';
        if (action.payload && action.payload.message === 'Unauthorized - Invalid token' && useMockApi) {
          // Bỏ qua lỗi xác thực nếu đang sử dụng mock API
          state.error = null;
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