package com.springboot.banking_system.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class PanCardImage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
    private String fileName;
	
	private String path;
	
	@ManyToOne
	private Customer cusomer;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Customer getCusomer() {
		return cusomer;
	}

	public void setCusomer(Customer cusomer) {
		this.cusomer = cusomer;
	}
	
	

}
