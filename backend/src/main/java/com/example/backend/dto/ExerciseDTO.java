package com.example.backend.dto;

import com.example.backend.entity.enums.Equipment;
import com.example.backend.entity.enums.MuscleGroup;

public class ExerciseDTO {
    private String name;
    private String equipment;
    private String muscleGroup;
    private String userAuth0Id;

    public String getName() {
        return name;
    }

    public Equipment getEquipment() {
        return Equipment.fromDisplayName(this.equipment);
    }

    public ExerciseDTO(String name, String equipment, String muscleGroup, String userAuth0Id) {
        this.name = name;
        this.equipment = equipment;
        this.muscleGroup = muscleGroup;
        this.userAuth0Id = userAuth0Id;
    }

    public MuscleGroup getMuscleGroup() {
        return MuscleGroup.fromDisplayName(this.muscleGroup);
    }

    public String getUserAuth0Id() {
        return userAuth0Id;
    }
}

