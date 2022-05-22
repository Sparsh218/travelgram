import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.auth.getUser().subscribe((user) => {
      this.email = user?.email;
    })
   }

  ngOnInit(): void {
  }

  handleSignOut() {

    try {
      
      this.auth.signout();
      this.router.navigateByUrl('signin');
      this.toast.success("Log out success");
      this.email = null;

    } catch (error) {
      
      console.log(error);
      this.toast.error("Failed to logout");

    }

  }
}
