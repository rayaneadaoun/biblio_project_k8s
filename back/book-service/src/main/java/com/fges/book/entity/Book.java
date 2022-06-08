package com.fges.book.entity;

import javax.persistence.*;

import lombok.*;

import java.util.List;
import java.util.Map;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bookId;
    private String name;
    private String category;
    @ElementCollection
    @CollectionTable(name = "book_users_ids", joinColumns = @JoinColumn(name = "book_id"))
    Map<Long, Boolean> usersIds; // ids, liste vide à la creation
}
