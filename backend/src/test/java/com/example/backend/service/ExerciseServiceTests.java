package com.example.backend.service;

import com.example.backend.dto.ExerciseDTO;
import com.example.backend.entity.Exercise;
import com.example.backend.entity.User;
import com.example.backend.entity.enums.Equipment;
import com.example.backend.entity.enums.MuscleGroup;
import com.example.backend.repository.ExerciseRepository;
import com.example.backend.repository.UserRepository;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.*;

import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class ExerciseServiceTests {

    @InjectMocks
    ExerciseService exerciseService;

    @Mock
    ExerciseRepository exerciseRepository;

    @Mock
    UserRepository userRepository;

    String mockId = "1111111111111112345678901234";
    BigInteger userId = new BigInteger("12345678901234");
    ExerciseDTO exerciseDTO = new ExerciseDTO("testName", "BARBELL", "QUADS", mockId);
    User user = new User("testName", "testEmail", userId);

    @Test
    public void getExercisesByUserIdTests() {
        // Arrange
        BigInteger userId = new BigInteger("12345678901234");
        Exercise exercise = new Exercise();
        List<Exercise> exercises = new ArrayList<>();
        exercises.add(exercise);

        // Mocking behavior
        when(exerciseRepository.findByCreatedByIsNullOrUserId(userId)).thenReturn(exercises);

        // Act
        List<Exercise> exerciseList = exerciseService.getExercisesByUserIdOrNull(userId.toString());

        // Assert
        Assertions.assertNotNull(exerciseList);
        Assertions.assertEquals(exercises.size(), exerciseList.size());

        // Verify
        Mockito.verify(exerciseRepository, Mockito.times(1)).findByCreatedByIsNullOrUserId(userId);
    }

    @Test
    public void createExerciseSuccessTest() {
        // Arrange
        Exercise exercise = new Exercise();
        exercise.setName("testName");
        exercise.setEquipment(Equipment.fromDisplayName("BARBELL"));
        exercise.setMuscleGroup(MuscleGroup.fromDisplayName("QUADS"));
        exercise.setCreatedBy(user);

        // Mocking behavior
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Act
        Exercise testExercise = exerciseService.createExercise(exerciseDTO);

        // Assert
        Assertions.assertNotNull(testExercise);
        Assertions.assertEquals(exercise, testExercise);

        // Verify
        Mockito.verify(userRepository, Mockito.times(1)).findById(userId);
    }

    @Test
    public void createExerciseFailureTest() {

        // Mocking behavior
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act Assert
        Exception e = Assertions.assertThrows(NoSuchElementException.class, () -> exerciseService.createExercise(exerciseDTO));

        Assertions.assertEquals("create failed from Auth0 ID: " + mockId, e.getMessage());

        // Verify
        Mockito.verify(userRepository, Mockito.times(1)).findById(userId);
    }

}

