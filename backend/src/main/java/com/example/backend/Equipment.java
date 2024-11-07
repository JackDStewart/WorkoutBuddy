package com.example.backend;

public enum Equipment {
    NONE("None"),
    BARBELL("Barbell"),
    DUMBBELL("Dumbbell"),
    KETTLEBELL("Kettlebell"),
    MEDICINE_BALL("Medicine Ball"),
    MACHINE("Machine"),
    RESISTANCE_BAND("Resistance Band"),
    CABLE("Cable"),
    OTHER("Other");

    private final String displayName;

    Equipment(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

