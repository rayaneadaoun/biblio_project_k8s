package com.fges.book.controller;

import com.fges.book.BookNotFoundException;
import com.fges.book.UserIdNotFound;
import com.fges.book.entity.Book;
import com.fges.book.entity.BookAssignRequestDto;
import com.fges.book.entity.UserDTO;
import com.fges.book.service.BookService;


//import lombok.extern.slf4j.XSlf4j;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/books")
@Slf4j
//@XSlf4j
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/users")
    public List<Object> getUsers(){
        Object[] users = restTemplate.getForObject("http://USER-SERVICE/users", Object[].class);
        return Arrays.asList(users);
    }

    @PostMapping
    public Book saveBook(@RequestBody Book book){
        log.info("Inside saveBook method of BookController");
        return bookService.saveBook(book);
    }
    @GetMapping
    public List<Book> getAll(){
        return bookService.getAll();
    }

    @PutMapping("/id/{bookId}")
    public Book bookPrint(@PathVariable("bookId") Long bookId, @RequestBody BookAssignRequestDto bookAssign) throws Exception {
        String bookCateg = bookService.getBookById(bookId).getCategory();
        Long userId = bookAssign.getUserId();
        UserDTO user = restTemplate.getForObject("http://USER-SERVICE/api/id/" + userId, UserDTO.class);
        String userCateg = user.getAgeCategorie();
        Integer userNumberOfBooks = restTemplate.getForObject("http://USER-SERVICE/api/number-of-books/" + userId, Integer.class);
        boolean ahtorizeToGetBook = bookService.bookCategoriesCompare(userCateg, bookCateg);
        //If user does not already borrowed the book
        log.info("numberofbooks : {}", userNumberOfBooks);
        log.info("auth : {}", ahtorizeToGetBook);
        if (userNumberOfBooks < 3) {
            if (ahtorizeToGetBook) {
                    log.info("juste avant la merde");
                    boolean isKnown = bookService.getBookById(bookId).getUsersIds().containsKey(userId);
                    //log.info("isKnown : {}, isKnownAndIsActive : {}", isKnown, isKnownAndIsActive);
                    if (!isKnown) {
                        log.info("il a passé la validation freroww");
                        restTemplate.getForObject("http://USER-SERVICE/api/incr-number-of-books/" + userId, Integer.class);
                        return bookService.bookPrint(bookId, userId);
                    }
                    else {
                        boolean isKnownAndIsActive = bookService.getBookById(bookId).getUsersIds().get(userId);
                        if(!isKnownAndIsActive){
                            restTemplate.getForObject("http://USER-SERVICE/api/incr-number-of-books/" + userId, Integer.class);
                            return bookService.bookPrint(bookId, userId);
                        }
                    }
                }
            }
        return bookService.getBookById(bookId);
    }

    @PutMapping
    public Book update(@RequestBody Book book) throws BookNotFoundException {
        return bookService.updateBook(book);
    }
    @PutMapping("/return/id/{bookId}")
    public Book returnBook(@PathVariable("bookId") Long bookId ,@RequestBody BookAssignRequestDto bookAssign) throws Exception{
        Long userId = bookAssign.getUserId();
        UserDTO user = restTemplate.getForObject("http://USER-SERVICE/api/id/" + userId, UserDTO.class);
        restTemplate.getForObject("http://USER-SERVICE/api/decr-number-of-books/" + userId, Integer.class);
        Book book = bookService.getBookById(bookId);
        Map<Long, Boolean> newUserIds = book.getUsersIds();
        newUserIds.put(userId, false);
        Book newBook = new Book(book.getBookId(), book.getName(), book.getCategory(), newUserIds);
        update(newBook);
        return newBook;
    }

    @GetMapping("/id/{bookId}/users")
    public Object[] getUsersByBookId(@PathVariable("bookId") Long bookId) throws Exception, UserIdNotFound {
        Map<Long, Boolean> userIds = bookService.getBookById(bookId).getUsersIds();
        Set<Long> mySetIds = userIds.keySet();
        List<Long> myListIds = new ArrayList<>(mySetIds);
        if (!myListIds.isEmpty()) {
            String userIdsParsed = myListIds.stream().map(Object::toString)
                    .collect(Collectors.joining(","));
            return restTemplate.getForObject("http://USER-SERVICE/api/userIds/" + userIdsParsed, Object[].class);
        } else {
            return new Object[]{};
        }
    }

    @GetMapping("/userId/{userId}/books")
    public List<Book> getBooksByUserId(@PathVariable("userId") Long userId) throws UserIdNotFound {
        return bookService.getFilteredListOfBooks(bookService.getAll(), userId);
    }

    @GetMapping("/userId/{userId}/history")
    public List<Book> getBookHistoryForUser(@PathVariable("userId") Long userId) throws UserIdNotFound {
        return bookService.getPreviousBook(bookService.getAll(), userId);
    }

    @GetMapping("/id/{bookId}")
    public Book getBookById(@PathVariable("bookId") Long bookId ) throws Exception{
        //log.info("Inside findBookById method of BookController");
        return bookService.getBookById(bookId);
    }

    @GetMapping("/bookName/{bookName}")
    public Book getBookByName(@PathVariable String bookName) throws Exception {
        return bookService.getBookByName(bookName);
    }

    @GetMapping("searchForBookName/{bookId}")
    public String getBookNameByBookId(@PathVariable Long bookId) throws Exception {
        return bookService.getBookNameByBookId(bookId);
    }



    @DeleteMapping(value="/delete/{bookId}")
    public String delete(@PathVariable Long bookId) throws Exception {
        Book toDelete = bookService.getBookById(bookId);
        log.info("Book to delete : {}" ,toDelete.getName());
        bookService.deleteBookById(bookId);
        log.info("book to delete has id : {}, name of book : {}", toDelete.getBookId(), toDelete.getName());
        return "BookId : "  + toDelete.getBookId() + "\nName of book : "+ toDelete.getName();
    }

}
