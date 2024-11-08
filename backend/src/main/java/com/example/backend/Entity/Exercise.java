package com.example.backend;

import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
public class Exercise {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Equipment equipment;

    @Enumerated(EnumType.STRING)
    private MuscleGroup muscleGroup;

    public Exercise() {}

    public Exercise(String name, Equipment equipment, MuscleGroup muscleGroup) {
        this.name = name;
        this.equipment = equipment;
        this.muscleGroup = muscleGroup;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public MuscleGroup getMuscleGroup() {
        return muscleGroup;
    }

    public void setMuscleGroup(MuscleGroup muscleGroup) {
        this.muscleGroup = muscleGroup;
    }
}
