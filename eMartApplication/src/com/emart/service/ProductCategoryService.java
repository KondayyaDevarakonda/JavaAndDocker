package com.emart.service;

import java.util.List;

public interface ProductCategoryService {

	List<String> getProductCategories();
	List<String> getProductByCategories(String categoryName);
	boolean addProductByCategory(String categoryName, String productName);
}
