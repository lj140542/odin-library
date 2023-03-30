let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function addBookToLibrary(title, author, pages, read) {
  library.push(new Book(title, author, pages, read));
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
  let lib = document.getElementById('library');

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
  main.appendChild(title);
  main.appendChild(author);

  // creation of the other-info
  pages = document.createElement('span');
  pages.classList.add('pages');
  pages.textContent = this.pages;
  read = document.createElement('span');
  read.classList.add('read');
  read.textContent = this.read;
  other = document.createElement('div');
  other.classList.add('other-info');
  other.appendChild(pages);
  other.appendChild(read);

  book.appendChild(main);
  book.appendChild(other);
  lib.appendChild(book);
};

library.toString = function () {
  library.forEach(function (book) {
    console.log(book.info());
  });
};
library.display = function () {
  library.forEach(function (book) {
    book.display();
  });
};

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkien', '295', true);
addBookToLibrary('The Two Towers', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('The Return of the King', 'J.R.R. Tolkien', '295', false);
library.display();