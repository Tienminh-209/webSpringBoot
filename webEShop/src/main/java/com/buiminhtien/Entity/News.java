package com.buiminhtien.Entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "news")
public class News {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "title")
	private String title;
	
	@Column(name = "description")
	private String description;
	@Column(name = "description_short")
	private String description_short;
	@Column(name = "image")
	private String image;
	@Column(name = "category_new")
	private int category_new;
	@Column(name = "date")
	private String date;
	

	public News() {
		// TODO Auto-generated constructor stub
	}

	public News(String title, String description,int category_new,String date,String image,String description_short) {
		super();
		this.title = title;
		this.description = description;
		this.category_new = category_new;
		this.date = date;
		this.image=image;
		this.description_short=description_short;
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



	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getCategory_new() {
		return category_new;
	}

	public void setCategory_new(int category_new) {
		this.category_new = category_new;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription_short() {
		return description_short;
	}

	public void setDescription_short(String description_short) {
		this.description_short = description_short;
	}

	
	
	
}
