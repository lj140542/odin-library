
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    let ret = '';

    ret = this.title.toString() + ' by ' + this.author.toString() + ', ' + this.pages.toString() + ' pages, ';
    if (this.read == true) {
      ret += 'read';
    }
    else {
      ret += 'not read yet';
    }

    return ret;
  }

  display(rank) {
    let book, main, title, author, other, pages, read, img, div, del;

    // creation of the book
    book = document.createElement('div');
    book.classList.add('book');
    book.dataset.id = rank;

    // creation of the main-info 
    title = document.createElement('span');
    title.classList.add('title');
    title.textContent = this.title;
    author = document.createElement('span');
    author.classList.add('author');
    author.textContent = this.author;
    main = document.createElement('div');
    main.classList.add('main-info');
    main.append(title, author);

    // creation of the other-info
    pages = document.createElement('span');
    pages.classList.add('pages');
    pages.textContent = this.pages;
    div = document.createElement('div');
    div.classList.add('book-interface');
    del = document.createElement('span');
    del.classList.add('read');
    img = document.createElement('img');
    img.src = './img/delete-icon.png';
    img.dataset.id = rank;
    img.addEventListener('click', e => Controler.removeBook(e));
    del.append(img);
    read = document.createElement('span');
    read.classList.add('read');
    img = document.createElement('img');
    img.src = this.read == true ? './img/read-icon.png' : './img/not-read-icon.png';
    img.dataset.id = rank;
    img.addEventListener('click', e => Controler.swithReadStatus(e));
    read.append(img);
    div.append(del, read);
    other = document.createElement('div');
    other.classList.add('other-info');
    other.append(pages, div);

    book.append(main, other);
    lib.prepend(book);
  }
}

class Controler {
  static addBookToLibrary(title, author, pages, read) {
    library.push(new Book(title, author, pages, read));
  }
  static hideForm(e) {
    if (e == null) {
      bookSection.classList.remove('active');
      bookForm.reset();
      error.textContent = '';
      return;
    }
    if (e.target.form == undefined && e.target.classList[0] != 'ignore') {
      bookSection.classList.remove('active');
      bookForm.reset();
      error.textContent = '';
    }
  }
  static showForm() {
    bookSection.classList.add('active');
  }
  static clearLibrary() {
    let books = Array.from(document.getElementsByClassName('book'));
    books.forEach(book => book.remove());
  }
  static isPresent(element) {
    return (element.title == this);
  }
  static addBook(e) {
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let read = document.getElementById('read');

    if (title.value == '') {
      //error.textContent = 'Please fill out the Title field';
      return;
    }
    else if (library.findIndex(this.isPresent, title.value) != -1) {
      error.textContent = 'This book is already in the library';
      e.preventDefault();
      return;
    }
    if (author.value == '') {
      //error.textContent = 'Please fill out the Author field';
      return;
    }

    this.addBookToLibrary(title.value, author.value, pages.value, read.checked);
    this.clearLibrary();
    library.display();
    this.hideForm(null);
    e.preventDefault();
  }
  static swithReadStatus(e) {
    let bookId = e.target.dataset.id;
    if (bookId < 0 || bookId >= library.length) { return; }
    library[bookId].read = !library[bookId].read;
    e.target.src = library[bookId].read == true ? './img/read-icon.png' : './img/not-read-icon.png';
  }
  static removeBook(e) {
    let bookId = e.target.dataset.id;
    if (bookId < 0 || bookId >= library.length) { return; }
    library.splice(bookId, 1);
    this.clearLibrary();
    library.display();
  }

}

class Library extends Array {
  toString() {
    library.forEach(function (book) {
      console.log(book.info());
    });
  }
  display() {
    // sort books by title (reversed for display) 
    library.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return 1;
      }
      if (titleA > titleB) {
        return -1;
      }
      return 0;
    });
    library.forEach(function (book, rank) {
      book.display(rank);
    });
  }
}

let library = new Library();
let addBookButton = document.getElementById('add-book-button');
let addBookImg = document.getElementById('add-book-img');
let bookForm = document.getElementById('book-form');
let bookSection = document.getElementById('book-form-section');
let bookFormButton = document.getElementById('book-form-button');
let lib = document.getElementById('library');
let header = document.getElementsByTagName('header')[0];
let error = document.getElementById('error');

Controler.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false);
Controler.addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkien', '295', true);
Controler.addBookToLibrary('The Two Towers', 'J.R.R. Tolkien', '295', false);
Controler.addBookToLibrary('The Return of the King', 'J.R.R. Tolkien', '295', false);
Controler.addBookToLibrary('Alice in Wonderland', 'Lewis Carroll', '295', true);
Controler.addBookToLibrary('1984', 'George Orwell', '295', true);
library.display();

bookSection.addEventListener('click', e => Controler.hideForm(e));
addBookImg.addEventListener('click', e => Controler.showForm(e));
addBookButton.addEventListener('click', e => Controler.showForm(e));
bookFormButton.addEventListener('click', e => Controler.addBook(e));
