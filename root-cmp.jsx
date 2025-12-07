const { useState } = React

import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"


export function App() {

    const [page, setPage] = useState('book')

    return (
        <section className="app main-layout">
            <header className="app-header">
                <h1>Miss Book</h1>
                <nav className="app-nav">
                    <a className={page === 'home' ? 'clicked' : ''} onClick={() => setPage('home')} href="#">Home</a>
                    <a className={page === 'about' ? 'clicked' : ''} onClick={() => setPage('about')} href="#">About</a>
                    <a className={page === 'book' ? 'clicked' : ''} onClick={() => setPage('book')} href="#">Books</a>
                </nav>
            </header>
            <main className="container">
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}