package com.local.userinfo_ap01_spring.resolver;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.local.userinfo_ap01_spring.model.User;
import com.local.userinfo_ap01_spring.repository.UserRepository;

@Controller
public class UserResolver {

    private static final Logger logger = LoggerFactory.getLogger(UserResolver.class);
    private final UserRepository userRepository;

    public UserResolver(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // GraphQL Query
    @QueryMapping
    public List<User> users() {
        try {
            // 全件取得
            List<User> users = userRepository.findAll();

            logger.info("Fetched users: {}", users);

            return users;
        } catch (Exception e) {
            logger.error("Error get user's list: ", e);

            throw new RuntimeException("Internal server error");
        }
    }

    // GraphQL Mutation
    // ユーザ追加
    @MutationMapping
    public User addUser(@Argument String name, @Argument String address) {
        try {
            User user = new User();
            user.setName(name);
            user.setAddress(address);

            // 書き込み
            return userRepository.save(user);
        } catch (Exception e) {

            logger.error("Error adding user: ", e);

            throw new RuntimeException("Internal server error");
        }
    }

    // GraphQL Mutation
    // ユーザ削除
    @MutationMapping
    public Boolean deleteUser(@Argument Long id) {

        logger.info("Deleting user with ID: {}", id);

        try {
            // 削除
            userRepository.deleteById(id);

            return true;
        } catch (Exception e) {

            logger.error("Error deleting user: ", e);

            return false;
        }
    }
}