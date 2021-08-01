package com.buiminhtien.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "voucher")
public class Voucher {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "idvoucher")
	private String idvoucher;
	@Column(name = "discount")
	private String discount;
	public Voucher() {
		// TODO Auto-generated constructor stub
	}

	public Voucher(String idvoucher, String discount) {
		super();
		this.idvoucher = idvoucher;
		this.discount = discount;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getIdvoucher() {
		return idvoucher;
	}

	public void setIdvoucher(String idvoucher) {
		this.idvoucher = idvoucher;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

}
