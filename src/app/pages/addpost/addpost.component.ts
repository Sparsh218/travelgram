import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';
import { finalize } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  locationName: string;
  picture: string = null;
  uploadPercent: number;
  description: string;
  userInfo = null;
  user = null;

  constructor(
    private db: DatabaseService,
    private storage: StorageService,
    private toast: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.getUser().subscribe((userInfo) => {
      this.userInfo = userInfo;
      this.db.getUserFromDb(userInfo.uid).valueChanges().subscribe(
        (user) => {
          this.user = user;
        }
      )
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {

    this.db.addPostToDb(
      this.description,
      this.locationName,
      this.picture,
      this.user.username,
      this.user.name,
      this.userInfo?.uid
    ).then((res) => {
      this.toast.success("Post added successfully");
      this.router.navigateByUrl("");
    }).catch((err) => {
      this.toast.error("Error in adding post");
    })
  }

  async uploadFile(event) {

    let file = event.target.files[0];
    let fileName = `${file.name}-${uuidv4()}`;

    let resizedImage = await this.storage.getResizedImage(file);

    let task = this.storage.uploadImage(resizedImage, fileName);
    
    task.percentageChanges().subscribe((percent) => {
      this.uploadPercent = percent;
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        this.storage.getFileReference(fileName).getDownloadURL().subscribe((url) => {
          this.picture = url;
        })
      })
    ).subscribe();
  }

}
