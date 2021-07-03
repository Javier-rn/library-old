let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(book) {
    const bookContainerDiv = document.createElement('div');
    bookContainerDiv.classList.add('bookContainer');

    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('id', 'title');
    const authorDiv = document.createElement('div');
    authorDiv.setAttribute('id', 'author');
    const cardBottomDiv = document.createElement('div');
    cardBottomDiv.setAttribute('id', 'cardBottom');

    const h2 = document.createElement('h2');
    h2.textContent = book.title;

    const h3 = document.createElement('h3');
    h3.textContent = book.author;

    const pagesDiv = document.createElement('div');
    pagesDiv.setAttribute('id', 'pages');
    const readStatusDiv = document.createElement('div');
    readStatusDiv.setAttribute('id', 'readStatus');

    const p1 = document.createElement('p');
    p1.textContent = `${book.pages} pages`;
    const p2 = document.createElement('p');
    if (book.read === 'true') {
        p2.textContent = 'Read';
    } else {
        p2.textContent = 'Not read';
    }

    const editIcon = document.querySelector('#protoSvg');
    const editIconClone = editIcon.cloneNode(true);
    editIconClone.removeAttribute('id');
    editIconClone.addEventListener('click', function () {
        p2.textContent === 'Not read' ? p2.textContent = 'Read' : 'Not read';
    });
    editIconClone.setAttribute('id', 'editIcon');

    pagesDiv.appendChild(p1);
    readStatusDiv.appendChild(p2);
    readStatusDiv.appendChild(editIconClone);

    cardBottomDiv.appendChild(pagesDiv);
    cardBottomDiv.appendChild(readStatusDiv);

    const cancelIcon = document.createElement('img');
    cancelIcon.setAttribute('src', 'cancelIcon.svg');
    titleDiv.appendChild(cancelIcon);
    titleDiv.appendChild(h2);
    authorDiv.appendChild(h3);

    bookContainerDiv.appendChild(titleDiv);
    bookContainerDiv.appendChild(authorDiv);
    bookContainerDiv.appendChild(cardBottomDiv);

    const allBooksDiv = document.querySelector('#allBooks');
    allBooksDiv.appendChild(bookContainerDiv);

    cancelIcon.addEventListener('click', function (e) {
        const answer = window.confirm('This book will be deleted. Are you sure?');
        if (answer === true) {
            bookContainerDiv.remove();
        }
    });
}

const addBookBtn = document.querySelector('#addBookBtn');
const form = document.querySelector('form');
const closeBtn = document.querySelector('#closeBtn');
const newBookBtn = document.querySelector('#addBtn');

addBookBtn.addEventListener('click', function (e) {
    e.preventDefault();
    form[0].value = '';
    form[1].value = '';
    form[2].value = '';
    form.classList.remove('invisible');
    form.classList.add('visible');
});

closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    form.classList.remove('visible');
    form.classList.add('invisible');
});


newBookBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const inputsRequired = document.querySelector('#inputsRequired');
    if (form.checkValidity() === false) {
        inputsRequired.classList.remove('invisible');
    } else {
        const title = form[0].value;
        const author = form[1].value;
        const pagesNumber = form[2].value;
        const readStatus = form[3].checked ? 'true' : 'false';
        const currentBook = new Book(title, author, pagesNumber, readStatus);
        addBookToLibrary(currentBook);
        displayBooks(currentBook);
        form[0].value = '';
        form[1].value = '';
        form[2].value = '';
        inputsRequired.classList.add('invisible');
    }
});