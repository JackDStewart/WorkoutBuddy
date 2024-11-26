package com.example.backend.service;

import com.example.backend.entity.Friendship;
import com.example.backend.entity.User;
import com.example.backend.entity.enums.FriendshipStatus;
import com.example.backend.repository.FriendshipRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public FriendshipService(FriendshipRepository friendshipRepository, UserRepository userRepository) {
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
    }

    public List<User> getAllFriendsForUser(BigInteger userId) {
        List<Friendship> friendships = friendshipRepository.findByUserAndStatus(userId, FriendshipStatus.ACCEPTED);

        return friendships.stream()
                .map(friendship -> friendship.getSender().getId().equals(userId)
                        ? friendship.getReceiver()
                        : friendship.getSender())
                .toList();
    }

    public List<Friendship> getIncomingFriendRequests(String receiverId) {
        Optional<User> receiver = userRepository.findById(new java.math.BigInteger(receiverId));
        if (receiver.isEmpty()) {
            throw new IllegalArgumentException("User not found for the provided ID.");
        }

        return friendshipRepository.findByReceiverAndStatus(receiver.get(), FriendshipStatus.PENDING);
    }

    public String sendFriendRequest(String senderId, String receiverId) {
        if (senderId.equals(receiverId)) {
            throw new IllegalArgumentException("Cannot send a friend request to yourself.");
        }

        BigInteger senderIdInt = new BigInteger(senderId);
        BigInteger receiverIdInt = new BigInteger(receiverId);

        Optional<Friendship> existingFriendship = friendshipRepository.findExistingFriendship(senderIdInt, receiverIdInt);
        if (existingFriendship.isPresent()) {
            return "Friend request already exists or the users are already friends.";
        }

        User sender = userRepository.findById(senderIdInt)
                .orElseThrow(() -> new IllegalArgumentException("Sender not found."));
        User receiver = userRepository.findById(receiverIdInt)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found."));

        Friendship friendship = new Friendship();
        friendship.setSender(sender);
        friendship.setReceiver(receiver);
        friendship.setStatus(FriendshipStatus.PENDING);
        friendshipRepository.save(friendship);

        return "Friend request sent successfully";
    }

    public void acceptFriendRequest(Long requestId) {
        Friendship friendship = friendshipRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Friendship request not found"));

        if (!friendship.getStatus().equals(FriendshipStatus.PENDING)) {
            throw new IllegalStateException("Only pending requests can be accepted");
        }

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendshipRepository.save(friendship);
    }

    public void declineFriendRequest(Long requestId) {
        Friendship friendship = friendshipRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Friendship request not found"));

        if (!friendship.getStatus().equals(FriendshipStatus.PENDING)) {
            throw new IllegalStateException("Only pending requests can be declined");
        }

        friendship.setStatus(FriendshipStatus.DECLINED);
        friendshipRepository.save(friendship);
    }
}