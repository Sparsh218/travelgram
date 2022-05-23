import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp, faThumbsDown, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {

  @Input() post;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShareSquare = faShareSquare;

  upvote = 0;
  downvote = 0;
  user = null;

  constructor(
    private db: DatabaseService,
    private auth: AuthService,
    private changeRef: ChangeDetectorRef
  ) {
    this.auth.getUser().subscribe((user) => {
      this.user = user?.uid;
    });
   }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.post.vote) {
      Object.values(this.post.vote).map((value) => {
        if (value['vote']) {
          console.log(`true`);
          this.upvote += 1; 
        } else {
          console.log(`false`);
          this.downvote += 1;
        }
      });
      console.log(`${this.upvote} : ${this.downvote}`)
    }
  }

  votePost(vote: boolean) {
    this.db.votePost(vote, this.post.id, this.user);
    this.changeRef.detectChanges();
  }

  getInstaUrl() {

  }

}
