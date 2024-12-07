import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class AuthService{
  

    private signUpApi = 'http://localhost:8081/auth/sign-up';

    private loginApi = 'http://localhost:8081/api/token';

    private userDetailsApi = 'http://localhost:8081/auth/user';

    private existApi = 'http://localhost:8081/exist';

    private registerCustomerApi = 'http://localhost:8081/customer/register';

    constructor(private httpClient:HttpClient){ } // injecting httpClient 

    // this will return a container to me
    signUp(user:any):Observable<any>{
        return this.httpClient.post(this.signUpApi,user);
    }

    login(user:any):Observable<any>{
        return this.httpClient.post(this.loginApi,user);
    }

    getUserDetails(token:any):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
               Authorization: 'Bearer '+ token
            })
          };
        return this.httpClient.get(this.userDetailsApi,httpOptions); 
    }

    customerDetailsExist(token:any){
        const httpOptions = {
            headers: new HttpHeaders({
               Authorization: 'Bearer '+ token
            })
          };
          return this.httpClient.get(this.existApi,httpOptions);
    }

    public registerCustomer(obj:any):Observable<any>{

        let postObj ={  // this is to use so that exact structure of entity can be followed to avoid any errors or to not use dto in backend;
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
                   role:'CUSTOMER'
            }
          }
           return this.httpClient.post(this.registerCustomerApi,postObj)
    }


   



}