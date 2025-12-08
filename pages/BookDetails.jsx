import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ onBack, bookId }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId).then(setBook)
    }, [])

    if(!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <div className="details">
            <h1>{book.title}</h1>
            <h2>by {book.authors[0]}</h2>
            <h3>published: {book.publishedDate}</h3>
            <h3>{book.pageCount} pages</h3>
            {book.listPrice.isOnSale ? <h3>In Stock - {book.listPrice.amount} {book.listPrice.currencyCode}</h3> : <h3>Out of Stock</h3>}
            <h3>description:</h3>
            <p>{book.description}</p>
            <button onClick={onBack}>Back</button>
            </div>
            <img src={book.image} alt="" />
        </section>
    )
}