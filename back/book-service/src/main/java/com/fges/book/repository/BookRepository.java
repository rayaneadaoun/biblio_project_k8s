package com.fges.book.repository;


import com.fges.book.entity.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book , Long>{

    Optional<Book> findBookByBookId(Long bookId);
    Optional<Book> findByName(String name);

    //List<Long> findUserIdsByBookId(Long bookId);

}
