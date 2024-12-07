import { Injectable } from "@angular/core";
import { CustomerService } from "./customer.service";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class DocUploadGuard implements CanActivate{

    status:any;
    constructor(private customerService:CustomerService,private router: Router){

        this.status = customerService.DocsUploaded();
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        console.log(this.status);
        
        if(this.status){
            return true;
        }
        this.router.navigateByUrl("/customer/doc-upload");
        return false;
    }

}