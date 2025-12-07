import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        // bookService.query().then(setBooks)
        bookService.query().then(books => {
            console.log('books:', books)
            setBooks(books)
        })
    }, [])

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <BookList books={books} onRemoveBook={onRemoveBook} onSelectBookId={onSelectBookId} />
        </section>
    )
}