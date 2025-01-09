import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async (endpoint, method = 'GET', data = null) => {
  try {
    const response = await apiClient({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// funcion form
export const sendContactData = async (formData) => {
  try {
    const response = await apiClient.post('/contacto', formData);
    return response.data;
  } catch (error) {
    console.error('Error al enviar los datos de contacto:', error);
    throw error;
  }
};

export default apiClient;
