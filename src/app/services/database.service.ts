import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  addUserToDb(uid: string, name: string, username: string, country: string, bio: string, picture: string) {
    return this.db.object(`/users/${uid}`).set(
      {
        name: name,
        username: username,
        bio: bio,
        country: country,
        picture: picture
      }
    );
  }
}
