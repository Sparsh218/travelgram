import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    const {email, password} = form.form.value;

    this.auth.signin(email, password).then((res) => {

      this.router.navigateByUrl('');
      this.toast.success("Login success");

    }).catch((err) => {

      this.toast.error("Login failed");
      
    });

  }

}
