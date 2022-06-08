package com.fges.book.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Category {

    private Long categoryId;
    private enum categoryType {children, teen, adult};
}
