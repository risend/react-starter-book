import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'

export default class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }

    this.updateQuery = this.updateQuery.bind(this)
  }

  updateQuery(e) {
    this.setState({query: e.target.value}, this.searchQuery())
  }

  searchQuery() {
    if (this.state.query.length > 0) {
      BooksAPI.search(this.state.query, 20).then((res) => {
        if (!res.error) {
          res.forEach((book) => {
            book.shelf = 'none'
            this.props.books.find((own) => {
              if (book.id === own.id) {
                return book.shelf = own.shelf
              } else {
                return false
              }
            })
          })
          this.setState({results: res})
        }
      })
    }
  }

  compareShelf(searchId) {
    this.props.books.forEach((book) => {
      book.shelf = (book.id === searchId) ? book.shelf : "none"
    })
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={this.updateQuery} value={this.state.query} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          {/* TODO:
              1. Remove itself or provide feedback to where it was moved to
          */}
          <ol className="books-grid">
            {this.state.results && this.state.results.map((book) => (
              <BookList
                {...book}
                key={book.id}
                onSelect={this.props.onSelectHandler}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
