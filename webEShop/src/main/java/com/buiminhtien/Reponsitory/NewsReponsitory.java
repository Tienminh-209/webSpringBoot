package com.buiminhtien.Reponsitory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.buiminhtien.Entity.News;

@Repository
public interface NewsReponsitory extends JpaRepository<News, Long> {
	// truy-van-su-kien
	@Query(value = "select * from News where News.category_new=4", nativeQuery = true)
	public Page<News> listEvents(PageRequest pageRequest);

	// truy-van-loi-khuyen-chia-se
	@Query(value = "select * from News where News.category_new=3", nativeQuery = true)
	public Page<News> listTipAndShare(PageRequest pageRequest);

	// truy-van-tin-tuc-noi-bat
	@Query(value = "select * from News where News.category_new=2", nativeQuery = true)
	public Page<News> listNewHots(PageRequest pageRequest);

	// truy-van-tin-tuc-moi
	@Query(value = "select * from News where News.category_new=1", nativeQuery = true)
	public Page<News> listNewsNew(PageRequest pageRequest);
}
