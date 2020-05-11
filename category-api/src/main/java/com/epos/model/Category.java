package com.epos.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Category")
public class Category  implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "CategoryId", nullable = false)
	private Long categoryId;
	
	@Column(name = "CategoryCode", nullable = false)
	private String categoryCode;
	
	@Column(name = "CategoryName", nullable = false)
	private String categoryName;
	
	@Column(name = "IsActive", nullable = false)
	private boolean isActive;
	
	@Column(name = "CreatedBy", nullable = false)
	private String createdBy;
	
	@Column(name = "CreatedDate", nullable = false)
	private Date createdDate;

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Override
	public String toString() {
		return "Category [categoryId=" + categoryId + ", categoryCode=" + categoryCode + ", categoryName="
				+ categoryName + ", isActive=" + isActive + ", createdBy=" + createdBy + ", createdDate=" + createdDate
				+ "]";
	}	
	
}