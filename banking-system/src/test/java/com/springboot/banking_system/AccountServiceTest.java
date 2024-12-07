package com.springboot.banking_system;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.springboot.banking_system.enums.BondType;
import com.springboot.banking_system.enums.InvestmentType;
import com.springboot.banking_system.enums.TransactionType;
import com.springboot.banking_system.exception.ResourceNotFoundException;
import com.springboot.banking_system.model.Account;
import com.springboot.banking_system.model.Bonds;
import com.springboot.banking_system.model.Card;
import com.springboot.banking_system.model.Customer;
import com.springboot.banking_system.model.FixedDeposit;
import com.springboot.banking_system.model.Investment;
import com.springboot.banking_system.model.Loan;
import com.springboot.banking_system.model.MutualFunds;
import com.springboot.banking_system.model.Transaction;
import com.springboot.banking_system.repository.AccountRepository;
import com.springboot.banking_system.repository.BondsRepository;
import com.springboot.banking_system.repository.CardRepository;
import com.springboot.banking_system.repository.CustomerRepository;
import com.springboot.banking_system.repository.FixedDepositRepository;
import com.springboot.banking_system.repository.InvestmentRepository;
import com.springboot.banking_system.repository.LoanRepository;
import com.springboot.banking_system.repository.MutualFundsRepository;
import com.springboot.banking_system.repository.TransactionRepository;
import com.springboot.banking_system.service.AccountService;

@SpringBootTest
public class AccountServiceTest {
	
	@InjectMocks
	private AccountService accountService;
	
	@Mock
	private AccountRepository accountRepository;
	@Mock
	private CustomerRepository customerRepository;
	
	@Mock
	private TransactionRepository transactionRepository;
	
	@Mock
	private LoanRepository loanRepository;
	
	@Mock
	private CardRepository cardRepository;
	
	@Mock
	private InvestmentRepository investmentRepository;
	
	@Mock
	private FixedDepositRepository fixedDepositRepository;
	
	@Mock
	private MutualFundsRepository mutualFundRepository;
	
	@Mock
	private BondsRepository bondsRepository;
	
	 private Account account;
	    private Customer customer;
	    private Transaction transaction;
	    private Loan loan;
	    private Card card;
	    private FixedDeposit fixedDeposit;
	    private MutualFunds mutualFunds;
	    private Bonds bonds;
	    private Investment investment;

	    @BeforeEach
	    public void setUp() {
	        customer = new Customer();
	        customer.setId(1);
	        customer.setAadharNumber("123456789012");
	        customer.setPanNumber("ABCDE1234F");

	        account = new Account();
	        account.setId(1);
	        account.setCustomer(customer);
	        account.setBalance(1000.0);
	        account.setStatus("Approved");

	        transaction = new Transaction();
	        transaction.setAccount(account);
	        transaction.setAmount(100.0);
	        transaction.setTransactionDate(LocalDate.now());
	        transaction.setTransactionType(TransactionType.DEPOSIT);

	        loan = new Loan();
	        loan.setAccount(account);
	        loan.setAmount(5000.0);

	        card = new Card();
	        card.setAccount(account);
	        card.setBalance(1000.0);
	        
	        investment = new Investment();
	        investment.setAccount(account);
	        investment.setType(InvestmentType.MUTUALFUNDS);

	        fixedDeposit = new FixedDeposit();
	        fixedDeposit.setDepositAmount(1000.0);
	        fixedDeposit.setYears(2);

	        mutualFunds = new MutualFunds();
	        mutualFunds.setFundName("Hexaware Index Fund");
	        mutualFunds.setPurchasePrice(50.0);

	        bonds = new Bonds();
	        bonds.setBondType(BondType.GOVERNMENT);
	        bonds.setFaceValue(1000.0);
	        bonds.setInterestRate(5.0);
	    }

	    @Test
	    public void insertAccountTest() {
	        when(customerRepository.findById(1)).thenReturn(Optional.of(customer));
	        when(accountRepository.save(account)).thenReturn(account);
	        when(customerRepository.save(customer)).thenReturn(customer);

	        Account newAccount = accountService.insert(account);

	        assertNotNull(newAccount);
	        assertEquals(account.getAccountNumber(), newAccount.getAccountNumber());

	        verify(customerRepository, times(1)).save(customer);
	        verify(accountRepository, times(1)).save(account);
	    }

	    
	    
	    @Test
	    public void getAccountDetailsTest() {
	        when(accountRepository.getAccountDetails(1)).thenReturn(Arrays.asList(account));

	        List<Account> accounts = accountService.getAccountDetails(1);

	        assertNotNull(accounts);
	        assertEquals(1, accounts.size());
	    }
 
	
	    @Test
	    public void validateIdAndAmountTest() throws ResourceNotFoundException {
	        when(accountRepository.findById(1)).thenReturn(Optional.of(account));

	        Account validatedAccount = accountService.validateIdAndAmount(1, 100.0);

	        assertNotNull(validatedAccount);
	        assertEquals(account, validatedAccount);
	    }

	    @Test
	    public void validateIdAndAmountAndBalanceTest() throws ResourceNotFoundException {
	        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
	        when(accountRepository.findByAccountNumber(anyString())).thenReturn(account);

	        Account validatedAccount = accountService.validateIdAndAmountAndBalance(1, 100.0, "123456");

	        assertNotNull(validatedAccount);
	        assertEquals(account, validatedAccount);
	    }
	    

	    @Test
	    public void validateTest() throws ResourceNotFoundException {
	        when(accountRepository.findById(1)).thenReturn(Optional.of(account));

	        Account validatedAccount = accountService.validate(1);

	        assertNotNull(validatedAccount);
	        assertEquals(account, validatedAccount);
	    }

	    @Test
	    public void insertUpdatedDataTest() {
	        when(accountRepository.save(account)).thenReturn(account);

	        Account updatedAccount = accountService.insertUpdatedData(account);

	        assertNotNull(updatedAccount);
	        assertEquals(account, updatedAccount);
	    }

	    @Test
	    public void getTransactionHistoryTest() {
	        when(transactionRepository.getTransactionHistory(1)).thenReturn(Arrays.asList(transaction));

	        List<Transaction> transactions = accountService.getTransactionHistory(1);

	        assertNotNull(transactions);
	        assertEquals(1, transactions.size());
	    }

	    @Test
	    public void getTransactionHistoryByAccountIdTest() {
	        Pageable pageable = PageRequest.of(0, 10);
	        when(transactionRepository.getTransactionHistoryByAccountId(1,pageable))
	                .thenReturn(new PageImpl<>(Arrays.asList(transaction)));

	        Page<Transaction> transactions = accountService.getTransactionHistoryByAccountId(1, pageable);

	        assertNotNull(transactions);
	        assertEquals(1, transactions.getContent().size());
	    }

	    @Test
	    public void getAccountByIdTest() {
	        when(accountRepository.getAccountById(1)).thenReturn(account);

	        Account accountById = accountService.getAccountById(1);

	        assertNotNull(accountById);
	        assertEquals(account, accountById);
	    }
	    
	    @Test
	    public void getLoanDetailsByAccountIdTest() {
	        Pageable pageable = PageRequest.of(0, 10);
	        when(loanRepository.getLoanDetailsByAccountId(1, pageable))
	                .thenReturn(new PageImpl<>(Arrays.asList(loan)));

	        Page<Loan> loans = accountService.getLoanDetailsByAccountId(1, pageable);

	        assertNotNull(loans);
	        assertEquals(1, loans.getContent().size());
	    }

	    @Test
	    public void getCardDetailsByAccountIdTest() {
	        when(cardRepository.getCardDetailsByAccountId(1)).thenReturn(Arrays.asList(card));

	        List<Card> cards = accountService.getCardDetailsByAccountId(1);

	        assertNotNull(cards);
	        assertEquals(1, cards.size());
	    }

	    @Test
	    public void applyForLoanTest() throws ResourceNotFoundException {
	        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
	        when(loanRepository.save(loan)).thenReturn(loan);

	        Loan newLoan = accountService.applyForLoan(loan, 1);

	        assertNotNull(newLoan);
	        assertEquals(loan, newLoan);
	    }

	    @Test
	    public void applyForCardTest() throws ResourceNotFoundException {
	        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
	        when(cardRepository.save(card)).thenReturn(card);

	        Card newCard = accountService.applyForCard(card, 1);

	        assertNotNull(newCard);
	        assertEquals(card, newCard);
	    }
	    
	    @Test
	    public void insertFDTest() {
	        when(accountRepository.findById(anyInt())).thenReturn(Optional.of(account));
	        when(investmentRepository.save(any(Investment.class))).thenReturn(new Investment());
	        when(fixedDepositRepository.save(any(FixedDeposit.class))).thenReturn(fixedDeposit);

	        FixedDeposit newFD = accountService.insertFD(fixedDeposit, 1);

	        assertNotNull(newFD);
	        assertEquals(fixedDeposit.getDepositAmount(), newFD.getDepositAmount());
	        assertEquals(fixedDeposit.getYears(), newFD.getYears());

	        verify(investmentRepository, times(1)).save(any(Investment.class));
	        verify(fixedDepositRepository, times(1)).save(fixedDeposit);
	    }

	    @Test
	    public void insertMutualFundTest() {
	        when(accountRepository.findById(anyInt())).thenReturn(Optional.of(account));
	        when(investmentRepository.save(any(Investment.class))).thenReturn(new Investment());
	        when(mutualFundRepository.save(any(MutualFunds.class))).thenReturn(mutualFunds);

	        MutualFunds newMutualFund = accountService.insertMutualFund(mutualFunds, 1);

	        assertNotNull(newMutualFund);
	        assertEquals(mutualFunds.getFundName(), newMutualFund.getFundName());
	        assertEquals(mutualFunds.getPurchasePrice(), newMutualFund.getPurchasePrice());

	        verify(investmentRepository, times(1)).save(any(Investment.class));
	        verify(mutualFundRepository, times(1)).save(mutualFunds);
	    }

	    @Test
	    public void insertBondsTest() {
	        when(accountRepository.findById(anyInt())).thenReturn(Optional.of(account));
	        when(investmentRepository.save(any(Investment.class))).thenReturn(new Investment());
	        when(bondsRepository.save(any(Bonds.class))).thenReturn(bonds);

	        Bonds newBonds = accountService.insertBonds(bonds, 1);

	        assertNotNull(newBonds);
	        assertEquals(bonds.getBondType(), newBonds.getBondType());
	        assertEquals(bonds.getFaceValue(), newBonds.getFaceValue());
	        assertEquals(bonds.getInterestRate(), newBonds.getInterestRate());

	        verify(investmentRepository, times(1)).save(any(Investment.class));
	        verify(bondsRepository, times(1)).save(bonds);
	    }
	    
	    

	    @Test
	    public void getInvestmentDetailsBasedFDTest() {
	        when(fixedDepositRepository.getInvestmentDetailsBasedFD(1, InvestmentType.FIXEDDEPOSITS))
	                .thenReturn(Arrays.asList(fixedDeposit));

	        List<FixedDeposit> fixedDeposits = accountService.getInvestmentDetailsBasedFD(1, InvestmentType.FIXEDDEPOSITS);

	        assertNotNull(fixedDeposits);
	        assertEquals(1, fixedDeposits.size());
	    }

	    @Test
	    public void getInvestmentDetailsBasedMUTUALFUNDSTest() {
	        when(mutualFundRepository.getInvestmentDetailsBasedMUTUALFUNDS(1, InvestmentType.MUTUALFUNDS))
	                .thenReturn(Arrays.asList(mutualFunds));

	        List<MutualFunds> mutualFundsList = accountService.getInvestmentDetailsBasedMUTUALFUNDS(1, InvestmentType.MUTUALFUNDS);

	        assertNotNull(mutualFundsList);
	        assertEquals(1, mutualFundsList.size());
	    }

	    @Test
	    public void getInvestmentDetailsBasedBONDTest() {
	        when(bondsRepository.getInvestmentDetailsBasedBOND(1,InvestmentType.BONDS))
	                .thenReturn(Arrays.asList(bonds));

	        List<Bonds> bondsList = accountService.getInvestmentDetailsBasedBOND(1, InvestmentType.BONDS);

	        assertNotNull(bondsList);
	        assertEquals(1, bondsList.size());
	    }


	
	

}
