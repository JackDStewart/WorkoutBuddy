package com.example.backend.service;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigInteger;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void syncUser(UserDTO userDTO) {
        BigInteger newID = new BigInteger(userDTO.getId().substring(14));
        userRepository.findById(newID)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setId(newID);
                    newUser.setEmail(userDTO.getEmail());
                    newUser.setName(userDTO.getName());
                    return userRepository.save(newUser);
                });
    }
}
