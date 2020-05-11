package com.epos.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.epos.model.Category;

public interface ICategoryService {
	List<Category> GetCategories();
	
	Category GetCategoryByID(Long categoryId);
    
	Category CreateCategory(Category category);
    
	ResponseEntity<?> DeleteCategory(Long categoryId);
    
    Category UpdateCategory(Long categoryId, Category categoryResponse);
    
}
