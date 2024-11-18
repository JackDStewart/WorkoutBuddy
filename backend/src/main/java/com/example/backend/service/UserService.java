package com.example.backend.service;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void syncUser(UserDTO userDTO) {
        BigInteger newID = new BigInteger(userDTO.getId().substring(14));

        Optional<User> userOptional = userRepository.findById(newID);
        if (userOptional.isEmpty())
        {
            User newUser = new User();
            newUser.setId(newID);
            newUser.setEmail(userDTO.getEmail());
            newUser.setName(userDTO.getName());
            userRepository.save(newUser);
        };
    }
}
