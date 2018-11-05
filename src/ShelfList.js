import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as Utils from './Utils'
import BookItem from './BookItem'

class BookList extends Component {

    render() {
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                {this.props.shelves.map((shelf,index) =>
                    this.props.getBooks(shelf).length>0 &&
                    (
                        <div className="bookshelf" key={index}>
                            <h2 className="bookshelf-title">{Utils.camel2title(shelf)}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.getBooks(shelf).map(book=>(
                                        <BookItem key={book.id} book={book} shelves={this.props.shelves} changeShelf={this.props.changeShelf} shelf = {book.shelf} />

                                    ))}
                                </ol>
                            </div>
                        </div>
                 ))}
                
                <div className="open-search">
                    <Link to="/Search">Search</Link>
                </div>
            </div>


)
}
}
export default BookList