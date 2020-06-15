import axios from 'axios';

const BRAND_API_BASE_URL = 'http://localhost:8182/api/brands';

class ApiBrandService {

    fetchBrands() {
        return axios.get(BRAND_API_BASE_URL);
    }

    fetchBrandById(brandId) {
        return axios.get(BRAND_API_BASE_URL + '/' + brandId);
    }

    deleteBrand(brandId) {
        return axios.delete(BRAND_API_BASE_URL + '/' + brandId);
    }

    addBrand(brand) {
        return axios.post(""+BRAND_API_BASE_URL, brand);
    }

    editBrand(brand) {
        return axios.put(BRAND_API_BASE_URL, brand);
    }

}

export default new ApiBrandService();