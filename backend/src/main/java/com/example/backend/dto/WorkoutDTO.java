package com.example.backend.dto;

import com.example.backend.entity.Exercise;
import com.example.backend.entity.Workout;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Data
public class WorkoutDTO {
    @Setter
    private String name;
    @Setter
    private boolean favorite;
    @Setter
    private Set<ExerciseDTO> exercises;
    @Getter
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

    public WorkoutDTO(String name, boolean favorite, Set<ExerciseDTO> exercises, String userAuth0Id) {
        this.name = name;
        this.favorite = favorite;
        this.exercises = exercises;
        this.userAuth0Id = userAuth0Id;

    }

}
