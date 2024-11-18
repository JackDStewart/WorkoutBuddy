package com.example.backend.dto;

import com.example.backend.entity.enums.Equipment;
import com.example.backend.entity.enums.MuscleGroup;

public class ExerciseDTO {
    private String name;
    private String equipment;
    private String muscleGroup;

    public String getName() {
        return name;
    }

    public Equipment getEquipment() {
        return Equipment.fromDisplayName(this.equipment);
    }

    public ExerciseDTO(String name, String equipment, String muscleGroup) {
        this.name = name;
        this.equipment = equipment;
        this.muscleGroup = muscleGroup;
    }

    public MuscleGroup getMuscleGroup() {
        return MuscleGroup.fromDisplayName(this.muscleGroup);
    }
}

