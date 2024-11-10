package com.example.backend.Entity.Enum;

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

    public static Equipment fromDisplayName(String displayName) {
        for (Equipment equipment : values()) {
            if (equipment.getDisplayName().equalsIgnoreCase(displayName)) {
                return equipment;
            }
        }
        throw new IllegalArgumentException("No enum constant with display name " + displayName);
    }
}

