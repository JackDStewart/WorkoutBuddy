package com.example.backend.mapper;

import com.example.backend.dto.FriendshipDTO;
import com.example.backend.entity.Friendship;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component  // Marking this class as a Spring Component to enable dependency injection
public class FriendshipMapper {

    private final UserRepository userRepository;

    // Constructor-based injection (preferred in Spring)
    @Autowired
    public FriendshipMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Convert a Friendship entity to a FriendshipDTO
    public static FriendshipDTO toDTO(Friendship friendship) {
        return new FriendshipDTO(
                friendship.getId(),
                friendship.getUser().getId(),
                friendship.getFriend().getId(),
                friendship.getStatus()
        );
    }

    // Convert a FriendshipDTO to a Friendship entity
    public Friendship toEntity(FriendshipDTO friendshipDTO) {
        Friendship friendship = new Friendship();
        friendship.setId(friendshipDTO.getId());

        // Set the user and friend entities using the user IDs from the DTO
        User user = userRepository.findById(friendshipDTO.getUserId()).orElseThrow(() -> new IllegalArgumentException("User not found"));
        User friend = userRepository.findById(friendshipDTO.getFriendId()).orElseThrow(() -> new IllegalArgumentException("Friend not found"));

        friendship.setUser(user);
        friendship.setFriend(friend);
        friendship.setStatus(friendshipDTO.getStatus());

        return friendship;
    }
}
