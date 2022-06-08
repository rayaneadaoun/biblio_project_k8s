package com.fges.comment.entity;

import javax.persistence.*;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commentId;
    private String content;
    private float grade;
    private Long userId;
    private Long bookId;
    public void setGrade(float grade){
        if(grade < 0 || grade > 10 ){
            throw new IllegalArgumentException(grade + "is not a valid grade, please use a notation between 0 and 10");
        }
        this.grade = grade;
    }
}