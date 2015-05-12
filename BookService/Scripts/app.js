
var ViewModel = function () {
    var self = this;
    self.books = ko.observableArray();


    self.error = ko.observable();
    self.detail = ko.observable();
    self.bookSelected = ko.observable();
    self.bookSelectedSave = ko.observable();
    self.authors = ko.observableArray();
    self.author = ko.observable();

    self.newBook = {
        Author: ko.observable(),
        Genre: ko.observable(),
        Price: ko.observable(),
        Title: ko.observable(),
        Year: ko.observable()
    }
    //bookSelected = ({
    //    Id: null,
    //    AuthorName: null,
    //    AuthorId: null,
    //    Genre: null,
    //    Price: null,
    //    Title: null,
    //    Year: null,
    //    Author: ko.observable()
    //});



    var authorsUri = '/api/authors/';

    function getAuthors() {
        ajaxHelper(authorsUri, 'GET').done(function (data) {
            self.authors(data);
        });
    }
    getAuthors();

    self.addBook = function (formElement) {
        var book = {
            AuthorId: self.newBook.Author().Id,
            Genre: self.newBook.Genre(),
            Price: self.newBook.Price(),
            Title: self.newBook.Title(),
            Year: self.newBook.Year()
        };

        ajaxHelper(booksUri, 'POST', book).done(function (item) {
            self.books.push(item);
        });
    }
    self.updateBook = function (frmElement) {
        var book = {
            Id: self.bookSelected().Id,
            AuthorId: self.bookSelected().AuthorId,
            Genre: self.bookSelected().Genre,
            Price: self.bookSelected().Price,
            Title: self.bookSelected().Title,
            Year: self.bookSelected().Year
        };
        var bookDTO = {
            Id: self.bookSelected().Id,
            Title: self.bookSelected().Title,
            AuthorName: self.bookSelected().AuthorName
        }
        ajaxHelper(booksUri + self.bookSelected().Id, 'PUT', book).done(function (item) {

            getAllBooks();
            // self.books.slice(self.books.indexOf(self.bookSelectedSave()), 1, bookDTO);
            // self.books.valueHasMutated();
            //console.log(self.books.indexOf(self.bookSelectedSave()));
            //console.log(self.bookSelectedSave());
            //console.log(bookDTO);
        });
    }



    var booksUri = '/api/books/';

    self.editBookDetail = function (item) {
        ajaxHelper(booksUri + item.Id, 'GET').done(function (data) {

            self.bookSelected(data);
            self.bookSelectedSave(item);
            //console.log(item);
        });

    }

    self.getBookDetail = function (item) {
        ajaxHelper(booksUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }
    self.removeBook = function (item) {
        ajaxHelper(booksUri + item.Id, 'DELETE').done(function (data) {
            self.books.remove(item);
        });
    }



    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(function (data) {
            self.books(data);
        });
    }

    // Fetch the initial data.
    getAllBooks();
};

ko.applyBindings(new ViewModel());