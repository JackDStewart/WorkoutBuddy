package com.example.backend.repository;

import com.example.backend.entity.Friendship;
import com.example.backend.entity.User;
import com.example.backend.entity.enums.FriendshipStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends CrudRepository<Friendship, Long> {
    List<Friendship> findByReceiverAndStatus(User receiver, FriendshipStatus status);

    @Query("SELECT f FROM Friendship f WHERE (f.sender.id = :userId OR f.receiver.id = :userId) AND f.status = :status")
    List<Friendship> findByUserAndStatus(@Param("userId") BigInteger userId, @Param("status") FriendshipStatus status);

    @Query("SELECT f FROM Friendship f WHERE " +
            "(f.sender.id = :userId1 AND f.receiver.id = :userId2) OR " +
            "(f.sender.id = :userId2 AND f.receiver.id = :userId1)")
    Optional<Friendship> findExistingFriendship(@Param("userId1") BigInteger userId1, @Param("userId2") BigInteger userId2);


}
