import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import SearchList from './SearchList'
import SearchBox from './SearchBox'

export default class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSelectHandler: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      results: []
    }

    this.searchQuery = this.searchQuery.bind(this)
  }

  searchQuery(query) {
    if (query.length > 0) {
      BooksAPI.search(query, 20).then((res) => {
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
          this.setState({ results: res })
        } else {
          this.setState({ results: null })
        }
      })
    } else {
      this.setState({ results: null })
    }
  }

  render () {
    return (
      <div className="search-books">
        <SearchBox
          onChangeHandler={this.searchQuery}
        />
        {this.state.results &&
          <SearchList
            results={this.state.results}
            onSelectHandler={this.props.onSelectHandler}
          />
        }
      </div>
    )
  }
}
