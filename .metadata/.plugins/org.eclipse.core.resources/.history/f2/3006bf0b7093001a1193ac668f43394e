package com.epos.serviceImpl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.epos.dao.IBrandDao;
import com.epos.model.Brand;
import com.epos.service.IBrandService;

@Service
public class BrandServiceImpl implements IBrandService {
	
	@Autowired
	IBrandDao brandDao;

	@Override
	public List<Brand> GetBrands() {
		// TODO Auto-generated method stub
		return brandDao.findAll();
	}

	@Override
	public Brand GetBrandByID(Long brandId) {
		// TODO Auto-generated method stub
		return brandDao.findById(brandId).orElse(null);
	}

	@Override
	public Brand CreateBrand(Brand brand) {
		brand.setCreatedBy("Test User");	
		brand.setCreatedDate(new Date());
		return brandDao.save(brand);
	}

	@Override
	public Brand UpdateBrand(Long brandId, Brand brandResponse) {
		Brand category = brandDao.findById(brandId).orElse(null);
		category.setBrandName(brandResponse.getBrandName());
		category.setActive(brandResponse.isActive());
		
		return brandDao.save(category);
	}
	
	@Override
	public ResponseEntity<?> DeleteBrand(Long brandId) {
		Brand category = brandDao.findById(brandId).orElse(null);
		brandDao.delete(category);
		return ResponseEntity.ok().build();
	}
}
