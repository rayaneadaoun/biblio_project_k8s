package com.userservice.userservice.service;

import com.userservice.userservice.UserNotFoundException;
import com.userservice.userservice.domain.Role;
import com.userservice.userservice.domain.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    List<User> getUsers();

    List<User> getUsersByIds(List<Long> userIds);

    User getUserById(Long userId) throws Exception;

    User updateUser(User user) throws UserNotFoundException;

    void deleteUserById(Long userId) throws UserNotFoundException;

    Integer incrNumberofBooksForUser(Long userId) throws Exception;

    Integer getNumberOfBooksByUserId(Long userId) throws Exception;

    Integer decrNumberofBooksForUser(Long userId) throws Exception;

}
