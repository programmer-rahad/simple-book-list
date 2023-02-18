import { $, getBooks, confirmationMaking, tableDataShowHide,removeFromLocalStorage } from './utilities.js'

const inputTitle = $('#book-title');
const inputAuthor = $('#book-author');
const inputYear = $('#book-year');
const form = $('#todo-section form');
const submitButton = $('#todo-section form input[type=submit]')
const tableWrapper = $('.table-wrapper');
const table = $('.table-wrapper .table');
const clearButton = $('button.clear-btn');

let books = getBooks();


// Event: Document Load
document.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i < books.length; i++) {
        const { id, title, author, year } = books[i];
        appendRow(id, title, author, year)
    }
    tableDataShowHide(table);
});

// Function: Add Row
function appendRow(id, title, author, year) {
    const html = `        
        <div class="table-row" data-id="${id}">
            <div class="table-column">
                ${title}
            </div>
            <div class="table-column">
                ${author}
            </div>
            <div class="table-column">
                ${year}
            </div>
            <div class="table-column edit">
                Edit
            </div>
            <div class="table-column delete">
                Delete
            </div>
        </div>
    `;
    table.innerHTML += html;
}

// Form Submit Event
form.onsubmit = function () {
    const inputTitleValue = inputTitle.value.trim();
    const inputAuthorValue = inputAuthor.value.trim();
    const inputYearValue = inputYear.value.trim();

    if (!inputTitleValue || !inputAuthorValue || !inputYearValue) {
        alert('Please fill up all the fields');
    } else {
        const book = {
            title: inputTitleValue,
            author: inputAuthorValue,
            year: inputYearValue,
            id: Math.random()
        };
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
        appendRow(book.id, book.title, book.author, book.year);
        inputTitle.value = '';
        inputAuthor.value = '';
        inputYear.value = '';
        submitButton.value = "Add Book"
        tableDataShowHide(table);
    }

    event.preventDefault();
}

// Delete Book Row
table.addEventListener('click', function () {
    if (event.target.classList.contains('delete')) {
        const row = event.target.parentElement
        confirmationMaking(function () {
            row.remove();
            const id = +row.dataset.id;
            books = removeFromLocalStorage(id,books);
            tableDataShowHide(table);
        });

    }
});

// Clear All
clearButton.addEventListener('click', function () {
    confirmationMaking(function () {
        while (table.children[1]) {
            table.children[1].remove();
        }        
        books = [];
        localStorage.setItem('books',JSON.stringify(books));
        tableDataShowHide(table);
    })


});

// Edit Row
table.addEventListener('click', function () {
    if (event.target.classList.contains('edit')) {

        const row = event.target.parentElement

        confirmationMaking(function () {
            submitButton.value = 'Edit Book';
            row.remove();
            const id = +row.dataset.id;
            books = removeFromLocalStorage(id,books); 
            tableDataShowHide(table);
            inputTitle.value = row.children[0].innerText.trim();
            inputAuthor.value = row.children[1].innerText.trim();
            inputYear.value = row.children[2].innerText.trim();
        });


    }
});

