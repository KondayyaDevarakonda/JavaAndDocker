package com.emart.model;

import java.util.ArrayList;
import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebService;

import com.emart.service.ProductCategoryService;
import com.emart.serviceImpl.ProductCategoryServiceImpl;

@WebService
public class ProductCatalog {
	
	ProductCategoryService pcs = new ProductCategoryServiceImpl();
	
	@WebMethod
	public List<String> getProductCategories() {					
		return pcs.getProductCategories();
	}
	
	@WebMethod
	public List<String> getProductsByCategory(String categoryName) {
		return pcs.getProductByCategories(categoryName);
	}
	
	@WebMethod
	public boolean addProductsByCategory(String categoryName, String productName) {
		return pcs.addProductByCategory(categoryName, productName);
	}

}
