package com.userservice.userservice.service;

import com.userservice.userservice.UserNotFoundException;
import com.userservice.userservice.domain.Role;
import com.userservice.userservice.domain.User;
import com.userservice.userservice.repo.RoleRepo;
import com.userservice.userservice.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if(user == null){
            log.error("User not found in database");
            throw new UsernameNotFoundException("User not found in database");
        }
        else{
            log.info("User found in database: {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        log.info("Saving new user {} to database", user.getName() );
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new user {} to database", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        User user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public User getUser(String username) {
        log.info("Get user {}from database", username);
        return userRepo.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        log.info("Get all users");
        return userRepo.findAll();
    }

    public User getUserById(Long userId) throws Exception{
        return userRepo.findById(userId).orElseThrow(() -> new Exception("User not found"));
    }

    public List<User> getUsersByIds(List<Long> userIds){
        return userRepo.findByUserIdIn(userIds);
    }

    public User updateUser(User user) throws UserNotFoundException {
        if(userRepo.existsById(user.getUserId())) {
            return userRepo.save(user);
        }
        throw new UserNotFoundException("User does not exist ...");
    }

    public void deleteUserById(Long userId) throws UserNotFoundException {
        if(userRepo.existsById(userId)) {
            userRepo.deleteById(userId);
        } else {
            throw new UserNotFoundException("User does not exist ...");
        }
    }

    public Integer getNumberOfBooksByUserId(Long userId) throws Exception{
        User user = userRepo.findById(userId).orElseThrow(() -> new Exception("User not found"));
        return user.getNumberOfBooks();
    }

    public Integer incrNumberofBooksForUser(Long userId) throws Exception {
        User user = userRepo.findById(userId).orElseThrow(() -> new Exception("User not found"));
        user.setNumberOfBooks(user.getNumberOfBooks() + 1);
        return user.getNumberOfBooks();
    }

    public Integer decrNumberofBooksForUser(Long userId) throws Exception {
        User user = userRepo.findById(userId).orElseThrow(() -> new Exception("User not found"));
        if(user.getNumberOfBooks() > 0){
            user.setNumberOfBooks(user.getNumberOfBooks() - 1);
            return user.getNumberOfBooks();
        }
        else {
            throw new Exception("This user has 0 books borrowed");
        }
      }
}
