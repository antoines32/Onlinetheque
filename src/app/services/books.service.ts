import { Injectable } from '@angular/core';
import {BookModel} from '../models/book.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: BookModel[] = [];
  bookSubject = new Subject<BookModel[]>();
  constructor() {
    this.getBooks();
  }

  emitBooks() {
    this.bookSubject.next(this.books);
  }
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }
  getBooks() {
    firebase.database().ref('/books').on(
      'value', (data: DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
      );
  }
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: DataSnapshot) => { resolve(data.val()); }, (error) => {reject(error); }
        );
      }
    );
  }
  createNewBook(newBook: BookModel) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
  removeBook(removedBook: BookModel) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === removedBook) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.getDownloadURL());
          }
        );
      }
    );
  }
}



