import { LongText } from "../cmps/LongText.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBooks()
    }, [params.bookId])

    function loadBooks() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <div className="details">
                <h1>{book.title}</h1>
                <h2>by {book.authors[0]}</h2>
                <h3>published: {book.publishedDate} {(2025 - book.publishedDate > 30 ? ' - Vintage!' : (book.publishedDate < 10 ? ' - New!' : ''))}</h3>
                <h3>{book.pageCount} pages - {book.pageCount > 500 ? 'Serius Reading!' : (book.pageCount > 200 ? 'Descent Reading' : 'Light Reading...')}</h3>
                {book.listPrice.isOnSale ? <h3>In Stock - <span className={book.listPrice.amount > 20 ? 'red' : (book.listPrice.amount < 15 ? 'green' : '')}>{book.listPrice.amount} {book.listPrice.currencyCode}</span></h3> : <h3>Out of Stock</h3>}
                <h3>description:</h3>
                <LongText text={book.description} />
                {/* <p>{book.description}</p> */}
                <button onClick={onBack}>Back</button>
            </div>
            {book.listPrice.isOnSale && <img className="sale-img" src="../imgs/sale.png" />}
            <img className="book-img" src={book.image} alt="" />
        </section>
    )
}