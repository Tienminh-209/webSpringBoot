package com.buiminhtien.Reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.buiminhtien.Entity.ImageProduct;
@Repository
public interface ImageProductRepository extends JpaRepository<ImageProduct, Long>{

}
