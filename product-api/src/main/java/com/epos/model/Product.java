package com.epos.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Products")
public class Product  implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ProductId", nullable = false)
	private Long productId;
	
	@Column(name = "ProductName", nullable = false)
	private String productName;
	
	@Column(name = "BrandId", nullable = false)
	private Long brandId;
	
	@Column(name = "CategoryId", nullable = false)
	private String categoryId;
	
	@Column(name = "ModleYear", nullable = false)
	private Integer modleYear;
	
	@Column(name = "ListPrice", nullable = false)
	private BigDecimal listPrice;
	
	@Column(name = "IsActive", nullable = false)
	private boolean isActive;
	
	@Column(name = "CreatedBy", nullable = false)
	private String createdBy;
	
	@Column(name = "CreatedDate", nullable = false)
	private Date createdDate;

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Long getBrandId() {
		return brandId;
	}

	public void setBrandId(Long brandId) {
		this.brandId = brandId;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getModleYear() {
		return modleYear;
	}

	public void setModleYear(Integer modleYear) {
		this.modleYear = modleYear;
	}

	public BigDecimal getListPrice() {
		return listPrice;
	}

	public void setListPrice(BigDecimal listPrice) {
		this.listPrice = listPrice;
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
		return "Products [productId=" + productId + ", productName=" + productName + ", brandId=" + brandId
				+ ", categoryId=" + categoryId + ", modleYear=" + modleYear + ", listPrice=" + listPrice + ", isActive="
				+ isActive + ", createdBy=" + createdBy + ", createdDate=" + createdDate + "]";
	}	
}