import apiClient from '../../../shared/utils/api/apiClient';

// Get all cards
export const getAllCards = async () => {
  try {
    const response = await apiClient.get('/cards');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get card by id
export const getCardById = async (cardId) => {
  try {
    const response = await apiClient.get(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get daily tarot card
export const getDailyTarot = async () => {
  try {
    const response = await apiClient.get('/readings/daily');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Create new reading
export const createReading = async (readingData) => {
  try {
    const response = await apiClient.post('/readings', readingData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get reading by id
export const getReadingById = async (readingId) => {
  try {
    const response = await apiClient.get(`/readings/${readingId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get user readings history
export const getUserReadings = async (params = {}) => {
  try {
    const response = await apiClient.get(`/readings/user`, { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Get AI interpretation
export const getAIInterpretation = async (cards, question, readingType) => {
  try {
    const response = await apiClient.post('/ai/interpret', {
      cards,
      question,
      readingType
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
}; 