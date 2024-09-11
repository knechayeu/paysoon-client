import axios, { AxiosResponse } from 'axios';

axios.defaults.headers.id = sessionStorage.getItem('id') || null;

export const axiosInstance = axios;

export const getAxios = async (url: string): Promise<unknown> => {
  try {
    const result: AxiosResponse = await axios.get(url, {
      headers: {
        id: sessionStorage.getItem('id'),
      },
    });

    return result.data;
  } catch (e) {
    return e;
  }
};

export const postAxios = async (url: string, values: unknown): Promise<unknown> => {
    try {
      const result: AxiosResponse = await axios.post(url, values, {
        headers: {
          id: sessionStorage.getItem('id'),
        },
      });
  
      return result.data;
    } catch (e) {
      return e;
    }
  };