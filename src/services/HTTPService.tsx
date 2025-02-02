import axios from "axios";

const API_BASE_URL = "http://localhost:3200";

const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

http.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  http.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  export const getBooks = async (keyword?: string) => {
    const url = keyword ? `/config/books?keyword=${keyword}` : '/config/books';
    const response = await http.get(url);
    return response.data;
  };
  
  export const addBook = async (book: { title: string; author: string }) => {
    const response = await http.post("/config/books", book);
    return response.data;
  };
  
  export const updateBook = async (id: string, book: { title: string; author: string }) => {
    const response = await http.put(`/config/books/${id}`, book);
    return response.data;
  };
  
  export const deleteBook = async (id: string) => {
    await http.delete(`/config/books/${id}`);
  };

  
  export default http;