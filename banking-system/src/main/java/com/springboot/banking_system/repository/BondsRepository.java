package com.springboot.banking_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.banking_system.enums.InvestmentType;
import com.springboot.banking_system.model.Bonds;

@Repository
public interface BondsRepository extends JpaRepository<Bonds, Integer>{

	@Query("select b from Bonds b join b.investment i join i.account a where a.id=?1 and i.type=?2")
	List<Bonds> getInvestmentDetailsBasedBOND(int aid, InvestmentType type);

}
