import axios from 'axios';

const PRODUCT_API_BASE_URL = 'http://localhost:8183/api/products';

class ApiProductService {

    fetchProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }

    fetchProductById(productId) {
        return axios.get(PRODUCT_API_BASE_URL + '/' + productId);
    }

    deleteProduct(productId) {
        return axios.delete(PRODUCT_API_BASE_URL + '/' + productId);
    }

    addProduct(product) {
        return axios.post(""+PRODUCT_API_BASE_URL, product);
    }

    editProduct(product) {
        return axios.put(PRODUCT_API_BASE_URL, product);
    }

}

export default new ApiProductService();