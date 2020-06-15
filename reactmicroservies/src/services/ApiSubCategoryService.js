import axios from 'axios';

const SUBCATEGORY_API_BASE_URL = 'http://localhost:8184/api/subcategories';

class ApiSubCategoryService {

    fetchSubCategories() {
        return axios.get(SUBCATEGORY_API_BASE_URL);
    }

    fetchSubCategoryById(subCategoryId) {
        return axios.get(SUBCATEGORY_API_BASE_URL + '/' + subCategoryId);
    }

    deleteSubCategory(subCategoryId) {
        return axios.delete(SUBCATEGORY_API_BASE_URL + '/' + subCategoryId);
    }

    addSubCategory(subCategory) {
        return axios.post(""+SUBCATEGORY_API_BASE_URL, subCategory);
    }

    editSubCategory(subCategory) {
        return axios.put(SUBCATEGORY_API_BASE_URL, subCategory);
    }

}

export default new ApiSubCategoryService();