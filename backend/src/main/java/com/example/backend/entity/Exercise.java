package com.example.backend.entity;

import com.example.backend.entity.enums.Equipment;
import com.example.backend.entity.enums.MuscleGroup;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

}
