package com.example.backend.DTO;

import java.util.Date;
import java.util.Set;

public class ExerciseLogDTO {
    private Set<SetLogDTO> sets;
    private Date date;
    private ExerciseDTO exercise;
    private String userAuth0Id;

    public Set<SetLogDTO> getSets() {
        return sets;
    }

    public void setSets(Set<SetLogDTO> sets) {
        this.sets = sets;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ExerciseDTO getExercise() {
        return exercise;
    }

    public void setExercise(ExerciseDTO exercise) {
        this.exercise = exercise;
    }

    public String getUserAuth0Id() {
        return userAuth0Id;
    }
}
