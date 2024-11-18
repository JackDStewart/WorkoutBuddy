package com.example.backend.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Entity
public class ExerciseLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SetLog> sets;

    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "exercise_id") // Foreign key in ExerciseLog table
    private Exercise exercise;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ExerciseLog() {}

    public ExerciseLog(Exercise exercise, Set<SetLog> sets, Date date) {
        this.exercise = exercise;
        this.sets = sets;
        this.date = date;
    }

    public Set<SetLog> getSets() {
        return sets;
    }

    public void setSets(Set<SetLog> sets) {
        this.sets = sets;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }
}
