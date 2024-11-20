package com.example.backend.service;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void SyncUser_NewUser() {
        // Arrange
        String mockId = "1111111111111112345678901234"; // Example ID string
        BigInteger newId = new BigInteger(mockId);
        User user = new User("testUser", "testEmail", newId);

        when(userRepository.findById(new BigInteger("12345678901234"))).thenReturn(Optional.empty()); // User does not exist

        when(userRepository.save(Mockito.any(User.class))).thenReturn(user); // Simulate saving new user

        // Act
        User savedUser = userService.syncUser(new UserDTO(user));

        // Assert
        Assertions.assertNotNull(savedUser); // Ensure a user was returned
        Assertions.assertEquals(newId, savedUser.getId());
        Assertions.assertEquals("testEmail", savedUser.getEmail());
        Assertions.assertEquals("testUser", savedUser.getName());

        Mockito.verify(userRepository, Mockito.times(1)).findById(new BigInteger("12345678901234"));
        Mockito.verify(userRepository, Mockito.times(1)).save(Mockito.any(User.class)); // Save should not be called
    }


    @Test
    void SyncUser_UserPresent(){
        //Arrange
        String mockId = "1111111111111112345678901234"; // Example ID string
        BigInteger existingId = new BigInteger(mockId);
        User user = new User("testUser", "testEmail", existingId);

        when(userRepository.findById(new BigInteger("12345678901234"))).thenReturn(Optional.of(user)); // User already exists

        //Act
        User result = userService.syncUser(new UserDTO(user));

        //Assert
        Assertions.assertNotNull(result);

        // Verify interactions
        Mockito.verify(userRepository, Mockito.times(1)).findById(new BigInteger("12345678901234"));
        Mockito.verify(userRepository, Mockito.never()).save(Mockito.any(User.class)); // Save should not be called
    }
}
