package com.userservice.userservice.repo;

import com.userservice.userservice.domain.Role;
import com.userservice.userservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByName(String rolename);
}
