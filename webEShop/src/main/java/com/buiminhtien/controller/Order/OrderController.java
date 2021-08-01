package com.buiminhtien.controller.Order;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.buiminhtien.Entity.Order;
import com.buiminhtien.Entity.OrderDetails;
import com.buiminhtien.Reponsitory.OrderReponsitory;

@RestController
@CrossOrigin
public class OrderController {
	@Autowired
	private OrderReponsitory orderReponsitory;
//lay-info-user-theo-id
	@GetMapping("/info_user/{id}")
	public List<Order> getListOrderDetail(@PathVariable(value = "id") String id) {
		return orderReponsitory.ListInfoById(id);
	}
//lay-all-order
	@GetMapping("/allorder")
	Page<Order> getAllOrder(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
		return orderReponsitory.findAll(PageRequest.of(page.orElse(1), 10, Sort.Direction.ASC, sortBy.orElse("id")));
	}
	@PostMapping("/infos")
	public Order createForm(@RequestBody Order order) {
		return orderReponsitory.save(order);
	}

	@DeleteMapping("/info_order/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteOrder(@PathVariable String id) {
		Order order = orderReponsitory.getOrder(id);
		orderReponsitory.delete(order);
		Map<String, Boolean> response = new HashMap<>();
		response.put("delete", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
