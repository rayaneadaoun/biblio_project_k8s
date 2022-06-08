package com.fges.book.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Collection;

@Data
@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String name;
    private String username;
    private String email;
    private Integer age;
    private String password;
    private Integer numberofBooks = 0;
    private Collection<Object> roles = new ArrayList<>();
    public String getAgeCategorie(){
        String categ = "";
        if(this.age <= 13){
            categ = "children";
        }
        else if (this.age <= 18){
            categ =  "teenage";
        }
        else categ =  "adult";
        return categ;
    }
}
