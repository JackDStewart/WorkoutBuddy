package com.example.backend.entity;

import com.example.backend.entity.enums.FriendshipStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;

    public Friendship() {}

    public Friendship(User sender, User receiver, FriendshipStatus status) {
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
    }
}
