package com.example.backend.Entity.Enum;

public enum MuscleGroup {
    ABS("Abs"),
    ADDUCTORS("Adductors"),
    ABDUCTORS("Abductors"),
    BICEPS("Biceps"),
    CALVES("Calves"),
    CHEST("Chest"),
    FOREARMS("Forearms"),
    GLUTES("Glutes"),
    HAMSTRINGS("Hamstrings"),
    LATS("Lats"),
    LOWER_BACK("Lower Back"),
    MIDDLE_BACK("Middle Back"),
    TRAPS("Traps"),
    QUADS("Quads"),
    SHOULDERS("Shoulders"),
    OTHER("Other"),
    TRICEPS("Triceps");

        private final String displayName;

        MuscleGroup(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }

    public static MuscleGroup fromDisplayName(String displayName) {
        for (MuscleGroup muscleGroup : values()) {
            if (muscleGroup.getDisplayName().equalsIgnoreCase(displayName)) {
                return muscleGroup;
            }
        }
        throw new IllegalArgumentException("No enum constant with display name " + displayName);
    }
}
