package com.springboot.banking_system.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.banking_system.dto.CustomerDto;
import com.springboot.banking_system.enums.Role;
import com.springboot.banking_system.exception.ResourceNotFoundException;
import com.springboot.banking_system.model.AadharCardImage;
import com.springboot.banking_system.model.Account;
import com.springboot.banking_system.model.Customer;
import com.springboot.banking_system.model.PanCardImage;
import com.springboot.banking_system.model.ProfilePhoto;
import com.springboot.banking_system.model.User;
import com.springboot.banking_system.repository.AadharCardImageRepository;
import com.springboot.banking_system.repository.CustomerRepository;
import com.springboot.banking_system.repository.PanCardImageRepository;
import com.springboot.banking_system.repository.ProfilePhotoRepository;
import com.springboot.banking_system.repository.UserRepository;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AadharCardImageRepository aadharCardImageRepository;
	
	@Autowired
	private PanCardImageRepository panCardImageRepository;
	
	@Autowired
	private ProfilePhotoRepository profilePhotoRepository;
	
	Logger logger = LoggerFactory.getLogger(CustomerService.class);

	public Customer insert(Customer customer){
		
		User user = customer.getUser();
		user.setRole(Role.CUSTOMER);
		String encPassword = passwordEncoder.encode(user.getPassword());
		 
		user.setPassword(encPassword);
		user = userRepository.save(user); //complete user with role, password and id
		
		customer.setUser(user);
		
		return customerRepository.save(customer);
			
		}
		

	public Customer validate(int cid) throws ResourceNotFoundException {
		
		Optional<Customer>optional = customerRepository.findById(cid);
		
		if(optional.isEmpty()) {
			throw new ResourceNotFoundException("Given id is invalid try again...");
		}
		
		Customer customer = optional.get();
		
		return customer;
		
		
	}

	public void delete(int id) {
		customerRepository.deleteById(id);
		
	}

	public List<Customer> getCustomerDetail(int id) {
		return customerRepository.getCustomerDetail(id);
	}


	public boolean customerDetailsExist(int id) {
		
		Optional<Customer>optional = customerRepository.findById(id);
		if(optional.isEmpty())
			return true;
		return false;
	}

	
	// api related to front - end

	public Customer getCustomerDetailByUsername(String username) {
		return customerRepository.getCustomerDetailByUsername(username);
	}


	public List<Account> getAllAccountsByUsername(String username) {
		return customerRepository.getAllAccountsByUsername(username);
	}


	public Customer updateCustomer(Customer newCustomer) {
		
		return customerRepository.save(newCustomer);
	}


	public Customer findCustomerByUsername(String username) {
		
		return customerRepository.findCustomerByUsername(username);
	}


	public Customer updateCustomerDetails(Customer customer, CustomerDto newCustomer) {
		
		if(newCustomer.getFirstName()!=null)
			customer.setFirstName(newCustomer.getFirstName());
		if(newCustomer.getLastName()!=null)
			customer.setLastName(newCustomer.getLastName());
		if(newCustomer.getDateOfBirth()!=null)
			customer.setDateOfBirth(newCustomer.getDateOfBirth());
		if(newCustomer.getContactNumber()!=null)
			customer.setContactNumber(newCustomer.getContactNumber());
		if(newCustomer.getAddress()!=null)
			customer.setAddress(newCustomer.getAddress());
		
		return customerRepository.save(customer);
		
	}


	public Customer getCustomerDetailsByAccount(String accountNumber) {
	return customerRepository.getCustomerDetailsByAccount(accountNumber);
	}


	public AadharCardImage uploadAadharCardImage(int cid, MultipartFile file) throws IOException, ResourceNotFoundException {
		
		String location = "C:/Users/vibho/OneDrive/Desktop/angular/banking-system-app/public/images/aadhar-card";
		
		Path path = Path.of(location,file.getOriginalFilename());
		
		try {
			Files.copy( file.getInputStream(),path, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw e; 
		}
		
		Customer customer = null;
		
		try {
			customer = validate(cid);
		} catch (ResourceNotFoundException e) {
			throw e; 
		}
		
		AadharCardImage aci = new AadharCardImage();
		aci.setCusomer(customer);
		aci.setFileName(file.getOriginalFilename());
		aci.setPath(path.toString());
		return aadharCardImageRepository.save(aci);
		
		
	}


	public PanCardImage uploadPanCardImage(int cid, MultipartFile file) throws ResourceNotFoundException, IOException {
		
		String location = "C:/Users/vibho/OneDrive/Desktop/angular/banking-system-app/public/images/pan-card";
		
		Path path = Path.of(location,file.getOriginalFilename());
		
		try {
			Files.copy( file.getInputStream(),path, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw e; 
		}
		
		Customer customer = null;
		
		try {
			customer = validate(cid);
		} catch (ResourceNotFoundException e) {
			throw e; 
		}
		
		PanCardImage pci = new PanCardImage();
		pci.setCusomer(customer);
		pci.setFileName(file.getOriginalFilename());
		pci.setPath(path.toString());
		return panCardImageRepository.save(pci);
		
	}


	public ProfilePhoto uploadProfilePhoto(int cid, MultipartFile file) throws IOException, ResourceNotFoundException {
		
		String location = "C:/Users/vibho/OneDrive/Desktop/angular/banking-system-app/public/images/profile-photo";
		
Path path = Path.of(location,file.getOriginalFilename());
		
		try {
			Files.copy( file.getInputStream(),path, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			throw e; 
		}
		
		Customer customer = null;
		
		try {
			customer = validate(cid);
		} catch (ResourceNotFoundException e) {
			throw e; 
		}
		
		ProfilePhoto pp = new ProfilePhoto();
		pp.setCusomer(customer);
		pp.setFileName(file.getOriginalFilename());
		pp.setPath(path.toString());
		return profilePhotoRepository.save(pp);
	}
	
	


}
