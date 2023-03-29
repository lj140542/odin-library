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
library.toString = function () {
  library.forEach(function (book) {
    console.log(book.info());
  });
};

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false);
library.toString();

