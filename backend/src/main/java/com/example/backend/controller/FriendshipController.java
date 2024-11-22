package com.example.backend.controller;

import com.example.backend.dto.FriendshipDTO;
import com.example.backend.service.FriendshipService;
import com.example.backend.mapper.FriendshipMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/friendships")
public class FriendshipController {

    private final FriendshipService friendshipService;

    @Autowired
    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    // Endpoint to send a friend request
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/send")
    public ResponseEntity<String> sendFriendRequest(@RequestParam BigInteger userId, @RequestParam BigInteger friendId) {
        try {
            friendshipService.sendFriendRequest(userId, friendId);
            return new ResponseEntity<>("Friend request sent successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error sending friend request: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to accept a friend request
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/accept")
    public ResponseEntity<String> acceptFriendRequest(@RequestParam BigInteger userId, @RequestParam BigInteger friendId) {
        try {
            friendshipService.acceptFriendRequest(userId, friendId);
            return new ResponseEntity<>("Friend request accepted.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error accepting friend request: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to reject a friend request
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/reject")
    public ResponseEntity<String> rejectFriendRequest(@RequestParam BigInteger userId, @RequestParam BigInteger friendId) {
        try {
            friendshipService.rejectFriendRequest(userId, friendId);
            return new ResponseEntity<>("Friend request rejected.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error rejecting friend request: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to get all friendships of a user
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{userId}")
    public ResponseEntity<List<FriendshipDTO>> getFriendships(@PathVariable BigInteger userId) {
        try {
            List<FriendshipDTO> friendshipDTOs = friendshipService.getFriendshipsByUser(userId).stream()
                    .map(friendship -> FriendshipMapper.toDTO(friendship))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(friendshipDTOs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
