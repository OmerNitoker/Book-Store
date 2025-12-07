import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = {
    txt: '',
    maxPrice: 0
}

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getFilterBy,
    setFilterBy,
    getNextBookId
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= gFilterBy.maxPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) return storageService.put(BOOK_KEY, book)
    else return storageService.post(BOOK_KEY, book)
}

function getEmptyBook(title = '',  price = 0) {
    return { id: '', title, listPrice: {price} }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length -1) idx = -1
            return books[idx + 1].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('1984', 60))
        books.push(_createBook('The Catcher in the Rye', 80))
        books.push(_createBook('The Lord of the Rings', 89))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title = 'Book', price = 100) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    return book
}





