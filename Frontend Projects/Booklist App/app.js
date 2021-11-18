// Book Class: Represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        // Using this as dummy data - testing purposes
        // const  StoredBooks = [
        //     {
        //         title: 'Book One',
        //         author: 'John Doe',
        //         isbn: '8759462'
        //     },
        //     {
        //         title: 'Book Two',
        //         author: 'Jane Doe',
        //         isbn: '255225'
        //     }
        // ];
        const books = Store.getBooks();

        // Loop through the books 
        books.forEach(book => {
            UI.addBookToList(book);
        });
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        // We need to insert a tr into the list constant
        const row = document.createElement('tr');
        // We need to add columns into the row
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        // We need to append the row to the list
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        // Parent element 
        const container = document.querySelector('.container');
        // Sibling element
        const form = document.querySelector('#book-form');
        // Here we are saying add the div we created to the DOM before the form element
        container.insertBefore(div,form);
        // Set timeout to three sections
        setTimeout(() => {
            document.querySelector('.alert').remove();
        },3000);        
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: Handles storage (local)
// You can't store objects in local storage, only strings
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Events: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Events: To add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent default / prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate inputs
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all the fields', 'danger');
    }else {
    // Instantiate a book from the Book class
        const book = new Book(title, author, isbn);

    // Add Book to UI
        UI.addBookToList(book);

    // Add Book to storage
    // StoredBooks.addBook(book);
        Store.addBook(book);

    // show success message
        UI.showAlert('Book added successfully!', 'success');

    // Clear input fields after submit
        UI.clearFields();
    }
});

// Events: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove Book from the UI
    UI.deleteBook(e.target);
     // Remove book from the storage
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Alert to show the book has been removed
    UI.showAlert('Book deleted successfully!', 'warning');
   
});
