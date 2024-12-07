package com.springboot.banking_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.banking_system.enums.InvestmentType;
import com.springboot.banking_system.model.FixedDeposit;
import com.springboot.banking_system.model.MutualFunds;

@Repository
public interface MutualFundsRepository extends JpaRepository<MutualFunds, Integer>{

	@Query("select mf from MutualFunds mf join mf.investment i join i.account a where a.id = ?1 and i.type = ?2")
	List<MutualFunds> getInvestmentDetailsBasedMUTUALFUNDS(int aid, InvestmentType type);

}
