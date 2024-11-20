package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Entity
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private boolean favorite;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})  // Avoid PERSIST to prevent duplication
    @JoinTable(
            name = "workout_exercises",  // Name of the join table
            joinColumns = @JoinColumn(name = "workout_id"),  // Foreign key column in join table for Workout
            inverseJoinColumns = @JoinColumn(name = "exercise_id")  // Foreign key column in join table for Exercise
    )
    private Set<Exercise> exercises;

    public Workout() {}

    public Workout(String name, Long id, User user, boolean favorite) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.favorite = favorite;
    }

    // Getters and Setters

}
