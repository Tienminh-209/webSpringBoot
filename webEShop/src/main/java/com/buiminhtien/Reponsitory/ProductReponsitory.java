package com.buiminhtien.Reponsitory;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.buiminhtien.Entity.Product;

@Repository
public interface ProductReponsitory extends JpaRepository<Product, Long> {
	// truy-van-ao-thun
	@Query(value = "select * from Product P where P.cateid=7", nativeQuery = true)
	public Page<Product> listAoThuns(PageRequest pageRequest);

	// truy-van-ao-so-mi
	@Query(value = "select * from Product P where P.cateid=8", nativeQuery = true)
	public Page<Product> listAoSoMis(PageRequest pageRequest);

	// truy-van-ao-khoac
	@Query(value = "select * from Product P where P.cateid=10", nativeQuery = true)
	public Page<Product> listAoKhoacs(PageRequest pageRequest);

	// truy-van-ao-polo
	@Query(value = "select * from Product P where P.cateid= 9", nativeQuery = true)
	public Page<Product> listAoPolos(PageRequest pageRequest);

	// truy-van-quan-short
	@Query(value = "select * from Product P where P.cateid=13", nativeQuery = true)
	public Page<Product> listQuanShorts(PageRequest pageRequest);

	// truy-van-quan-jean
	@Query(value = "select * from Product P where P.cateid=12", nativeQuery = true)
	public Page<Product> listQuanJeans(PageRequest pageRequest);

	// truy-van-quan-tay
	@Query(value = "select * from Product P where P.cateid=11", nativeQuery = true)
	public Page<Product> listQuanTays(PageRequest pageRequest);

	// truy-van-phu-kien
	@Query(value = "select * from Product P where P.cateid=111", nativeQuery = true)
	public Page<Product> listPhuKiens(PageRequest pageRequest);

	// truy-van-do-bo
	@Query(value = "select * from Product P where P.cateid=111", nativeQuery = true)
	public Page<Product> listDobos(PageRequest pageRequest);

	// truy-van-san-pham-moi
	@Query(value = "select * from Product P where P.cateid=14", nativeQuery = true)
	public Page<Product> listProductNews(PageRequest pageRequest);

	// truy-van-san-pham-noi-bat
	@Query(value = "select * from Product P where P.cateid=15", nativeQuery = true)
	public Page<Product> listProductBests(PageRequest pageRequest);

	// truy-van-san-pham-that-lung
	@Query(value = "select * from Product P where P.cateid=19", nativeQuery = true)
	public Page<Product> listThatLungs(PageRequest pageRequest);

	// truy-van-san-pham-vi-da
	@Query(value = "select * from Product P where P.cateid=20", nativeQuery = true)
	public Page<Product> listViDas(PageRequest pageRequest);

	// truy-van-san-pham-mu-non
	@Query(value = "select * from Product P where P.cateid=21", nativeQuery = true)
	public Page<Product> listMunons(PageRequest pageRequest);

	// truy-van-san-pham-tui-xach
	@Query(value = "select * from Product P where P.cateid=22", nativeQuery = true)
	public Page<Product> listTuiXachs(PageRequest pageRequest);

	// truy-van-san-pham-mat-kinh
	@Query(value = "select * from Product P where P.cateid=23", nativeQuery = true)
	public Page<Product> listMatKinh(PageRequest pageRequest);

	// truy-van-san-pham-bo-do-ni-nam
	@Query(value = "select * from Product P where P.cateid=24", nativeQuery = true)
	public Page<Product> listDoboNis(PageRequest pageRequest);

	// truy-van-san-pham-bo-do-vest-nam
	@Query(value = "select * from Product P where P.cateid=25", nativeQuery = true)
	public Page<Product> listDoboVestNam(PageRequest pageRequest);

	// truy- van-ket-hop-2-table
	@Query(value = "SELECT * FROM Product Right JOIN ProductRelated  ON (product.id = productrelated.product_id) where product_related=?1 ", nativeQuery = true)
	public List<Product> listProductRelated(long id);

//	List<Product> findByCategoryId(Long categoryId);
	// Search Product
	@Query("SELECT p FROM Product p WHERE CONCAT(LOWER(p.title),LOWER(p.brands)) LIKE  %?1%  ")
	public List<Product> SearchContainsIgnoreCase(String keyword);

//	public List<Product> findByCategoryId(Long categoryId);
	@Query("SELECT p FROM Product p WHERE p.price>?1 and p.price <?2 and p.brands =?3 and p.cateid =?4")
	public List<Product> Filter(Double price_small,Double price_large,String brands,Integer cateid);

	@Query("SELECT p FROM Product p WHERE p.price>?1 and p.price <?2")
	public List<Product> FilterPrice(Double price_small,Double price_large);
	
	@Query("SELECT p FROM Product p WHERE p.brands =?1")
	public List<Product> FilterBrand(String brands);

}
