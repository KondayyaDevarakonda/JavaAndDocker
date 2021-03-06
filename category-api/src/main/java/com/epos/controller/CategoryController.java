package com.epos.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epos.model.Category;
import com.epos.service.ICategoryService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CategoryController {
	
	@Autowired
	ICategoryService categoryService;	
	
	
	@RequestMapping("/hello")
	public String index() {
		return "Spring Boot Example!!";
	}
	
	
	@GetMapping("/categories")
	//@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public List<Category> getCategories() {
		return categoryService.GetCategories();
	}
	
	@GetMapping("/categories/{categoryId}")
	//@RequestMapping(value = "/categories/{categoryId}", method = RequestMethod.GET, @PathVariable(value = "id") Long noteId)
	public Category getCategories(@PathVariable(value = "categoryId") Long categoryId) {
		return categoryService.GetCategoryByID(categoryId);
	}
	
	@PostMapping("/categories")
	public void CreateCategory(@Valid @RequestBody Category category) {
		categoryService.CreateCategory(category);
	}
	
	@PutMapping("/categories")
	public Category updateCategory(@Valid @RequestBody Category category) {
		return categoryService.UpdateCategory(category);
	}
	
	@DeleteMapping("/categories/{categoryId}")
	public ResponseEntity<?> DeleteCategory(@PathVariable(value = "categoryId") Long categoryId) {
		return categoryService.DeleteCategory(categoryId);
	}
}
