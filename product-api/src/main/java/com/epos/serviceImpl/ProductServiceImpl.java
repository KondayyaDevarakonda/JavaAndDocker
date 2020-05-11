package com.epos.serviceImpl;

import java.util.Date;
import java.util.List;

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
	}

	@Override
	public Product GetProductByID(Long productId) {
		// TODO Auto-generated method stub
		return productDao.findById(productId).orElse(null);
	}

	@Override
	public Product CreateProduct(Product product) {
		product.setCreatedBy("Test User");	
		product.setCreatedDate(new Date());
		return productDao.save(product);
	}

	@Override
	public ResponseEntity<?> DeleteProduct(Long productId) {
		Product product = productDao.findById(productId).orElse(null);
		productDao.delete(product);
		return ResponseEntity.ok().build();
	}

	@Override
	public Product UpdateProduct(Long productId, Product productResponse) {
		Product product = productDao.findById(productId).orElse(null);
		product.setProductName(productResponse.getProductName());
		product.setBrandId(productResponse.getBrandId());
		product.setCategoryId(productResponse.getCategoryId());
		product.setActive(productResponse.isActive());
		
		return productDao.save(product);
	}
}
