package com.buiminhtien.Reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.buiminhtien.Entity.Slider;


@Repository
public interface SliderReponsitory extends JpaRepository<Slider, Long>  {

	
}
