package com.example.backend.dto;

import com.example.backend.entity.Exercise;
import com.example.backend.entity.Workout;

import java.util.HashSet;
import java.util.Set;

public class WorkoutDTO {
    private String name;
    private boolean favorite;
    private Set<ExerciseDTO> exercises;
    private String userAuth0Id;

    public WorkoutDTO(Workout workout) {
        this.name = workout.getName();
        this.favorite = workout.isFavorite();
        this.exercises = new HashSet<>();
        for(Exercise exercise : workout.getExercises()) {
            this.exercises.add(new ExerciseDTO(exercise.getName(), exercise.getEquipment().getDisplayName(), exercise.getMuscleGroup().getDisplayName(), ""));
        }
        this.userAuth0Id = workout.getUser().getId().toString();
    }

    public String getUserAuth0Id() {
        return userAuth0Id;
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

    public WorkoutDTO(String name, boolean favorite, Set<ExerciseDTO> exercises) {
        this.name = name;
        this.favorite = favorite;
        this.exercises = exercises;
    }

    public Set<ExerciseDTO> getExercises() {
        return exercises;
    }

    public void setExercises(Set<ExerciseDTO> exercises) {
        this.exercises = exercises;
    }
}
