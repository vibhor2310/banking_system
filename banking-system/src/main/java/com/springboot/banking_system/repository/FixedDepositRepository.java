package com.springboot.banking_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.banking_system.enums.InvestmentType;
import com.springboot.banking_system.model.FixedDeposit;

@Repository
public interface FixedDepositRepository extends JpaRepository<FixedDeposit, Integer>{

	@Query("select fd from FixedDeposit fd join fd.investment i join i.account a where a.id=?1 and i.type=?2")
	List<FixedDeposit> getInvestmentDetailsBasedFD(int aid, InvestmentType type);

}
