package com.springboot.banking_system;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.springboot.banking_system.dto.ResponseMessageDto;
import com.springboot.banking_system.exception.ResourceNotFoundException;
import com.springboot.banking_system.service.AccountService;

@ControllerAdvice
public class GlobalExceptionHandler {

	@Autowired
	private ResponseMessageDto dto;
	
	Logger logger = LoggerFactory.getLogger(AccountService.class);

	@ExceptionHandler(ResourceNotFoundException.class)
	ResponseEntity<?> handleResourceNotFoundException(Exception e) {
		dto.setMsg(e.getMessage());
		 logger.error("ResourceNotFoundException thrown " + dto.getMsg());
		return ResponseEntity.badRequest().body(dto);
	}
	

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleGeneralException(Exception e) {
		dto.setMsg(e.getMessage());
		 logger.error("Exception thrown " + dto.getMsg());
		return ResponseEntity.badRequest().body(dto);
	}
	
	
}