package com.springboot.banking_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.banking_system.model.PanCardImage;

@Repository
public interface PanCardImageRepository extends JpaRepository<PanCardImage, Integer>{

}
