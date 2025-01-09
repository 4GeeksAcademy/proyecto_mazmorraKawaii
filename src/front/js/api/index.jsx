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

//form
export const sendContactData = async (formData) => {
  try {
    const response = await apiClient.post('/contacto', formData);
    return response.data;
  } catch (error) {
    console.error('Error al enviar los datos de contacto:', error);
    throw error;
  }
};

//carrito
export const getCarrito = async () => {
  try {
    const response = await apiClient.get('/carrito');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};

//login user admi
/* export const loginAdmin = (email, password) => {
  return axios.post('http://127.0.0.1:3001/api/login', { email, password }); //me tinca q tengo problemas con rutas, entre las publicas vs las q no y las q visualiza el back
};

export const requestPasswordReset = (email) => {
  return axios.post('http://127.0.0.1:3001/api/request_reset', { email });
};

export const resetPassword = (token, newPassword) => {
  return axios.post(`http://127.0.0.1:3001/api/reset_password/${token}`, { new_password: newPassword });
}; */

export default apiClient;
