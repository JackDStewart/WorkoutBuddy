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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Exercise> exercises;

    public Workout() {}

    public Workout(String name) {
        this.name = name;
    }

    public Set<Exercise> getExercises() {
        return exercises;
    }
}
