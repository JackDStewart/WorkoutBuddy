package com.example.backend.service;

import com.example.backend.entity.Friendship;
import com.example.backend.entity.User;
import com.example.backend.repository.FriendshipRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository, UserRepository userRepository) {
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
    }

    // Helper method to convert BigInteger to Long safely
    private Long toLong(BigInteger bigInteger) {
        if (bigInteger == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        if (bigInteger.compareTo(BigInteger.valueOf(Long.MAX_VALUE)) > 0 || bigInteger.compareTo(BigInteger.valueOf(Long.MIN_VALUE)) < 0) {
            throw new IllegalArgumentException("BigInteger is too large to fit into a Long");
        }
        return bigInteger.longValue();  // Convert safely
    }

    // Send a friend request (insert into Friendships table)
    @Transactional
    public void sendFriendRequest(BigInteger userId, BigInteger friendId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        User friend = userRepository.findById(friendId).orElseThrow(() -> new IllegalArgumentException("Friend not found"));

        // Create and save the friendship with 'pending' status
        Friendship friendship = new Friendship();
        friendship.setUser(user);
        friendship.setFriend(friend);
        friendship.setStatus("pending");
        friendshipRepository.save(friendship);
    }

    // Accept a friend request (update status to 'accepted')
    @Transactional
    public void acceptFriendRequest(BigInteger userId, BigInteger friendId) {
                // Find the friendship with 'pending' status
        Friendship friendship = friendshipRepository.findByUserAndFriendAndStatus(
                        userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")),
                        friendId,
                        "pending")
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found or already accepted"));

        // Update the status to 'accepted'
        friendship.setStatus("accepted");
        friendshipRepository.save(friendship);
    }

    // Reject a friend request (delete the friendship record)
    @Transactional
    public void rejectFriendRequest(BigInteger userId, BigInteger friendId) {
        Friendship friendship = friendshipRepository.findByUserAndFriendAndStatus(
                        userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")),
                        friendId,
                        "pending")
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found"));

        // Delete the friendship record (request is rejected)
        friendshipRepository.delete(friendship);
    }

    // Get all friendships for a user
    public List<Friendship> getFriendshipsByUser(BigInteger userId) {


        // Get the user to ensure they exist
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Return all friendships where the user is involved
        return friendshipRepository.findAllByUser(user);
    }
}
