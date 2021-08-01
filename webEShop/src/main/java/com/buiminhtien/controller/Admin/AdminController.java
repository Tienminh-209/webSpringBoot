package com.buiminhtien.controller.Admin;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.buiminhtien.Entity.Category;
import com.buiminhtien.Entity.ImageProduct;
import com.buiminhtien.Entity.News;
import com.buiminhtien.Entity.Product;
import com.buiminhtien.Entity.ProductRelated;
import com.buiminhtien.Reponsitory.CategoryReponsitory;
import com.buiminhtien.Reponsitory.ImageProductRepository;
import com.buiminhtien.Reponsitory.NewsReponsitory;
import com.buiminhtien.Reponsitory.ProductRelatedReponsitory;
import com.buiminhtien.Reponsitory.ProductReponsitory;
import com.buiminhtien.RequestPojo.ApiResponse;
import com.buiminhtien.exception.ResourceNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin/")
public class AdminController {

	private static String imageDirectory = System.getProperty("user.dir") + "/images/";
	private static String imageDirectory1 = System.getProperty("user.dir") + "/images/";
	@Autowired
	private CategoryReponsitory categoryReponsitory;
	@Autowired
	private ProductReponsitory productReponsitory;
	@Autowired
	private ProductRelatedReponsitory productRelatedReponsitory;
	@Autowired
	private ImageProductRepository imageProductRepository;
	@Autowired
	private NewsReponsitory newsReponsitory;

//PRODUCT_ADMIN START
	// get-product-by-id
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Long id) {
		Product product = productReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not exits with id:" + id));
		return ResponseEntity.ok(product);
	}

	// save-product
//		@PostMapping("/addProduct/{categoryId}")
//		public Product createProduct(@RequestBody Product product
//				,@PathVariable("categoryId") long categoryId
//				) {
	//
//			
//			product.setCategory(new Category(categoryId));
//			return productReponsitory.save(product);
//		}
	@PostMapping("/addProduct")
	public Product createProduct(@RequestBody Product product) {
		List<ProductRelated> productrelated = new ArrayList<ProductRelated>();
		List<ImageProduct> productimage = new ArrayList<ImageProduct>();
		product.setProductrelate(new HashSet<ProductRelated>() {
			/**
			 * 
			 */
			private static final long serialVersionUID = -5619441967802709713L;

			{
				for (ProductRelated news2 : productrelated) {

					add(news2);
				}
			}
		});
		product.setProductimage(new HashSet<ImageProduct>() {
			/**
			 * 
			 */
			private static final long serialVersionUID = -5619441967802709713L;

			{
				for (ImageProduct news2 : productimage) {

					add(news2);
				}

			}
		});

		return productReponsitory.save(product);
	}


	// up nhieu anh trong product
	@PostMapping(value = "/update-product-image/{id}", produces = { MediaType.IMAGE_PNG_VALUE, "application/json" })
	public ResponseEntity<?> updateUploadImage(@RequestParam("imageFile") MultipartFile file,
			// de phan biet la up load anh lien quan hay anh project
			@RequestParam("type") int type, @PathVariable("id") long productId) throws Exception {

		makeDirectoryIfNotExist(imageDirectory);

		Product product = productReponsitory.findById(productId).get();
		String fileName = "";

		// update anh product

		fileName = product.getImage();

		// test update anh 1 san pha mdi
		Path fileNamePath = Paths.get(imageDirectory, fileName);

		try {
			Files.write(fileNamePath, file.getBytes());

			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
		}

	}

	@GetMapping("/delete-product-image/{id}")
	public void deleteImages(@PathVariable("id") long productId) throws Exception {

		Product product = productReponsitory.findById(productId).get();

		product.getProductimage().forEach(productImage -> {

			try {
				Files.deleteIfExists(Paths.get(imageDirectory, productImage.getImage()));

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		});

		product.setProductimage(null);

		productReponsitory.save(product);

	}

//moi
	// up nhieu anh trong product
	@PostMapping(value = "/add-product-image/{id}", produces = { MediaType.IMAGE_PNG_VALUE, "application/json" })
	public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file,
			// de phan biet la up load anh lien quan hay anh project
			@RequestParam("type") int type, @PathVariable("id") long productId) {
		makeDirectoryIfNotExist(imageDirectory);
		String fileName = file.getOriginalFilename();
		System.out.println("fileName: " + fileName);
		Path fileNamePath = Paths.get(imageDirectory, fileName);
		try {
			Files.write(fileNamePath, file.getBytes());
			// up anh lien quan
			if (type == 0) {

				ImageProduct imageProduct = new ImageProduct(fileName, new Product(productId));
				imageProductRepository.save(imageProduct);
			} else {
				// up anh product
				Product product = productReponsitory.findById(productId).get();
				product.setImage(fileName);
				productReponsitory.save(product);
			}

			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (IOException ex) {
			return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
		}
	}

	private void makeDirectoryIfNotExist(String imageDirectory) {
		File directory = new File(imageDirectory);
		if (!directory.exists()) {
			directory.mkdir();
		}
	}
	//add-1
	@PostMapping(value = "/addimage", produces = { MediaType.IMAGE_PNG_VALUE, "application/json" })
	public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file) {
		makeDirectoryIfNotExist(imageDirectory);
		String fileName = file.getOriginalFilename();
		System.out.println("fileName: " + fileName);
		Path fileNamePath = Paths.get(imageDirectory, fileName);
		try {
			Files.write(fileNamePath, file.getBytes());
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (IOException ex) {
			return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
		}

	}
	//ad-updated-nhieu-hinh-anh
	@PutMapping("/product-images/{id}")
	public ResponseEntity<?> setProductImage(@PathVariable(value = "id") Long Id,
			@RequestBody List<ImageProduct> images) {
		Product product = productReponsitory.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found for this id : " + Id));
		product.getProductimage().clear();
		for (ImageProduct news2 : images) {
			product.getProductimage().add(news2);
		}
		imageProductRepository.saveAll(images);
		return ResponseEntity.ok(new ApiResponse("Save productImage successfully", ""));
	}
//add-update-sp-lq
	@PutMapping("/productrelated/{id}")
	public ResponseEntity<?> setProductrelated1(@PathVariable(value = "id") Long Id,
			@RequestBody List<ProductRelated> productRelateds) {
		Product product = productReponsitory.findById(Id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found for this id : " + Id));
		product.getProductrelate().clear();
		for (ProductRelated news2 : productRelateds) {

			product.getProductrelate().add(news2);
		}
		productRelatedReponsitory.saveAll(productRelateds);
		return ResponseEntity.ok(new ApiResponse("Save ProductRelated successfully", ""));
	}

	// up
	// update product rest api
	@PutMapping("/{id}")
	public ResponseEntity<Product> updateEmployee(@PathVariable Long id, @RequestBody Product productDetails) {
		Product product = productReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not exits with id:" + id));
		product.setTitle(productDetails.getTitle());
		product.setDescription(productDetails.getDescription());
		product.setPrice(productDetails.getPrice());
		product.setAmount(productDetails.getAmount());
		product.setBrands(productDetails.getBrands());
		product.setColor(productDetails.getColor());
		product.setImage(productDetails.getImage());
		product.setMaterial(productDetails.getMaterial());
		product.setDesign(productDetails.getDesign());
		product.setDiscount(productDetails.getDiscount());
		product.setCateid(productDetails.getCateid());
		Product updateProduct = productReponsitory.save(product);
		return ResponseEntity.ok(updateProduct);
	}

	// updated-product-related
//	@PutMapping("/productrelated/{id}")
//	public ResponseEntity<?> setProductrelated(@PathVariable(value = "id") Long Id,
//			@RequestBody List<ProductRelated> productRelateds) {
//		Product product = productReponsitory.findById(Id)
//				.orElseThrow(() -> new ResourceNotFoundException("Product not found for this id :: " + Id));
//		product.getProductrelate().clear();
//		for (ProductRelated news2 : productRelateds) {
//
//			news2.setProduct(product);
//		}
//		productRelatedReponsitory.saveAll(productRelateds);
//		return ResponseEntity.ok(new ApiResponse("Save ProductRelated successfully", ""));
//	}

	// create employee rest api
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
		Product product = productReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not exits with id:" + id));

		productReponsitory.delete(product);
		Map<String, Boolean> response = new HashMap<>();
		response.put("delete", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	// get-all-admin-product
	@GetMapping("/all-product")
	Page<Product> getAllProduct(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return productReponsitory.findAll(PageRequest.of(page.orElse(1), 10, Sort.Direction.ASC, sortBy.orElse("id")));
	}

	// PRODUCT_ADMIN END
//CATEGORY_START
//		get-category-by-id
	@GetMapping("/category/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
		Category category = categoryReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not exits with id:" + id));
		return ResponseEntity.ok(category);
	}

//		get all-category
	@GetMapping("/all-category")
	Page<Category> getAllCategory(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return categoryReponsitory.findAll(PageRequest.of(page.orElse(1), 10, Sort.Direction.ASC, sortBy.orElse("id")));
	}

	// save-admin
	@PostMapping("/addCategory")
	public Category createCategory(@RequestBody Category category) {
		return categoryReponsitory.save(category);
	}

//	// up anh trong category
//	@PostMapping(value = "/add-product-image/category/{id}", produces = { MediaType.IMAGE_PNG_VALUE,
//			"application/json" })
//	public ResponseEntity<?> uploadImageCategory(@RequestParam("imageFile") MultipartFile file,
//			@RequestParam("type") int type, @PathVariable("id") long categoryId) {
//		makeDirectoryIfNotExist1(imageDirectory1);
//		String fileName = file.getOriginalFilename();
//		Path fileNamePath = Paths.get(imageDirectory1, fileName);
//		try {
//			Files.write(fileNamePath, file.getBytes());
//			Category category = categoryReponsitory.findById(categoryId).get();
//			category.setImage(fileName);
//			categoryReponsitory.save(category);
//			return new ResponseEntity<>(HttpStatus.CREATED);
//		} catch (IOException ex) {
//			return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
//		}
//	}
//
//	private void makeDirectoryIfNotExist1(String imageDirectory) {
//		File directory = new File(imageDirectory);
//		if (!directory.exists()) {
//			directory.mkdir();
//		}
//	}

	// updateAdmin
	@PutMapping("/category/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
		Category category = categoryReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not exits with id:" + id));
		category.setTitle(categoryDetails.getTitle());
		category.setLink(categoryDetails.getLink());
		category.setStatus(categoryDetails.isStatus());
		category.setParent_id(categoryDetails.getParent_id());
		Category updateCategory = categoryReponsitory.save(category);
		return ResponseEntity.ok(updateCategory);
	}

	// delete category rest api	
	@DeleteMapping("/category/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCategorys(@PathVariable Long id){
		Category category = categoryReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("News not exist with id :" + id));
		
		categoryReponsitory.delete(category);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	// get-all-cap-cha
	@GetMapping("/all-parentId")
	List<Category> getParentId() {
		return categoryReponsitory.getparentId();
	}

	// get-all-cap-cha-ao-nam
	@GetMapping("/children-ao-nam")
	List<Category> getChildrenAoNam() {
		return categoryReponsitory.getAllAoNam();
	}

	// get-all-cap-cha-quan-nam
	@GetMapping("/children-quan-nam")
	List<Category> getChildrenQuanNam() {
		return categoryReponsitory.getAllQuanNam();
	}

	// get-all-cap-cha-phu-kien
	@GetMapping("/children-phu-kien")
	List<Category> getChildrenPhuKien() {
		return categoryReponsitory.getAllPhuKien();
	}

	// get-all-cap-cha-do-bo
	@GetMapping("/children-do-bo")
	List<Category> getChildrenDoBo() {
		return categoryReponsitory.getAllDoBo();
	}

	// get-all-cap-cha-do-doi
	@GetMapping("/children-do-doi")
	List<Category> getChildrenDoDoi() {
		return categoryReponsitory.getAllDoDoi();
	}

	// get-all-cap-cha-do-ngu
	@GetMapping("/children-do-ngu")
	List<Category> getChildrenDoNgu() {
		return categoryReponsitory.getAllDoNgu();
	}
	@GetMapping("/get-all-category-chirlden")
	List<Category> getNhomSanPham() {
		return categoryReponsitory.getNhomSanPham();
	}
	
//CATEGORY_END

	// News_START
//		get-news-by-id
	@GetMapping("/new/{id}")
	public ResponseEntity<News> getNewsById(@PathVariable Long id) {
		News news = newsReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not exits with id:" + id));
		return ResponseEntity.ok(news);
	}

//		get all-news
	@GetMapping("/all-news")
	Page<News> getAllNews(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return newsReponsitory.findAll(PageRequest.of(page.orElse(1), 10, Sort.Direction.ASC, sortBy.orElse("id")));
	}

	// save-news
	@PostMapping("/addNews")
	public News createNew(@RequestBody News news) {
		return newsReponsitory.save(news);
	}
	//add-image-news
//	@PostMapping(value = "/add-image-news", produces = { MediaType.IMAGE_PNG_VALUE, "application/json" })
//	public ResponseEntity<?> uploadImageNews(@RequestParam("imageFile") MultipartFile file) {
//		makeDirectoryIfNotExist(imageDirectory);
//		String fileName = file.getOriginalFilename();
//		Path fileNamePath = Paths.get(imageDirectory, fileName);
//		try {
//			Files.write(fileNamePath, file.getBytes());
//			return new ResponseEntity<>(HttpStatus.CREATED);
//		} catch (IOException ex) {
//			return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
//		}
//
//	}

	// updateAdmin-news
	@PutMapping("/news/{id}")
	public ResponseEntity<News> updateNew(@PathVariable Long id, @RequestBody News newDetails) {
		News news = newsReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not exits with id:" + id));
		news.setTitle(newDetails.getTitle());
		news.setDescription(newDetails.getDescription());
		news.setImage(newDetails.getImage());
		news.setCategory_new(newDetails.getCategory_new());
		News updateNews = newsReponsitory.save(news);
		return ResponseEntity.ok(updateNews);
	}
	@DeleteMapping("/news/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteNews(@PathVariable Long id){
		News news = newsReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("News not exist with id :" + id));
		
		newsReponsitory.delete(news);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
//News_END
}
