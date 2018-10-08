import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {BookModel} from '../../models/book.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-form-edit',
  templateUrl: './book-form-edit.component.html',
  styleUrls: ['./book-form-edit.component.css']
})
export class BookFormEditComponent implements OnInit {
  book: BookModel;
  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  errorMessage: string;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private bookService: BooksService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.book = new BookModel('', '');
    const id = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(id).then(
      (book: BookModel) => {
        this.book = book;
      }
    );
    this.initForm(this.book);
  }
  initForm(id: BookModel) {
    this.bookForm = this.formBuilder.group(
      {
        title: [id.title, Validators.required],
        author: [id.autor, Validators.required],
        synopsis: id.synopsis
      });
  }
  onSaveBook() {
    this.bookService.removeBook(this.book);
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new BookModel(title, author);
    newBook.synopsis = synopsis;
    if (this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }
    this.bookService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

}
