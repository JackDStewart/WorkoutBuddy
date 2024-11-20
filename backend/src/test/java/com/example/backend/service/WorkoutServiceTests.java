package com.example.backend.service;

import com.example.backend.dto.WorkoutDTO;
import com.example.backend.entity.Exercise;
import com.example.backend.entity.User;
import com.example.backend.entity.Workout;
import com.example.backend.entity.enums.Equipment;
import com.example.backend.entity.enums.MuscleGroup;
import com.example.backend.repository.ExerciseRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.WorkoutRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class WorkoutServiceTests {

    @InjectMocks
    WorkoutService workoutService;

    @Mock
    WorkoutRepository workoutRepository;

    @Mock
    ExerciseRepository exerciseRepository;

    @Mock
    UserRepository userRepository;

    @Nested
    class getWorkoutByUserAuth0IdTests{
        private final BigInteger userId = new BigInteger("12345678901234");

        @Test
        public void getWorkoutsByUserAuth0Id_UserFound() {

            //Arrange
            User user = new User("testName", "testEmail", userId);
            List<Workout> workouts = new ArrayList<>();

            when(userRepository.findById(userId)).thenReturn(Optional.of(user)); // User exists
            when(workoutRepository.findByUser(user)).thenReturn(workouts);

            //act
            List<Workout> workoutList = workoutService.getWorkoutsByUserAuth0Id(userId.toString());

            //Assert
            Assertions.assertNotNull(workoutList);
            Assertions.assertEquals(workouts.size(), workoutList.size());

            //verify
            Mockito.verify(userRepository, Mockito.times(1)).findById(userId);
            Mockito.verify(workoutRepository, Mockito.times(1)).findByUser(user);
        }

        @Test
        public void getWorkoutsByUserAuth0Id_UserNotFound() {

            //Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.empty()); // User does not exist

            //Act Assert
            Exception e = Assertions.assertThrows(IllegalArgumentException.class, () -> workoutService.getWorkoutsByUserAuth0Id(userId.toString()));

            Assertions.assertEquals("Workouts not found with Auth0 ID: " + userId, e.getMessage());

            //verify
            Mockito.verify(userRepository, Mockito.times(1)).findById(userId);
            Mockito.verify(workoutRepository, Mockito.never()).findByUser(Mockito.any(User.class));
        }
    }
    @Nested
    class toggleFavoriteTests {

        //Arrange
        Long workoutId = Long.valueOf("12345");
        User user = new User("testUser", "testEmail", new BigInteger("12345678901234"));
        Workout workout = new Workout("testWorkout", workoutId, user, true);


        @Test
        public void toggleFavorite_WorkoutFound() {
            workout.setExercises(Set.of(
                    new Exercise("testExercise1", Equipment.BARBELL, MuscleGroup.BICEPS, user),
                    new Exercise("testExercise2", Equipment.BARBELL, MuscleGroup.BICEPS, user)));

            when(workoutRepository.findById(workoutId)).thenReturn(Optional.of(workout));
            when(workoutRepository.save(Mockito.any(Workout.class))).thenReturn(workout);

            //act
            WorkoutDTO savedWorkoutDTO = workoutService.toggleFavorite(workout.getId()); // started true, asserting to false

            //Assert
            Assertions.assertFalse(savedWorkoutDTO.isFavorite());

            Mockito.verify(workoutRepository, Mockito.times(1)).findById(workoutId);
        }

        @Test
        public void toggleFavorite_WorkoutNotFound() {
            when(workoutRepository.findById(workoutId)).thenReturn(Optional.empty());
            Exception e = Assertions.assertThrows(RuntimeException.class, () -> workoutService.toggleFavorite(workoutId));
            Assertions.assertEquals("Workout not found with ID: " + workoutId, e.getMessage());
        }
    }



}
