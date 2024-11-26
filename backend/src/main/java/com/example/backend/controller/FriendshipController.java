package com.example.backend.controller;

import com.example.backend.entity.Friendship;
import com.example.backend.entity.User;
import com.example.backend.service.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/friendship")
public class FriendshipController {

    private final FriendshipService friendshipService;

    @Autowired
    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/send")
    public String sendFriendRequest(
            @RequestParam String senderId,
            @RequestParam String receiverId) {

        return friendshipService.sendFriendRequest(senderId, receiverId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{userId}/friends")
    public ResponseEntity<List<User>> getAllFriends(@PathVariable String userId) {
        try {
            List<User> friends = friendshipService.getAllFriendsForUser(new BigInteger(userId));
            return ResponseEntity.ok(friends);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/incoming/{receiverId}")
    public ResponseEntity<List<Friendship>> getIncomingFriendRequests(@PathVariable String receiverId) {
        List<Friendship> incomingRequests = friendshipService.getIncomingFriendRequests(receiverId);
        return ResponseEntity.ok(incomingRequests);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{requestId}/accept")
    public ResponseEntity<String> acceptFriendRequest(@PathVariable Long requestId) {
        try {
            friendshipService.acceptFriendRequest(requestId);
            return ResponseEntity.ok("Friend request accepted");
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/{requestId}/decline")
    public ResponseEntity<String> declineFriendRequest(@PathVariable Long requestId) {
        try {
            friendshipService.declineFriendRequest(requestId);
            return ResponseEntity.ok("Friend request declined");
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
