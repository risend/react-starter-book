import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import Search from './Search'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchPage: false,
      books: []
    }

    this.onSelectHandler = this.onSelectHandler.bind(this)
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  onSelectHandler(book, shelf) {
    BooksAPI.update(book, shelf).then((res) => {
      this.getBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <Search
            onSelectHandler={this.onSelectHandler}
            books={this.state.books}
          />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>Personal Book Tracker</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter((book) => book.shelf === 'currentlyReading' )
                        .map((book) => (
                          <Book
                            id={book.id}
                            title={book.title}
                            authors={book.authors}
                            averageRating={book.averageRating}
                            ratingsCount={book.ratingsCount}
                            canonicalVolumeLink={book.canonicalVolumeLink}
                            imageLinks={book.imageLinks}
                            shelf={book.shelf}
                            key={book.id}
                            onSelect={this.onSelectHandler}
                          />
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter((book) => book.shelf === 'wantToRead' )
                        .map((book) => (
                          <Book
                            id={book.id}
                            title={book.title}
                            authors={book.authors}
                            averageRating={book.averageRating}
                            ratingsCount={book.ratingsCount}
                            canonicalVolumeLink={book.canonicalVolumeLink}
                            imageLinks={book.imageLinks}
                            shelf={book.shelf}
                            key={book.id}
                            onSelect={this.onSelectHandler}
                          />
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books
                        .filter((book) => book.shelf === 'read' )
                        .map((book) => (
                          <Book
                            id={book.id}
                            title={book.title}
                            authors={book.authors}
                            averageRating={book.averageRating}
                            ratingsCount={book.ratingsCount}
                            canonicalVolumeLink={book.canonicalVolumeLink}
                            imageLinks={book.imageLinks}
                            shelf={book.shelf}
                            key={book.id}
                            onSelect={this.onSelectHandler}
                          />
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
