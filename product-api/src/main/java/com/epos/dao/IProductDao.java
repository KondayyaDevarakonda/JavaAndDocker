package com.epos.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epos.model.Product;

@Repository
public interface IProductDao extends JpaRepository<Product, Long>{
		
}
