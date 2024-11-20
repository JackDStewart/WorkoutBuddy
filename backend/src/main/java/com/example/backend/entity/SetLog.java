package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class SetLog {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private int weight;

    private int reps;


    public SetLog() {}

    public SetLog(int weight, int reps) {
        this.weight = weight;
        this.reps = reps;
    }

}
