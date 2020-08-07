import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = '/products';
    return axiosClient.get(url, { params,
      headers: { 'test': 'test123'}
    });
  },

  getAllTest: (params) => {
    const url = 'https://api.newgen.dev/am/admin/members';
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
}

export default productApi;