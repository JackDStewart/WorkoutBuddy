package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Setter
@Getter
@Entity
public class ExerciseLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany
    private Set<SetLog> sets;

    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "exercise_id") // Foreign key in ExerciseLog table
    private Exercise exercise;

    @ManyToOne
    private User user;

    public ExerciseLog() {}

    public ExerciseLog(Exercise exercise, Set<SetLog> sets, Date date) {
        this.exercise = exercise;
        this.sets = sets;
        this.date = date;
    }

}
