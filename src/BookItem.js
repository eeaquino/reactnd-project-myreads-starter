import React, { Component } from 'react'
import * as Utils from './Utils'

class BookItem extends Component {
    render() {
        return(
        <li key={this.props.book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:this.props.book.imageLinks && `url("${this.props.book.imageLinks.smallThumbnail}")` }}></div>
                    <div className="book-shelf-changer" >
                        <select value={this.props.shelf} onChange={(e) =>
                                                             {
                                                                this.props.changeShelf(this.props.book,e.target.value)
                                                             }}>
                            <option value="move" disabled>Move to...</option>
                            {this.props.shelves.map((shelfOption, index) =>
                                                             (
                                                                <option key={index} value={shelfOption} >{Utils.camel2title(shelfOption)}</option>
                                                             ))}
                            <option value="none">Remove</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors && this.props.book.authors.join(", ")}</div>
            </div>
        </li>
        )
    }
}
export default BookItem