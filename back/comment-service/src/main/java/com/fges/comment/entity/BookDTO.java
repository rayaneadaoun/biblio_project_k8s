package com.fges.comment.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Data
@Getter
@Setter
@NoArgsConstructor
public class BookDTO {
    private Long bookId;
    private String name;
    private String category;
    Map<Long, Boolean> usersIds;
}
