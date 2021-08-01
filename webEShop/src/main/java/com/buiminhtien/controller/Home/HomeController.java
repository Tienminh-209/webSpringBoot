package com.buiminhtien.controller.Home;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.buiminhtien.Entity.Category;
import com.buiminhtien.Entity.Product;
import com.buiminhtien.Reponsitory.CategoryReponsitory;
import com.buiminhtien.Reponsitory.ProductReponsitory;
import com.buiminhtien.Service.ProductService;
import com.buiminhtien.exception.ResourceNotFoundException;
import com.buiminhtien.payload.response.CategoryResponse;

import javassist.NotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class HomeController {
	@Autowired
	private ProductReponsitory productReponsitory;
	@Autowired
	private CategoryReponsitory categoryReponsitory;
	 @Autowired
	  private ProductService productService;
//	PRODUCT START
//	get san-pham-moi
	@GetMapping("/new")
	Page<Product> listProductNews(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listProductNews(
				PageRequest.of(
		                page.orElse(1),
		                8,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
	
	//san-pham-moi-trang khac lay 3sp
	@GetMapping("/newinpageorther")
	Page<Product> listProductNewsInPageOther(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listProductNews(
				PageRequest.of(
		                page.orElse(1),
		                4,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}

//	get san-pham-noi-bat
	@GetMapping("/best")
	 Page<Product> listProductBests(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listProductBests(
				PageRequest.of(
		                page.orElse(1),
		                8,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
	//san-pham-noi-bat-trang khac lay 3sp
		@GetMapping("/bestinpageorther")
		Page<Product> listProductBestsInPageOther(
				 @RequestParam Optional<Integer> page,
		         @RequestParam Optional<String> sortBy) {
			return productReponsitory.listProductBests(
					PageRequest.of(
			                page.orElse(1),
			                4,
			                Sort.Direction.ASC, sortBy.orElse("id")
			                )
							);
				}
//	get-ao-thun
	@GetMapping("/ao-thuns")
	 Page<Product> listAoThuns(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listAoThuns(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get-ao-so-mi
	@GetMapping("/ao-somis")
	 Page<Product> listAoSoMi(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listAoSoMis(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get ao-khoac
	@GetMapping("/ao-khoacs")
	 Page<Product> listAoKhoac(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listAoKhoacs(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get ao-polo
	@GetMapping("/ao-polos")
	 Page<Product> listAoPolo(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listAoPolos(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get quan-short
	@GetMapping("/quan-short")
	 Page<Product> listQuanShort(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listQuanShorts(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get quan-jean
	@GetMapping("/quan-jean")
	 Page<Product> listQuanJean(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listQuanJeans(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get quan-tay
	@GetMapping("/quan-tay")
	 Page<Product> listQuanTays(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listQuanTays(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get phu-kien
	@GetMapping("/phu-kiens")
	 Page<Product> listPhuKien(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listPhuKiens(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get-bộ-đồ-nỉ-nam
	@GetMapping("/do-bo-ni-nam")
	 Page<Product> listDoboNoNam(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listDoboNis(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get-bộ-đồ-vest-nam
	@GetMapping("/do-bo-vest-nam")
	 Page<Product> listDoboVestNam(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listDoboVestNam(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get that-lung
	@GetMapping("/that-lungs")
	 Page<Product> listThatLung(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listThatLungs(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get vi-da
	@GetMapping("/vi-das")
	 Page<Product> listViDas(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listViDas(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get mu-non
	@GetMapping("/mu-nons")
	 Page<Product> listMunon(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listMunons(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get tui-xach
	@GetMapping("/tui-xachs")
	 Page<Product> listTuiXach(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listTuiXachs(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	get mat-kinh
	@GetMapping("/mat-kinhs")
	 Page<Product> listMatKinhs(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return productReponsitory.listMatKinh(
				PageRequest.of(
		                page.orElse(1),
		                9,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}
//	 get tat-ca-san-pham
	@GetMapping("/product")
    Page<Product> getAllProduct(
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<String> sortBy
    ) {
        return productReponsitory.findAll(
                PageRequest.of(
                        page.orElse(1),
                        4,
                        Sort.Direction.ASC, sortBy.orElse("id")
                )
        );
    }
//	 get tat-ca-san-pham-khng-phan-trang
	@GetMapping("/productall")
	public List<Product> getAllProductNoPa() {

		return productReponsitory.findAll();

	}	
//get product-related
	@GetMapping("/product/related/{id}")
	public List<Product> listProductRelated(@PathVariable Long id)
	{
		return productReponsitory.listProductRelated(id);
	}
	// get employee by id rest api
	@GetMapping("/product/detail/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Long id) {
		Product product = productReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not exist with id :" + id));
		return ResponseEntity.ok(product);
	}
	//Search Product
	 @RequestMapping("/search")
	    public  List<Product> viewHomePage(@Param("keyword") String keyword) {
	        List<Product> listProducts = productService.listAll(keyword);
	        return listProducts;
	    }
	 //Filter Product
//	 @RequestMapping("/filter")
//	    public  List<Product> viewFilter(@Param("price_small") Double price_small,@Param("price_large") Double price_large,@Param("brands") String brands) {
//		  List<Product> listProducts1 = productReponsitory.Filter(price_small, price_large,brands);
//	        return listProducts1;
//	    }	
	// PRODUCT END
	 @RequestMapping("/filter")
		public List<Product> viewFilter1(@Param("price_small") Double price_small, @Param("price_large") Double price_large,
				@Param("brands") String brands,@Param("cateid") Integer cateid) {
			List<Product> list = new ArrayList<Product>();
			String s2="none";
			
			if ((s2.compareTo(brands)==0)&&price_large!=0) {
				
				List<Product> listProducts = productReponsitory.FilterPrice(price_small, price_large);
				list = listProducts;
			}
			if (price_large == 0 && (s2.compareTo(brands)!=0)) {
				List<Product> listProducts = productReponsitory.FilterBrand(brands);
				list = listProducts;
			}
			if (price_large != 0 && (s2.compareTo(brands)!=0)) {
				List<Product> listProducts = productReponsitory.Filter(price_small, price_large, brands,cateid);
				list = listProducts;
			}
			if (price_large == 0 && (s2.compareTo(brands)==0)) {
				List<Product> listProducts = productReponsitory.findAll();
				list = listProducts;
			}
			return list;
		}
//	CATEGORY START

//		get all-category
		@GetMapping("/category")
		public List<CategoryResponse> getAllCategory() {
			
			return categoryReponsitory.findAll().stream()
					.map(s -> new CategoryResponse(s.getId(), s.getTitle(),s.getLink()))
					.collect(Collectors.toList());
		}	
	// ham them product
	
	
	
	
////	get category-by-id-rest-api
//	@GetMapping("/product/{categoryId}")
//	public List<Product> getContactByCategoryId(@PathVariable Long categoryId) throws NotFoundException {
//		return productReponsitory.findByCategoryId(categoryId);
//	}
//	CATEGORY END

}
