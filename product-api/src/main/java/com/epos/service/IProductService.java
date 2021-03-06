package com.epos.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.epos.model.Product;

public interface IProductService {
	List<Product> GetProducts();
	
	Product GetProductByID(Long productId);
    
	Product CreateProduct(Product product);
    
	ResponseEntity<?> DeleteProduct(Long productId);
    
    Product UpdateProduct(Product productResponse);
    
}
