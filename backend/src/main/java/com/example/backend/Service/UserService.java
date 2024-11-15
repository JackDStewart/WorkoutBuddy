package com.example.backend.Service;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.math.BigInteger;


@Service
public class UserService {

    private UserRepository userRepository;

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
