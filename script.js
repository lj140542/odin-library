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