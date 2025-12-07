
export function BookPreview({book}) {
    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <img src={book.image} alt="" />
            <h4>Price: {book.listPrice.amount}</h4>
        </article>
    )
}