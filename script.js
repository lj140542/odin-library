let library = [];
let addBookButton = document.getElementById('add-book-button');
let addBookImg = document.getElementById('add-book-img');
let bookForm = document.getElementById('book-form');
let bookSection = document.getElementById('book-form-section');
let bookFormButton = document.getElementById('book-form-button');
let lib = document.getElementById('library');
let header = document.getElementsByTagName('header')[0];
let error = document.getElementById('error');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function addBookToLibrary(title, author, pages, read) {
  library.push(new Book(title, author, pages, read));
}
function hideForm(e) {
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
function showForm() {
  bookSection.classList.add('active');
}
function clearLibrary() {
  let books = Array.from(document.getElementsByClassName('book'));
  books.forEach(book => book.remove());
}
function isPresent(element) {
  return (element.title == this);
}
function addBook(e) {
  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let read = document.getElementById('read');

  if (title.value == '') {
    //error.textContent = 'Please fill out the Title field';
    return;
  }
  else if (library.findIndex(isPresent, title.value) != -1) {
    error.textContent = 'This book is already in the library';
    e.preventDefault();
    return;
  }
  if (author.value == '') {
    //error.textContent = 'Please fill out the Author field';
    return;
  }

  addBookToLibrary(title.value, author.value, pages.value, read.checked);
  clearLibrary();
  library.display();
  hideForm(null);
  e.preventDefault();
}

Book.prototype.info = function () {
  let ret = '';

  ret = this.title.toString() + ' by ' + this.author.toString() + ', ' + this.pages.toString() + ' pages, ';
  if (this.read == true) {
    ret += 'read';
  }
  else {
    ret += 'not read yet';
  }

  return ret;
};
Book.prototype.display = function () {
  let book, main, title, author, other, pages, read;

  // creation of the book
  book = document.createElement('div');
  book.classList.add('book');

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
  read = document.createElement('span');
  read.classList.add('read');
  read.textContent = this.read;
  other = document.createElement('div');
  other.classList.add('other-info');
  other.append(pages, read);

  book.append(main, other);
  lib.prepend(book);
};

library.toString = function () {
  library.forEach(function (book) {
    console.log(book.info());
  });
};
library.display = function () {
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
  library.forEach(function (book) {
    book.display();
  });
};

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkien', '295', true);
addBookToLibrary('The Two Towers', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('The Return of the King', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('Alice in Wonderland', 'Lewis Carroll', '295', true);
addBookToLibrary('1984', 'George Orwell', '295', true);
library.display();

bookSection.addEventListener('click', e => hideForm(e));
addBookImg.addEventListener('click', e => showForm(e));
addBookButton.addEventListener('click', e => showForm(e));
bookFormButton.addEventListener('click', e => addBook(e));