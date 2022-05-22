import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  uploadPercent: number;
  image: string = "https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png";

  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    private storage: StorageService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    const {
      name,
      email,
      password,
      username,
      country,
      bio
    } = form.form.value;

    this.auth.signup(email, password)
    .then((res) => {
      const {uid} = res.user;
      this,this.database.addUserToDb(
        uid,
        name,
        username,
        country,
        bio,
        this.image
      );
    }).then(() => {

      this.router.navigateByUrl('/');
      this.toast.success('Sign up success');
    }).catch((error) => {
      console.log(error);
    });

  }

  async uploadFile(event) {

    let file = event.target.files[0];

    let resizedImage = await this.storage.getResizedImage(file);

    let task = this.storage.uploadImage(resizedImage, file.name);


    // this.storage.addImageToStorage(file, file.name);
    
    task.percentageChanges().subscribe((percent) => {
      this.uploadPercent = percent;
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        this.storage.getFileReference(file.name).getDownloadURL().subscribe((url) => {
          this.image = url;
        })
      })
    ).subscribe();

  }

}
