package com.example.backend.dto;

import java.math.BigInteger;

public class FriendshipDTO {
    private Long id;
    private BigInteger userId;
    private BigInteger friendId;
    private String status;

    // Constructors
    public FriendshipDTO(Long id, BigInteger userId, BigInteger friendId, String status) {
        this.id = id;
        this.userId = userId;
        this.friendId = friendId;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigInteger getUserId() {
        return userId;
    }

    public void setUserId(BigInteger userId) {
        this.userId = userId;
    }

    public BigInteger getFriendId() {
        return friendId;
    }

    public void setFriendId(BigInteger friendId) {
        this.friendId = friendId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
