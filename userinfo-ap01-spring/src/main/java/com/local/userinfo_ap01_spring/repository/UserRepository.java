package com.local.userinfo_ap01_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.local.userinfo_ap01_spring.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}