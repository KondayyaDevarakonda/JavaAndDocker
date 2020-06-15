package com.epos.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.epos.model.Brand;

public interface IBrandService {
	List<Brand> GetBrands();
	
	Brand GetBrandByID(Long brandId);
    
	Brand CreateBrand(Brand brand);
    
	Brand UpdateBrand(Brand brandResponse);
	
	ResponseEntity<?> DeleteBrand(Long brandId);
    
}
