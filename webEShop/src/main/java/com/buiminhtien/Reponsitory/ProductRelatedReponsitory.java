package com.buiminhtien.Reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.buiminhtien.Entity.ProductRelated;

@Repository
public interface ProductRelatedReponsitory extends JpaRepository<ProductRelated, Long> {

}
