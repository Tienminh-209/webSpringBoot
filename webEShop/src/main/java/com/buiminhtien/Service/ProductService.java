package com.buiminhtien.Service;

import java.util.List;

import com.buiminhtien.Entity.Product;

public interface ProductService {
	  public List<Product> listAll(String keyword);
	  public Product getProductsById(long productId) throws Exception;
//	  public List<Product> findSearch(String title);
	  
}
