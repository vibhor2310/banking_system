import { Component } from '@angular/core';
import { CustomerService } from '../../../service/customer.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-customer',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './delete-customer.component.html',
  styleUrl: './delete-customer.component.css'
})
export class DeleteCustomerComponent {

  deleteForm: FormGroup;
  successMsg: string | undefined;
  errorMsg: string | undefined;

  constructor(private customerService:CustomerService){
    this.deleteForm = new FormGroup({

    })
  }

  onDelete(){

  }



}
