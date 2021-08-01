package com.buiminhtien.Entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "title")
	private String title;
	@Column(name = "price")
	private Double price;
	@Column(name = "discount")
	private String discount;
	@Column(name = "description")
	private String description;
	@Column(name = "brands")
	private String brands;
	@Column(name = "material")
	private String material;
	@Column(name = "amount")
	private int amount;
	@Column(name = "color")
	private String color;
	@Column(name = "image")
	private String image;
	@Column(name = "design")
	private String design;
	@Column(name = "cateid")
	private int cateid;
	//category
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "category_id")
//	@JsonIgnore
//	private Category category;
	
	// images-detail-product
//	@OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
//	@JoinColumn(name = "product_image",nullable = true)
//	private Set<ImageProduct> productimage=new HashSet<>();
//
//	// product-realted-product
//		@OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
//		@JoinColumn(name = "product_related")
//		private Set<ProductRelated> productrelate = new HashSet<>();

		@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
		@JoinColumn(name = "product_image",nullable = true)
		private Set<ImageProduct> productimage = new HashSet<>();
		
		@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
		@JoinColumn(name = "product_related")
		private Set<ProductRelated> productrelate = new HashSet<>();
	public Product() {
		// TODO Auto-generated constructor stub
	}
	
	

	public Product(long id) {
		super();
		this.id = id;
	}
	public Product(String title,String discount, Double price, String description, String brands, String material,
			int amount, String color, String image,String design,int cateid) {
		super();
		this.title = title;
		this.discount=discount;
		this.price = price;
	
		this.description = description;
		this.brands = brands;
		this.material = material;
		this.amount = amount;
	
		this.color = color;
		this.image = image;
		this.design = design;
		this.cateid = cateid;
	
	}

	public Product(long id, String title, Double price, String discount, String description, String brands,
			String material, int amount, String color, String image, String design, int cateid,
			Set<ImageProduct> productimage, Set<ProductRelated> productrelate) {
		super();
		this.id = id;
		this.title = title;
		this.price = price;
		this.discount = discount;
		this.description = description;
		this.brands = brands;
		this.material = material;
		this.amount = amount;
		this.color = color;
		this.image = image;
		this.design = design;
		this.cateid = cateid;
		this.productimage = productimage;
		this.productrelate = productrelate;
	}



	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDiscount() {
		return discount;
	}



	public void setDiscount(String discount) {
		this.discount = discount;
	}





	public Double getPrice() {
		return price;
	}



	public void setPrice(Double price) {
		this.price = price;
	}



	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBrands() {
		return brands;
	}

	public void setBrands(String brands) {
		this.brands = brands;
	}
	

	public String getMaterial() {
		return material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDesign() {
		return design;
	}



	public void setDesign(String design) {
		this.design = design;
	}



	public int getCateid() {
		return cateid;
	}

	public void setCateid(int cateid) {
		this.cateid = cateid;
	}

	public Set<ImageProduct> getProductimage() {
		return productimage;
	}

	public void setProductimage(Set<ImageProduct> productimage) {
		this.productimage = productimage;
	}

	public Set<ProductRelated> getProductrelate() {
		return productrelate;
	}

	public void setProductrelate(Set<ProductRelated> productrelate) {
		this.productrelate = productrelate;
	}

	

	

//	public Category getCategory() {
//		return category;
//	}
//
//	public void setCategory(Category category) {
//		this.category = category;
//	}
	
	
}
