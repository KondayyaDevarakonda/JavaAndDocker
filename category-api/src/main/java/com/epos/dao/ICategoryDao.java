package com.epos.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epos.model.Category;

@Repository
public interface ICategoryDao extends JpaRepository<Category, Long>{
		
}
