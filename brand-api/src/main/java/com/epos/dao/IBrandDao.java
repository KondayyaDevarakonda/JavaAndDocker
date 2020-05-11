package com.epos.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epos.model.Brand;

@Repository
public interface IBrandDao extends JpaRepository<Brand, Long>{
		
}
