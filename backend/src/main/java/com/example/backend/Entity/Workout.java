package com.example.backend.Entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Workout {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String name;

    private boolean favorite;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @ManyToMany
    @JoinTable(
            name = "workout_exercises", // Name of the join table
            joinColumns = @JoinColumn(name = "workout_id"), // Foreign key in join table for Workout
            inverseJoinColumns = @JoinColumn(name = "exercises_id") // Foreign key in join table for Exercise
    )
    private Set<Exercise> exercises;

    public Workout() {}

    public Workout(String name) {
        this.name = name;
    }

    public Set<Exercise> getExercises() {
        return exercises;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public void setExercises(Set<Exercise> exercises) {
        this.exercises = exercises;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
