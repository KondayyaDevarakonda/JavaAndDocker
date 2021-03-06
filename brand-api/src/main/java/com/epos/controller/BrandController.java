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

import com.epos.model.Brand;
import com.epos.service.IBrandService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class BrandController {
	
	@Autowired
	IBrandService brandService;
	
	@GetMapping("/hello")
	public String index() {
		return "Hello World";
	}
	
	@GetMapping("/brands")
	public List<Brand> GetBrands() {
		return brandService.GetBrands();
	}

	@GetMapping("/brands/{brandId}")
	public Brand GetBrandByID(@PathVariable(value = "brandId") Long brandId) {
		return brandService.GetBrandByID(brandId);
	}

	@PostMapping("/brands")
	public Brand CreateBrand(@Valid @RequestBody Brand brand) {
		return brandService.CreateBrand(brand);
	}

	@PutMapping("/brands")
	public Brand updateBrand(@Valid @RequestBody Brand brand) {
		return brandService.UpdateBrand(brand);
	}
	
	@DeleteMapping("/brands/{brandId}")
	public ResponseEntity<?> DeleteBrand(@PathVariable(value = "brandId") Long brandId) {
		return brandService.DeleteBrand(brandId);
	}

}
