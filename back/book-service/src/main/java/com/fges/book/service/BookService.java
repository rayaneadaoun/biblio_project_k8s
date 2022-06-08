package com.fges.book.service;
import com.fges.book.BookNotFoundException;
import com.fges.book.entity.Book;
import com.fges.book.entity.UserDTO;
import com.fges.book.repository.BookRepository;
import com.sun.source.tree.LambdaExpressionTree;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public boolean bookCategoriesCompare(String userCateg, String bookCateg){
        if(userCateg.equals("children")) {
            if (bookCateg.equals("children")) {
                return true;
            }
            return false;
        }
        else if(userCateg.equals("teen")){
            if(!bookCateg.equals("adult")){
                return true;
            }
            return false;
        }
        return true;
    }

    public Book saveBook(Book book) {
        log.info("Inside saveBook of BookService");
        return bookRepository.save(book);
    }

    public Book bookPrint(Long bookId, Long userId) throws Exception{
        Book book = bookRepository.findBookByBookId(bookId).orElseThrow(() -> new Exception("Book not found"));
        book.getUsersIds().put(userId, true);
        log.info("ajoute bien le userId a la liste dans book");
        return bookRepository.save(book);
    }
    /*public Book bookPrint(Long bookId, Long userId) throws Exception {
        return bookPrint(getBookById(bookId), userId);
    }*/

    /*public List<Long> getUsersIdsByBookId(Long bookId){
        return bookRepository.findUserIdsByBookId(bookId);
    }*/
    public List<Book> getAll(){
        return bookRepository.findAll();
    }

    public Book getBookByName(String name) throws Exception{
        return bookRepository.findByName(name).orElseThrow(() -> new Exception("Book not found"));
    }
    
    public Book getBookById(Long bookId) throws Exception{
        log.info("Inside getBookById of BookService");
        return bookRepository.findBookByBookId(bookId).orElseThrow(() -> new Exception("Book not found"));
    }

    public Book updateBook(Book book) throws BookNotFoundException {
        if(bookRepository.existsById(book.getBookId())) {
            return bookRepository.save(book);
        }
        throw new BookNotFoundException("Book does not exist ...");
    }

    public void deleteBookById(Long bookId) throws BookNotFoundException {
        if(bookRepository.existsById(bookId)) {
            log.info("inside correct condition, juste before deleting in book service");
            bookRepository.deleteById(bookId);
        } else {
            throw new BookNotFoundException("Book does not exist ...");
        }
    }

    public List<Book> getFilteredListOfBooks(List<Book> all, Long userId) {
        List<Book> filtered = new ArrayList<>();
        for(Book book : all){
            if(book.getUsersIds().containsKey(userId)) {
                if (book.getUsersIds().get(userId)) {
                    filtered.add(book);
                }
            }
        }
        return filtered;
    }

    public List<Book> getPreviousBook(List<Book> all, Long userId) {
        List<Book> filtered = new ArrayList<>();
        for(Book book : all){
            if(book.getUsersIds().containsKey(userId)) {
                if (!book.getUsersIds().get(userId)) {
                    filtered.add(book);
                }
            }
        }
        return filtered;
    }

    public String getBookNameByBookId(Long bookId) throws Exception{
        Book book = bookRepository.findBookByBookId(bookId).orElseThrow(() -> new Exception("Book not found"));
        return book.getName();
    }

    /*public List<Book> getBooksByUserId(Long userId) {
        return bookRepository.findAllBooksByUserIdInUserIdsBooks(userId);
    }*/
}


