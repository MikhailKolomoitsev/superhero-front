import axios from 'axios';

class ApiService{
    _DEFAULT_OPTIONS = {
        base_api_url: process.env.REACT_APP_API_BASE_URL || 'https://immense-anchorage-36138.herokuapp.com/api/hero',
    }

    getAll() {
        return axios.get(`${this._DEFAULT_OPTIONS.base_api_url}`);
    }

    getById(id) {
        return axios.get(`${this._DEFAULT_OPTIONS.base_api_url}/${id}`).then(res => res.data);
    }

    create(data) {
        return axios.post(`${this._DEFAULT_OPTIONS.base_api_url}`,data)
    }

    updateById(id, data) {
        return axios.patch(`${this._DEFAULT_OPTIONS.base_api_url}/${id}`, data);
    }

    deleteById(id) {
        return axios.post(`${this._DEFAULT_OPTIONS.base_api_url}/${id}`);
    }
}

export default new ApiService();