package com.buiminhtien.payload.response;

public class CategoryResponse {
	
	private long id;
	private String title;
	private String link;
	
	public CategoryResponse() {
		super();
	}
	public CategoryResponse(long id, String title,String link) {
		super();
		this.id = id;
		this.title = title;
		this.link = link;
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
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}

	
}
