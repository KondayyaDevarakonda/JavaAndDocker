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

import com.epos.model.Product;
import com.epos.service.IProductService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProductController {
	
	@Autowired
	IProductService productService;	
	
	@RequestMapping("/hello")
	public String index() {
		return "You are in Product Service";
	}
	
	@GetMapping("/products")
	public List<Product> getProducts() {
		return productService.GetProducts();
	}
	
	@GetMapping("/products/{productId}")
	public Product getCategories(@PathVariable(value = "productId") Long productId) {
		return productService.GetProductByID(productId);
	}
	
	@PostMapping("/products")
	public void CreateProduct(@Valid @RequestBody Product product) {
		productService.CreateProduct(product);
	}
	
	@PutMapping("/products")
	public Product updateProduct(@Valid @RequestBody Product product) {
		return productService.UpdateProduct(product);
	}
	
	@DeleteMapping("/products/{productId}")
	public ResponseEntity<?> DeleteProduct(@PathVariable(value = "productId") Long productId) {
		return productService.DeleteProduct(productId);
	}
}
