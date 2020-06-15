package com.epos.serviceImpl;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.hibernate.engine.internal.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.epos.dao.IProductDao;
import com.epos.model.Product;
import com.epos.service.IProductService;

@Service
public class ProductServiceImpl implements IProductService {
	
	@Autowired
	IProductDao productDao;

	@Override
	public List<Product> GetProducts() {
		// TODO Auto-generated method stub	
		return productDao.findAll();
//		return productDao.findAll().stream()
//				  .sorted(Comparator.comparing(Product::getProductName))
//				  .collect(Collectors.toList());
	}

	@Override
	public Product GetProductByID(Long productId) {
		// TODO Auto-generated method stub
		return productDao.findById(productId).orElse(null);
	}

	@Override
	public Product CreateProduct(Product product) {
		product.setCreatedBy(product.getCreatedBy());	
		product.setCreatedDate(product.getCreatedDate());
		return productDao.save(product);
	}

	@Override
	public ResponseEntity<?> DeleteProduct(Long productId) {
		Product product = productDao.findById(productId).orElse(null);
		productDao.delete(product);
		return ResponseEntity.ok().build();
	}

	@Override
	public Product UpdateProduct(Product productResponse) {
		Product product = productDao.findById(productResponse.getProductId()).orElse(null);
		product.setProductName(productResponse.getProductName());
		product.setCategoryId(productResponse.getCategoryId());
		product.setSubCategoryId(productResponse.getSubCategoryId());
		product.setBrandId(productResponse.getBrandId());
		product.setModleYear(productResponse.getModleYear());
		product.setListPrice(productResponse.getListPrice());
		product.setActive(productResponse.isActive());
		
		return productDao.save(product);
	}
}
