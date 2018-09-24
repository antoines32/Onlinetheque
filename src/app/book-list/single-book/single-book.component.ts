import { Component, OnInit } from '@angular/core';
import {BookModel} from '../../models/book.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  book: BookModel;
  constructor(private router: Router, private route: ActivatedRoute, private booksService: BooksService) { }

  ngOnInit() {
    this.book = new BookModel('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(id).then(
      (book: BookModel) => {
        this.book = book;
      }
    );
  }
  onBack() {
    this.router.navigate(['/books']);
  }
}
