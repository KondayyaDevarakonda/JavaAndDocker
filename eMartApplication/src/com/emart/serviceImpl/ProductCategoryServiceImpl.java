package com.emart.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import com.emart.service.ProductCategoryService;

public class ProductCategoryServiceImpl implements ProductCategoryService{
	List<String> bookList = new ArrayList<>();
	List<String> musicList = new ArrayList<>();
	List<String> movieList = new ArrayList<>();
	
	public ProductCategoryServiceImpl() {
		bookList.add("Java Book");
		bookList.add("C# Book");
		bookList.add("Azure Book");
		
		movieList.add("James Bond");
		movieList.add("Mogli");
		movieList.add("Jungle Book");
		
		musicList.add("Athudu");
		musicList.add("Rustom");
		musicList.add("Kaidhi");
	}
	

	@Override
	public List<String> getProductCategories() {
		List<String> categories = new ArrayList<>();
		categories.add("Books");
		categories.add("Movies");
		categories.add("Music");
		return categories;
	}


	@Override
	public List<String> getProductByCategories(String categoryName) {
		switch (categoryName.toLowerCase()) {
		case "books":
			return bookList;
		case "movies":
			return movieList;
		case "music":
			return musicList;
		}
		return null;
	}


	@Override
	public boolean addProductByCategory(String categoryName, String productName) {
		switch (categoryName.toLowerCase()) {
		case "books":
			bookList.add(productName);
			break;
		case "movies":
			movieList.add(productName);
			break;
		case "music":
			musicList.add(productName);
			break;
		default:
			return false;
		}
		return true;
	}

}
