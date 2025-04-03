import axios from 'axios';

export interface SupabaseClient {
  from: (table: string) => {
    insert: (data: any[]) => Promise<{ data: any; error: any }>;
    select: (query?: string) => Promise<{ data: any; error: any }>;
    update: (data: any) => Promise<{ data: any; error: any }>;
    delete: () => Promise<{ data: any; error: any }>;
  };
}

export const createSupabaseClient = (url: string, key: string): SupabaseClient => {
  const axiosInstance = axios.create({
    baseURL: `${url}/rest/v1`,
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
    },
  });

  return {
    from: (table: string) => ({
      insert: async (data: any[]) => {
        try {
          const response = await axiosInstance.post(`/${table}`, data);
          return { data: response.data, error: null };
        } catch (error) {
          console.error('Error inserting data:', error);
          return { data: null, error };
        }
      },
      select: async (query?: string) => {
        try {
          const response = await axiosInstance.get(`/${table}${query ? `?${query}` : ''}`);
          return { data: response.data, error: null };
        } catch (error) {
          console.error('Error selecting data:', error);
          return { data: null, error };
        }
      },
      update: async (data: any) => {
        try {
          const response = await axiosInstance.patch(`/${table}`, data);
          return { data: response.data, error: null };
        } catch (error) {
          console.error('Error updating data:', error);
          return { data: null, error };
        }
      },
      delete: async () => {
        try {
          const response = await axiosInstance.delete(`/${table}`);
          return { data: response.data, error: null };
        } catch (error) {
          console.error('Error deleting data:', error);
          return { data: null, error };
        }
      },
    }),
  };
};
  
  