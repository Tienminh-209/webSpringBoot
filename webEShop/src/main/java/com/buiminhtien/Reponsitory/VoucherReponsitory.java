package com.buiminhtien.Reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.buiminhtien.Entity.Voucher;

@Repository
public interface VoucherReponsitory extends JpaRepository<Voucher, Long>  {

	
}
