package com.epos.serviceImpl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.epos.dao.ICategoryDao;
import com.epos.model.Category;
import com.epos.service.ICategoryService;

@Service
public class CategoryServiceImpl implements ICategoryService {
	
	@Autowired
	ICategoryDao categoryDao;

	@Override
	public List<Category> GetCategories() {
		// TODO Auto-generated method stub
		return categoryDao.findAll();
	}

	@Override
	public Category GetCategoryByID(Long categoryId) {
		// TODO Auto-generated method stub
		return categoryDao.findById(categoryId).orElse(null);
	}

	@Override
	public Category CreateCategory(Category category) {
		category.setCreatedBy("Test User");	
		category.setCreatedDate(new Date());
		return categoryDao.save(category);
	}

	@Override
	public ResponseEntity<?> DeleteCategory(Long categoryId) {
		Category category = categoryDao.findById(categoryId).orElse(null);
		categoryDao.delete(category);
		return ResponseEntity.ok().build();
	}

	@Override
	public Category UpdateCategory(Long categoryId, Category categoryResponse) {
		Category category = categoryDao.findById(categoryId).orElse(null);
		category.setCategoryCode(categoryResponse.getCategoryCode());
		category.setCategoryName(categoryResponse.getCategoryName());
		category.setActive(categoryResponse.isActive());
		
		return categoryDao.save(category);
	}
}
