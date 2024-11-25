package com.example.backend.service;

import com.example.backend.dto.ExerciseDTO;
import com.example.backend.entity.Exercise;
import com.example.backend.entity.User;
import com.example.backend.entity.enums.Equipment;
import com.example.backend.entity.enums.MuscleGroup;
import com.example.backend.repository.ExerciseRepository;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExerciseServiceTests {

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
    Exercise exercise = new Exercise("testName", Equipment.NONE, MuscleGroup.CHEST, user);
    List<Exercise> exercises = List.of(exercise);

    @Nested
    class getExerciseByUserIdTests {
        @Test
        void getExerciseByUserIdTest_UserExist() {
            when(exerciseRepository.findByCreatedByIsNullOrUserId(Mockito.any())).thenReturn(exercises);

            List<Exercise> foundExercises = exerciseService.getExercisesByUserIdOrNull(mockId);
            Assertions.assertEquals(1, foundExercises.size());
            Assertions.assertEquals(exercises, foundExercises);
            Assertions.assertEquals(exercise, foundExercises.getFirst());

            Mockito.verify(exerciseRepository, Mockito.times(1)).findByCreatedByIsNullOrUserId(Mockito.any());
        }

        @Test
        void getExerciseByUserIdTest_UserNull() {
            when(exerciseRepository.findByCreatedByIsNullOrUserId(Mockito.any())).thenReturn(exercises);

            List<Exercise> foundExercises = exerciseService.getExercisesByUserIdOrNull(mockId);
            Assertions.assertEquals(1, foundExercises.size());
            Assertions.assertEquals(exercises, foundExercises);
            Assertions.assertEquals(exercise, foundExercises.getFirst());

            Mockito.verify(exerciseRepository, Mockito.times(1)).findByCreatedByIsNullOrUserId(Mockito.any());
        }
    }

    @Nested
    class createExerciseTest {
        @Test
        void createExerciseTestSuccess() {
            // Arrange

            // Mocking behavior
            when(userRepository.findById(Mockito.any())).thenReturn(Optional.of(user));
            when(exerciseRepository.save(Mockito.any(Exercise.class))).thenReturn(exercise);

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
}