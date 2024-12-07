import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class CustomerService{

  private isPanUploaded = false;
  private isAadharUploaded = false;
  private isPhotoUploaded = false;
 
    private openAccountApi = 'http://localhost:8081/customer/account/add';

    private getCustomerDetailsApi = 'http://localhost:8081/customer/get/details';

    private getAccountsByUsernameApi = 'http://localhost:8081/customer/accounts/get';

    private updateCustomerDetailsApi = 'http://localhost:8081/customer/details/update';

     private getCustomerDetailsByAccountAPi='http://localhost:8081/customer/account'
  

    constructor(private httpClient:HttpClient){ } // injecting HttpClinet;

    openAccount(cid:any,obj:any):Observable<any>{
        let postObj ={  // this is to use so that exact structure of entity can be followed to avoid any errors or to not use dto in backend;
           accountType:obj.accountType,
           balance:obj.balance,
           aadharNumber:obj.aadharNumber,
           panNumber:obj.panNumber,
           customer:{ 
            firstName:obj.firstName,
            lastName:obj.lastName,
            dateOfBirth:obj.dateOfBirth,
            gender:obj.gender,
            contactNumber:obj.contactNumber,
            address:obj.address,
            email:obj.email,
             user:{
                    username: obj.username,
                    password: obj.password,
                    role:obj.role
             }
           }

           }
        const httpOptions = {
            headers: new HttpHeaders({
               Authorization: 'Bearer '+ localStorage.getItem('token')
            })
          };

          return this.httpClient.post(this.openAccountApi+'/'+cid,postObj,httpOptions)

    }


    getCustomerDetails(username:any):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
               Authorization: 'Bearer '+ localStorage.getItem('token')
            })
          };
          return this.httpClient.get(this.getCustomerDetailsApi+"?username="+username,httpOptions)

    }

    getAccountsByUsername(username:any):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
               Authorization: 'Bearer '+ localStorage.getItem('token')
            })
          };
          return this.httpClient.get(this.getAccountsByUsernameApi+"?username="+username,httpOptions);


    }

    updateCustomerDetails(customer:any,username:any):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
               Authorization: 'Bearer '+ localStorage.getItem('token')
            })
          };
          return this.httpClient.post(this.updateCustomerDetailsApi+"?username="+username,customer,httpOptions);

    }


    getCustomerDetailsByAccount(accountNumber:any):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
           Authorization: 'Bearer '+ localStorage.getItem('token')
        })
      };
        return this.httpClient.get(this.getCustomerDetailsByAccountAPi+"?accountNumber="+accountNumber,httpOptions);
    
      }

      uploadImageAadhar(formData: FormData, cid: any):Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
             Authorization: 'Bearer '+ localStorage.getItem('token')
          })
        };
        this.isAadharUploaded = true;
        return this.httpClient.post('http://localhost:8081/customer/aadhar-image/upload/'+ cid, formData,httpOptions)
    }

    uploadImagePan(formData: FormData, cid: any):Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
           Authorization: 'Bearer '+ localStorage.getItem('token')
        })
      };
      this.isPanUploaded = true;
      return this.httpClient.post('http://localhost:8081/customer/pan-image/upload/'+ cid, formData,httpOptions)
  }


  uploadImagePhoto(formData: FormData, cid: any):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
         Authorization: 'Bearer '+ localStorage.getItem('token')
      })
    };
    this.isPhotoUploaded = true;
    return this.httpClient.post('http://localhost:8081/customer/profile-photo/upload/'+ cid, formData,httpOptions)
}




  DocsUploaded(){
    return (this.isAadharUploaded&&this.isPanUploaded&&this.isPhotoUploaded);
  }
  



}