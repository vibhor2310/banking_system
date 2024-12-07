import { OpenBankAccountComponent } from './components/customer/open-bank-account/open-bank-account.component';
import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { DetailsComponent } from './pages/details/details.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CustomerDetailsComponent } from './components/customer/customer-details/customer-details.component';
import { UpdateCustomerComponent } from './components/customer/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './components/customer/delete-customer/delete-customer.component';
import { AccountsComponent } from './components/customer/accounts/accounts.component';
import { CustomerDashboardComponent } from './components/customer/customer-dashboard/customer-dashboard.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AccountDashboardComponent } from './components/account/account-dashboard/account-dashboard.component';
import { DepositComponent } from './components/account/deposit/deposit.component';
import { WithdrawComponent } from './components/account/withdraw/withdraw.component';
import { TransferComponent } from './components/account/transfer/transfer.component';
import { TransactionHistoryComponent } from './components/account/transaction-history/transaction-history.component';
import { LoanApplyComponent } from './components/account/loan-apply/loan-apply.component';
import { LoanDetailsComponent } from './components/account/loan-details/loan-details.component';
import { CardApplyComponent } from './components/account/card-apply/card-apply.component';
import { CardDetailsComponent } from './components/account/card-details/card-details.component';
import { InvestmentComponent } from './components/account/investment/investment.component';
import { FdComponent } from './components/account/investment/fd/fd.component';
import { MutualFundsComponent } from './components/account/investment/mutual-funds/mutual-funds.component';
import { BondsComponent } from './components/account/investment/bonds/bonds.component';
import { InvestmentDetailsComponent } from './components/account/investment-details/investment-details.component';
import { DocUploadComponent } from './components/customer/doc-upload/doc-upload.component';
import { AuthGuardService } from './service/auth-guard.service';
import { DocUploadGuard } from './service/doc-upload-guard.service';

export const routes: Routes = [
    {
        path:'', component:AuthPageComponent, children:[
            {
                path:'',component:HomePageComponent
            },
            {
                path:'sign-up',component:SignupPageComponent
            },
            {
                path:'login',component:LoginPageComponent
            }
        ]
    },
    {
        path:'customer',component:CustomerPageComponent,canActivate:[AuthGuardService],children:[
            {
                path:'',component:CustomerDashboardComponent
            },
            {
                path:'open-bank-account',component:OpenBankAccountComponent,canActivate:[DocUploadGuard]
            },
            {
                path:'customer-details',component:CustomerDetailsComponent
            },
            {
                path:'update-customer',component:UpdateCustomerComponent
            },
            {
                path:'delete-customer',component:DeleteCustomerComponent
            },
            {
                path:'accounts',component:AccountsComponent
            },
            {
                path:'doc-upload',component:DocUploadComponent
            }
            
        ]
    },
    {
        path:'account/:id',component:AccountPageComponent,canActivate:[AuthGuardService],children:[
            {
                path:'',component:AccountDashboardComponent
            },
            {
                path:'deposit',component:DepositComponent
            },
            {
                path:'withdraw',component:WithdrawComponent
            },
            {
                path:'transfer',component:TransferComponent
            },
            {
                path:'transaction-history',component:TransactionHistoryComponent
            },
            {
                path:'loan-apply',component:LoanApplyComponent
            },
            {
                path:'loan-details',component:LoanDetailsComponent
            },
            {
                path:'card-apply',component:CardApplyComponent
            },
            {
                path:'card-details',component:CardDetailsComponent
            },
            {
                path:'investment',component:InvestmentComponent
            },
            {
                path:'investment-details',component:InvestmentDetailsComponent
            },
            {
                path:'investment/fd',component:FdComponent
            },
            {
                path:'investment/mutual-funds',component:MutualFundsComponent
            },
            {
                path:'investment/bonds',component:BondsComponent
            }
        ]
    },
    // {
    //     path:'details',component:DetailsComponent
    // },
    {
        path:'about-page',component:AboutPageComponent     
    },
    {
        path:'**', component:PageNotFoundComponent
    }
];