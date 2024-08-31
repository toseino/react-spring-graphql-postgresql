package com.local.userinfo_ap01_spring.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.local.userinfo_ap01_spring.model.User;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindAll() {
        List<User> users = userRepository.findAll();
        assertThat(users).isNotEmpty(); // ユーザリストが空でないことを確認
    }
}
