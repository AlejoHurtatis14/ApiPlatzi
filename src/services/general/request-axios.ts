import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/products',
    timeout: 1000
});

const RequestAxiosService = {
    get: (module: string = '') => {
        return instance.get(`${module}`);
    },
    filterProducts: (value: string) => {
        return instance.get(`/?title=${value}`)
    },
    post: (data: any, module: string = '') => {
        return instance.post(`${module}`, data);
    },
    delete: (module: string = '') => {
        return instance.delete(`${module}`);
    }
}

export default RequestAxiosService;
