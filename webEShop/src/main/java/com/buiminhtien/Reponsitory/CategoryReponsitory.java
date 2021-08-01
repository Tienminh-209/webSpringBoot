package com.buiminhtien.Reponsitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.buiminhtien.Entity.Category;

@Repository
public interface CategoryReponsitory extends JpaRepository<Category, Long> {
	// lay-cap-cha
	@Query("SELECT c FROM Category c WHERE c.parent_id=0")
	public List<Category> getparentId();

	// lay-con-ao-nam
	@Query("SELECT c FROM Category c WHERE c.parent_id=1")
	public List<Category> getAllAoNam();

	// lay-con-quan-nam
	@Query("SELECT c FROM Category c WHERE c.parent_id=2")
	public List<Category> getAllQuanNam();

	// lay-con-phu-kien
	@Query("SELECT c FROM Category c WHERE c.parent_id=3")
	public List<Category> getAllPhuKien();

	// lay-con-do-bo
	@Query("SELECT c FROM Category c WHERE c.parent_id=4")
	public List<Category> getAllDoBo();

	// lay-con-ao-doi
	@Query("SELECT c FROM Category c WHERE c.parent_id=5")
	public List<Category> getAllDoDoi();

	// lay-con-do-ngu
	@Query("SELECT c FROM Category c WHERE c.parent_id=6")
	public List<Category> getAllDoNgu();

	@Query("SELECT c FROM Category c WHERE c.status=false")
	public List<Category> getNhomSanPham();


}
