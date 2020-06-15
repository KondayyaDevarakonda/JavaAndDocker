import axios from 'axios';

const CATEGORY_API_BASE_URL = 'http://localhost:8181/api/categories';

class ApiCategoryService {

    fetchCategories() {
        return axios.get(CATEGORY_API_BASE_URL);
    }

    fetchCategoryById(categoryId) {
        return axios.get(CATEGORY_API_BASE_URL + '/' + categoryId);
    }

    deleteCategory(categoryId) {
        return axios.delete(CATEGORY_API_BASE_URL + '/' + categoryId);
    }

    addCategory(category) {
        return axios.post(""+CATEGORY_API_BASE_URL, category);
    }

    editCategory(category) {
        return axios.put(CATEGORY_API_BASE_URL, category);
    }

}

export default new ApiCategoryService();