class Book {
    constructor(id, title, description, author) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(bookInfo) {
        const id = this.generateId();
        const newBook = new Book(id, bookInfo.title, bookInfo.description, bookInfo.author);
        this.books.push(newBook);
        return newBook;
    }

    getBooks() {
        return this.books;
    }

    removeBookById(id) {
        this.books = this.books.filter(book => book.id !== id);
    }

    getBookById(id) {
        return this.books.find(book => book.id === id);
    }

    updateBookById(id, info) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            if (info.title !== undefined) {
                book.title = info.title;
            }
            if (info.description !== undefined) {
                book.description = info.description;
            }
            if (info.author !== undefined) {
                book.author = info.author;
            }
            return book;
        }
        return undefined;
    }

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

const library = new Library();

document.getElementById('add-book').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;

    if (title && description && author) {
        const newBook = library.addBook({ title, description, author });
        displayBooks();
        clearForm();
    }
});

function displayBooks() {
    const booksList = document.getElementById('books');
    booksList.innerHTML = '';

    const books = library.getBooks();
    books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.textContent = `${book.title} by ${book.author}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            library.removeBookById(book.id);
            displayBooks();
        });

        bookItem.appendChild(removeButton);
        booksList.appendChild(bookItem);
    });
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('author').value = '';
}

displayBooks();
