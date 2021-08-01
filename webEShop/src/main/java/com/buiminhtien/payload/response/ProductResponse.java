package com.buiminhtien.payload.response;


public class ProductResponse {
	private long id;
	
	private String title;

	private String price;

	private String price_sale;

	private String description;
	
	private String brands;

	private String material;

	private int amount;

	private String size;

	private String color;

	private String image;

	
	public ProductResponse() {
		super();
	}

	public ProductResponse(long id, String title, String price, String price_sale, String description, String brands,
			String material, int amount, String size, String color, String image) {
		super();
		this.id = id;
		this.title = title;
		this.price = price;
		this.price_sale = price_sale;
		this.description = description;
		this.brands = brands;
		this.material = material;
		this.amount = amount;
		this.size = size;
		this.color = color;
		this.image = image;
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

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getPrice_sale() {
		return price_sale;
	}

	public void setPrice_sale(String price_sale) {
		this.price_sale = price_sale;
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

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
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

}
