import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = [];
  posts = [];
  isLoading: boolean = true;

  constructor(
    private auth: AuthService,
    private db: DatabaseService,
    private router: Router
  ) {

    this.db.getUsersList().valueChanges().subscribe((object) => {
      if (object) {
        this.users = Object.values(object);
      }
    });

    this.db.getPostsList().valueChanges().subscribe((object) => {
      if (object) {
        this.posts = Object.values(object);
      }
    });

    this.isLoading = false;
    
   }

  ngOnInit(): void {
  }

}
