import React from 'react'
import PropTypes from 'prop-types'
import Rating from 'react-rating-system'
import Star from './icons/star.png'

export default class Book extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    canonicalVolumeLink: PropTypes.string.isRequired,
    averageRating: PropTypes.number,
    ratingsCount: PropTypes.number,
    imageLinks: PropTypes.object,
    authors: PropTypes.array
  }

  static defaultProps = {
    authors: ['N/A'],
    averageRating: null,
    ratingsCount: null,
    imageLinks: null
  }

  constructor(props) {
    super(props)
    this.state = {
      shelf: this.props.shelf,
      message: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  onChangeHandler(event) {
    this.setState({
      shelf: event.target.value
    }, () => {
      this.props.onSelect({id: this.props.id}, this.state.shelf)

      let message
      switch (this.state.shelf) {
        case 'currentlyReading':
          message = 'Moved to Currently Reading'
          break
        case 'wantToRead':
          message = 'Saved to read later'
          break
        case 'read':
          message = 'Moved to Read'
          break
        case 'none':
          message = 'Removed from shelf'
          break
        default:
          message = ''
      }
      this.setState({message})
    })
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <a href={this.props.canonicalVolumeLink} title={this.props.title}>
              {this.props.imageLinks &&
                <div className="book-cover" title={this.props.title} style={{ width: 128, height: 188, backgroundImage: `url("${this.props.imageLinks.thumbnail}")` }}></div>
              }
            </a>
            <div className="book-shelf-changer">
              <select onChange={this.onChangeHandler} defaultValue={this.state.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <a href={this.props.canonicalVolumeLink} title={this.props.title}>
            <div className="book-title">{this.props.title}</div>
          </a>
          <div className="book-authors">{this.props.authors && this.props.authors.join(', ')}</div>
          <div className="book-rating">
            {this.props.ratingsCount &&
              <Rating
                image={Star}
                fillBG="#83B375"
                editable={false}
                initialValue={this.props.averageRating}
                containerStyle={{ maxWidth: '100px' }}
              />
            }
            <span>{this.props.ratingsCount}</span>
          </div>
          <div className="book-message">{this.state.message}</div>
        </div>
      </li>
    )
  }
}
