package com.buiminhtien.controller.Home;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.buiminhtien.Entity.FeedBack;
import com.buiminhtien.Entity.Product;
import com.buiminhtien.Entity.Slider;
import com.buiminhtien.Entity.Voucher;
import com.buiminhtien.Reponsitory.FeedBackReponsitory;
import com.buiminhtien.Reponsitory.SliderReponsitory;
import com.buiminhtien.Reponsitory.VoucherReponsitory;

@RestController
@CrossOrigin
public class VoucherController {
	@Autowired
	private VoucherReponsitory voucherReponsitory;
	@Autowired
	private FeedBackReponsitory feedBackReponsitory;
	@Autowired
	private SliderReponsitory sliderReponsitory;

	@GetMapping("/voucher")
	public List<Voucher> getVoucher() {
		return voucherReponsitory.findAll();
	}
	@GetMapping("/feedback")
	Page<FeedBack> listProductNewsInPageOther(
			 @RequestParam Optional<Integer> page,
	         @RequestParam Optional<String> sortBy) {
		return feedBackReponsitory.findAll(
				PageRequest.of(
		                page.orElse(1),
		                10,
		                Sort.Direction.ASC, sortBy.orElse("id")
		                )
						);
			}

//Feed-back
	@PostMapping("/feedback")
	public FeedBack listFeedBack(@RequestBody FeedBack feedBack) {
		return feedBackReponsitory.save(feedBack);
	}//
	//
	@GetMapping("/slider")
	public List<Slider> getSlider() {
		return sliderReponsitory.findAll();
	}
}
