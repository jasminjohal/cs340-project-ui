// sample book data
var books = {
    "books": [
        {"title": "To Kill a Mockingbird", "author": ["Harper Lee"], "genre": ["Classic", "Historical fiction"], "publisher": "Harper Perennial Modern Classics", "publishYear": 1960, "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg"},
        {"title": "To Sleep in a Sea of Stars", "author": ["Christopher Paolini"], "genre": ["Science fiction", "Fantasy"], "publisher": "Tor Books", "publishYear": 2020, "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1583523112l/48829708.jpg"},
        {"title": "Siddhartha", "author": ["Hermann Hesse", "Hilda Rosner"], "genre": ["Classic"], "publisher": "New Directions", "publishYear": 1922, "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1428715580l/52036.jpg"},
        {"title": "Pride and Prejudice", "author": ["Jane Austen"], "genre": ["Classic", "Romance"], "publisher": "Modern Library", "publishYear": 1813, "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885.jpg"},
        {"title": "Dracula", "author": ["Bram Stoker"], "genre": ["Classic", "Horror"], "publisher": "Norton", "publishYear": 1897, "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387151694l/17245.jpg"},
        {"title": "The Fellowship of the Ring", "author": ["J.R.R. Tolkien"], "genre": ["Classic", "Fantasy"], "publisher": "Ballantine Books", "publishYear": "1954", "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1486871542l/3263607._SY475_.jpg"}
    ]
};

// sample users data
var users = {
    "users": [
        {"username": "BookLover255", "firstName": "Sydney", "lastName": "Miller", "createDate": "10/10/2015", "booksReviewed": ["To Kill a Mockingbird", "To Sleep in a Sea of Stars", "Siddhartha"], "ratings": [5, 5, 5], "comments": ["Such a classic", "Gripping", "Enlightening"], "picture": "img/blank-profile-picture.png"},
        {"username": "Bibliophile255", "firstName": "John", "lastName": "Smith", "createDate": "03/04/2015", "booksReviewed": ["Dracula", "Pride and Prejudice"], "ratings": [4, 5], "comments": ["Spooky", "Classic romance"], "picture": "img/blank-profile-picture.png"},
        {"username": "IHeartBooks", "firstName": "Jane", "lastName": "Doe", "createDate": "07/02/2016", "booksReviewed": ["Pride and Prejudice", "The Fellowship of the Ring", "Siddhartha"], "ratings": [5, 5, 4], "comments": ["Lovely", "Fly you fools", "This book helped me achieve enlightenment"], "picture": "img/blank-profile-picture.png"},
        {"username": "Frankie_Cave", "firstName": "Frankie", "lastName": "Cave", "createDate": "11/01/2020", "booksReviewed": ["To Kill a Mockingbird", "To Sleep in a Sea of Stars", "The Fellowship of the Ring"], "comments": ["Required reading!", "Gripping", "Sam <3"], "ratings": [5, 5, 5], "picture": "img/blank-profile-picture.png"}
    ]
};

var genres = {
    "Science fiction": [],
    "Fantasy": [],
    "Mystery": [],
    "Thriller": [],
    "Crime": [],
    "Horror": [],
    "Historical fiction": [],
    "Romance": [],
    "Magical realism": [],
    "Classic": [],
    "Nonfiction": [],
    "Other": []
};

// fill in genres dictionary from books data
var numBooks = books["books"].length;
for (var i = 0; i < numBooks; i++) {
    var curGenres = books["books"][i]["genre"];
    var curBook = books["books"][i]["title"];
    for (var g = 0; g < curGenres.length; g++) {
        var curGenre = curGenres[g];
        genres[curGenre].push(curBook);
    }
}

// find the url associated with a given title by searching in books dictionary
function findBookCover(bookTitle) {
    for (var b = 0; b < books["books"].length; b++) {
        if (books["books"][b]["title"] == bookTitle) {
            var bookCover = books["books"][b]["cover"];
            console.log(bookCover);
            return bookCover;
        }
    }
}

/* books.html */
var addBookButton = document.getElementById('add-book-button');
var addBookForm = document.getElementById('add-book-form');
var bookDiv = document.getElementById('books');

function displayAllBooks() {
    for (var b = 0; b < books["books"].length; b++) {
        var curBook = books["books"][b];
        if (b == 0) {
            bookDiv.innerHTML += `
            <a href="sample-book.html">
                <img src='${curBook["cover"]}' class="img-fluid book-cover" alt="Book cover">
            </a>
            `   
        } else {
            bookDiv.innerHTML += `<img src='${curBook["cover"]}' class="img-fluid book-cover" alt="Book cover">`  
        }
    }
}

if (addBookButton) {
    addBookButton.addEventListener('click', function() {
        addBookForm.style.display = 'block';
    })
    displayAllBooks();
}

/* sample-book.html */
var sampleBookInfoDiv = document.getElementById('book-info');
var sampleBookDisplayDiv = document.getElementById('sample-book-display-div');

function sampleBookDisplay() {
    var sampleBook = books["books"][0];

    sampleBookInfoDiv.innerHTML += `
    <img src='${sampleBook["cover"]}' class='book-cover' /><br>
    <ul>
        <li>Title: ${sampleBook["title"]}</li>
        <li>Author(s): ${sampleBook["author"]}</li>
        <li>Date of Publication: ${sampleBook["publishYear"]}</li>
    </ul>`

    for (var u = 0; u < users["users"].length; u++) {
        var curUser = users["users"][u];
        var curIndex = curUser["booksReviewed"].indexOf(sampleBook["title"]);
        if (curIndex > -1) {
            var curRating = curUser["ratings"][curIndex];
            var curReview = curUser["comments"][curIndex];

            var starRating = '';
            for (var r = 0; r < curRating; r++) {
                starRating += '⭐';
            }
            sampleBookDisplayDiv.innerHTML += `
            <div class='rating row'>
                <ul>
                    <li>Review by: ${curUser["username"]}</li>
                    <li>Rating: ${starRating}</li>
                    <li>Review: <span class='review'>${curReview}</span></li>
                </ul>
            </div>
            <hr>
            `;
        } 
    }  
}

if (sampleBookInfoDiv && sampleBookDisplayDiv) {
    sampleBookDisplay();
}

/* genres.html */
var genreButtons = document.getElementsByClassName('genre-button');
var display = document.getElementById('book-display');

function genreDisplay() {
    display.innerHTML = '';
    var genre = this.innerHTML;

    if (genres[genre].length == 0) {
        display.innerHTML = 'No books found.';
    } else {
        for (var g = 0; g < genres[genre].length; g++) {
            var curBook = genres[genre][g];
            var curCover = findBookCover(curBook);
            display.innerHTML += `<img src='${curCover}' class='book-cover' />`
        }
    }
}

if (genreButtons) {
    for (var i = 0; i < genreButtons.length; i++) {
        genreButtons[i].addEventListener('click', genreDisplay, false);
    }
}

/* users.html */
var userDisplayDiv = document.getElementById('userDisplayDiv');

function userDisplay() {
    var numUsers = users["users"].length;

    for (var u = 0; u < numUsers; u++) {
        var curUser = users["users"][u];
        if (u == 0) {
            userDisplayDiv.innerHTML += `
            <div class="card" style="width: 15rem;">
                <img class="card-img-top img-fluid" src="${curUser["picture"]}" alt="Profile picture">
                <div class="card-body">
                    <h5 class="card-title">${curUser["username"]}</h5>
                    <p class="card-text">Books Reviewed: ${curUser["booksReviewed"].length}</p>
                    <a href="sample-user.html" class="btn btn-primary">View info</a>
                </div>
            </div>`
        } else {
            userDisplayDiv.innerHTML += `
            <div class="card" style="width: 15rem;">
                <img class="card-img-top img-fluid" src="${curUser["picture"]}" alt="Profile picture">
                <div class="card-body">
                    <h5 class="card-title">${curUser["username"]}</h5>
                    <p class="card-text">Books Reviewed: ${curUser["booksReviewed"].length}</p>
                    <a href="#" class="btn btn-primary disabled">View info</a>
                </div>
            </div>`
        }
    }

}

if (userDisplayDiv) {
    userDisplay();
}

/* sample-user.html */
var sampleUserInfoDiv = document.getElementById('user-info');
var sampleUserDisplayDiv = document.getElementById('sample-user-display-div');

function sampleUserDisplay() {
    var sampleUser = users["users"][0];
    var sampleUserBooks = sampleUser["booksReviewed"];
    var sampleUserRatings = sampleUser["ratings"];
    var sampleUserReviews = sampleUser["comments"];
    console.log(sampleUser);

    sampleUserInfoDiv.innerHTML += `
    <img src='${sampleUser["picture"]}' class='user-pic' /><br>
    <ul>
        <li>Username: ${sampleUser["username"]}</li>
        <li>Name: ${sampleUser["firstName"]} ${sampleUser["lastName"]}</li>
        <li>User since: ${sampleUser["createDate"]}</li>
    </ul>`

    for (var b = 0; b < sampleUserBooks.length; b++) {
        var curBook = sampleUserBooks[b];
        var curCover = findBookCover(curBook);
        var curReview = sampleUserReviews[b];
        var curRating = sampleUserRatings[b];
        var starRating = '';
        for (var r = 0; r < curRating; r++) {
            starRating += '⭐';
        }

        sampleUserDisplayDiv.innerHTML += `
        <div class='rating row'>
            <div class='col-md-2'>
                <img src='${curCover}' class='book-cover-small' />
            </div>
            <div class='col'>
                <h4>${sampleUserBooks[b]}</h4>
                <p>Rating: ${starRating}</p>
                <p>Review: <span class='review'>${curReview}</span></p>
            </div>
            
            
            
        </div>
        <hr>
        `;
    }
}

if (sampleUserInfoDiv && sampleUserDisplayDiv) {
    sampleUserDisplay();
}

/* account.html */
/* WIP */

/* authors.html */
var authorForm = document.getElementById('author-form');

function displayAuthors(e) {
    var authorDisplayDiv = document.getElementById('author-display');
    authorDisplayDiv.innerHTML = '';

    e.preventDefault();

    var author = document.getElementById('author-input').value;

    for (var a = 0; a < books["books"].length; a++) {
        var curBook = books["books"][a];
        if (curBook["author"].includes(author)) {
            authorDisplayDiv.innerHTML += `
            <img src='${curBook["cover"]}' class='book-cover' />
            `
        }
    }

    if (authorDisplayDiv.innerHTML == "") {
        authorDisplayDiv.innerHTML = `No books found for <span class='text-danger'>${author}</span>`;
    }
}

if (authorForm) {
    authorForm.addEventListener('submit', displayAuthors);
}