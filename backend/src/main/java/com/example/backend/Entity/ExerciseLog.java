package com.example.backend.Entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Entity
public class ExerciseLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "exercise_log_id") // Foreign key in SetLog table
    private Set<SetLog> sets;

    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    private User user;

    @ManyToOne
    private Exercise exercise;

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
}
