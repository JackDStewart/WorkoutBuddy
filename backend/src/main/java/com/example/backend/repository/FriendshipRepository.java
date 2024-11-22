package com.example.backend.repository;

import com.example.backend.entity.Friendship;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    // Find a friendship between two users with a specific status
    Optional<Friendship> findByUserAndFriendAndStatus(User user, BigInteger friend, String status);

    // Check if a friendship exists between two users (ignoring the status)
    boolean existsByUserAndFriendOrFriendAndUser(User user, User friend);

    // Find all friendships for a user (both pending and accepted)
    List<Friendship> findAllByUser(User user);

    // Find all friendships for a friend (both pending and accepted)
    List<Friendship> findAllByFriend(User friend);
}
