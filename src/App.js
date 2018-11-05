import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import SearchPage from './SearchPage'
import ShelfList from './ShelfList'
import './App.css'


class BooksApp extends React.Component {
    state = {
        books: [],
        shelves: ['currentlyReading','wantToRead','read']
    }

    componentDidMount() {
        BooksApi.getAll().then(books =>
        {
            this.setState( { books });
        });
    }
    getBooksFromShelf = (shelf) =>
    {
        return this.state.books.filter(book => book.shelf === shelf);
    }
    getShelfValue = (id) =>
    {
        let book = this.state.books.find(book => book.id === id);
        return book ? book.shelf : 'none';
    }
    doChangeShelf = (bookSelected,newShelf) =>
    {
        let bookExists = false;
        if (newShelf === 'none') {
            this.removeBook(bookSelected.id);
        } else {
            this.setState((state) =>
                ({
                    books: state.books.map(book =>
                    {
                        if (book.id === bookSelected.id) {
                            book.shelf = newShelf;
                            bookExists = true;
                        }
                        return book;
                    })

                }), () => {
                    bookSelected.shelf = newShelf;
                    !bookExists && this.addBook(bookSelected);
                })
            
        }
        BooksApi.update(bookSelected,newShelf)
    }
    addBook(book) {
        this.setState((state) =>
            ({books:  [...state.books, book]})
        );
    }
    removeBook(id)
    {
        this.setState((state) =>
            ({books:  state.books.filter(book => book.id !== id)})
        );
    }
    render() {
        return (
               <div className = "app">  
                    <Route path = "/" exact render = { () =>{
                        return <ShelfList shelves={this.state.shelves} getBooks={this.getBooksFromShelf} changeShelf={this.doChangeShelf}/> 
                    }} />
                    <Route path="/Search" render={()=>{
                    return <SearchPage changeShelf={this.doChangeShelf} shelves={this.state.shelves} getShelf={this.getShelfValue}/>
                    }} />  
               </div>
         )
    }
}

export default BooksApp