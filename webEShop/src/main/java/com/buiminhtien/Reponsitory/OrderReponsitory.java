package com.buiminhtien.Reponsitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.buiminhtien.Entity.Order;
@Repository
public interface OrderReponsitory extends JpaRepository<Order, Long>  {
//get-all-order
	@Query(value="SELECT * FROM orders where orders.user_id=?1 ", nativeQuery = true)
	public List<Order> ListOrder(Long id);
	//get-order
	@Query(value="SELECT * FROM orders where orders.id_order=?1 ", nativeQuery = true)
	public Order getOrder(String id);
	//get-info-user-by-id
	@Query(value="SELECT * FROM orders where orders.id_order=?1 ", nativeQuery = true)
	public List<Order> ListInfoById(String id);
}
