package com.buiminhtien.Reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.buiminhtien.Entity.FeedBack;

@Repository
public interface FeedBackReponsitory extends JpaRepository<FeedBack, Long> {

}
