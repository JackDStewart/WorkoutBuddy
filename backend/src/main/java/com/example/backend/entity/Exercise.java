package com.example.backend.entity;

import com.example.backend.entity.enums.Equipment;
import com.example.backend.entity.enums.MuscleGroup;
import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Equipment equipment;

    @Enumerated(EnumType.STRING)
    private MuscleGroup muscleGroup;

    @ManyToOne // Many exercises can be created by one user
    @JoinColumn(name = "created_by", nullable = true) // Customizes the foreign key column
    private User createdBy;

    public Exercise() {}

    public Exercise(String name, Equipment equipment, MuscleGroup muscleGroup, User createdBy) {
        this.name = name;
        this.equipment = equipment;
        this.muscleGroup = muscleGroup;
        this.createdBy = createdBy;
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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}
