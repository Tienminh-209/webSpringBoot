package com.buiminhtien.controller.Home;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.buiminhtien.Entity.News;
import com.buiminhtien.Entity.Product;
import com.buiminhtien.Reponsitory.NewsReponsitory;
import com.buiminhtien.exception.ResourceNotFoundException;

//
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class NewsController {
	@Autowired
	private NewsReponsitory newsReponsitory;

//	 get tat-ca-news
	@GetMapping("/news")
	Page<News> getAllNews(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return newsReponsitory.findAll(PageRequest.of(page.orElse(1), 4, Sort.Direction.ASC, sortBy.orElse("id")));
	}
//	 lay-su-kien
	@GetMapping("/events")
	Page<News> getEvents(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return newsReponsitory.listEvents(PageRequest.of(page.orElse(1), 6, Sort.Direction.ASC, sortBy.orElse("id")));
	}
//	 lay-loi-khuyen-chia-se
	@GetMapping("/tips")
	Page<News> getTips(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return newsReponsitory.listTipAndShare(PageRequest.of(page.orElse(1), 6, Sort.Direction.ASC, sortBy.orElse("id")));
	}
//	 lay-tin-tuc-noi-bat
	@GetMapping("/newHot")
	Page<News> getNewHots(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return newsReponsitory.listNewHots(PageRequest.of(page.orElse(1), 1, Sort.Direction.ASC, sortBy.orElse("id")));
	}
//	 lay-tin-tuc-noi-bat
	@GetMapping("/newNews")
	Page<News> getNewNews(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return newsReponsitory.listNewsNew(PageRequest.of(page.orElse(1), 4, Sort.Direction.ASC, sortBy.orElse("id")));
	}
	// get-new-by-id
	@GetMapping("/news/detail/{id}")
	public ResponseEntity<News> getnewById(@PathVariable Long id) {
		News news = newsReponsitory.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not exist with id :" + id));
		return ResponseEntity.ok(news);
	}

	// get-all-news
	@GetMapping("/allnews")
	List<News> listAllNews() {
		return newsReponsitory.findAll();
	}

//	 get tat-ca-news-in-page-orther
	@GetMapping("/newsinpageorther")
	Page<News> getAllNewsInPageOrther(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return newsReponsitory.findAll(PageRequest.of(page.orElse(1), 3, Sort.Direction.ASC, sortBy.orElse("id")));
	}
}
