import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class SearchBox extends React.Component {
  static propTypes = {
    onChangeHandler: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }

    this.updateQuery = this.updateQuery.bind(this)
  }

  updateQuery(query) {
    this.setState({ query }, this.props.onChangeHandler(query))
  }

  render () {
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={(e) => this.updateQuery(e.target.value)}
            value={this.state.query}
            placeholder="Search by title or author"
          />
        </div>
      </div>
    )
  }
}
