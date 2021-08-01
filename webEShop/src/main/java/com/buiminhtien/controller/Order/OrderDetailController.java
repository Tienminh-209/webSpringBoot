package com.buiminhtien.controller.Order;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.buiminhtien.Entity.OrderDetails;
import com.buiminhtien.Reponsitory.OrderDetailRepository;

@RestController
@CrossOrigin
public class OrderDetailController {
	@Autowired
	private OrderDetailRepository orderDetailRepository;

	@PostMapping("/order")
	public void Test(@RequestBody List<OrderDetails> myOrder) {
		orderDetailRepository.saveAll(myOrder);
	}
	// get list product order
		@GetMapping("/list_order/list_product/{id}")
		public List<OrderDetails> getListOrderDetail(@PathVariable(value = "id") String id) {
			return orderDetailRepository.getListOrderDetail(id);
		}
		@DeleteMapping("/order_detail/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteOrderDe(@PathVariable String id) {
			List<OrderDetails> orderDetail= orderDetailRepository.getListOrderDetail(id);

			orderDetailRepository.deleteAll(orderDetail);
			Map<String, Boolean> response = new HashMap<>();
			response.put("delete", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}


}