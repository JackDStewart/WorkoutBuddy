package com.example.backend;

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
    TRICEPS("Triceps");

        private final String displayName;

        MuscleGroup(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
}
