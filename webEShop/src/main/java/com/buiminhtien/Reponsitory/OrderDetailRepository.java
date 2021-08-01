package com.buiminhtien.Reponsitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.buiminhtien.Entity.OrderDetails;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetails, Long> {

	@Query(value = "SELECT * FROM orderdetais where orderdetais.id_order=?1 ", nativeQuery = true)
	public List<OrderDetails> getListOrderDetail(String id);

}