package com.userservice.userservice.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static javax.persistence.FetchType.EAGER;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String name;
    private String username;
    private String email;
    private Integer age;
    private String password;
    private Integer numberOfBooks = 0;
    @ManyToMany(fetch = EAGER)
    private Collection<Role> roles = new ArrayList<>();
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