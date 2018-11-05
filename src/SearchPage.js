import React from 'react'
import {Link} from 'react-router-dom'
import { search} from './BooksAPI'
import BookItem from './BookItem'

class SearchPage extends React.Component {
    state = {
        query: '',
        books:[]
    }
    handleInputChange = (e) =>
    {
        clearTimeout(this.timer);
        let query = e.target.value.trim();
        let books = [];
        this.setState({query});
        this.timer = setTimeout(() => {
            
            if (query === "") {
                this.setState({books});
                return;
            }
            search(query).then(res =>
            {
                books = res;
                this.setState({books});
            },500)
        })
        
    }
    render() {
        return (
                <div className="search-books">
                  <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                      {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
                        <input type="text" placeholder="Search by title or author" onChange={this.handleInputChange} value={this.state.query}/>

                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                                    {this.state.books.length>0 && this.state.books.map(book=>(
                                        <BookItem key={book.id} book={book} shelves={this.props.shelves} changeShelf={this.props.changeShelf} shelf = {this.props.getShelf(book.id)} />
                                        
                                    ))}
                                </ol>
                  </div>
                </div>
            );
    }
    
}
export default SearchPage;
