function $(selector, areAll) {
    return areAll ? document.querySelectorAll(selector) : document.querySelector(selector)
}

function getBooks() {
    const temp = localStorage.getItem('books');
    return temp ? JSON.parse(temp) : [];
}

function confirmationMaking(callback) {
    // confirmation making
    const confirmation = document.createElement('div');
    confirmation.classList.add('confirmation');
    confirmation.innerHTML = ` 
         <button>yes</button>
         <button>no</button> 
     `
    document.body.prepend(confirmation);


    confirmation.addEventListener('click', function () {
        const text = event.target.textContent;
        if (text === 'yes' || text === 'no') {
            if (text === 'yes') {
                callback();
            }
            this.remove();
        }
    });

}

function removeFromLocalStorage(id,books) {
    const newBooks = [];
    for (let i = 0; i < books.length; i++) {
        if (books[i].id !== id) {
            newBooks.push(books[i]);
        }
    }
    localStorage.setItem('books', JSON.stringify(newBooks));
    return newBooks;
}

const tableDataShowHide = function (table) {
    if (table.children.length < 2) {
        table.parentElement.style.display = 'none'
    } else {
        table.parentElement.style.display = 'block'
    }
}

export { $, getBooks, confirmationMaking, tableDataShowHide,removeFromLocalStorage };
