import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

export default class SearchList extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    onSelectHandler: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {this.props.results && this.props.results.map((book) => (
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
              onSelect={this.props.onSelectHandler}
            />
          ))}
        </ol>
      </div>
    )
  }
}
