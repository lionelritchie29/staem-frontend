import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder  
  ) { }

  errorMsg: string = '';

  adminLoginForm = this.fb.group({
    accountName: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
    
  }

  adminLogin(e: Event) {
    e.preventDefault();
    console.log("admin login");
  }

}
