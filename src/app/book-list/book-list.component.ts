import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BookModel} from '../models/book.model';
import {BooksService} from '../services/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  bookSubscription: Subscription;
  books: BookModel[];
  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit() {
    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books: BookModel[]) => { this.books = books; });
    this.bookService.emitBooks();
  }
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }
  onDelete(book: BookModel) {
    if (confirm('Etes vous sure de vouloir supprimer ce livre de la bibliothèque en ligne ?')) {
      this.bookService.removeBook(book);
    }
  }
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  onEdit(id: number) {
    this.router.navigate(['/books', 'edit', id]);
  }
  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}
