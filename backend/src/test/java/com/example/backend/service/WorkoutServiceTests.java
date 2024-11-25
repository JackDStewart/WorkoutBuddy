package com.example.backend.service;

import com.example.backend.dto.ExerciseDTO;
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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.*;

import static java.lang.Long.valueOf;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WorkoutServiceTests {

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
        void getWorkoutsByUserAuth0Id_UserFound() {

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
        void getWorkoutsByUserAuth0Id_UserNotFound() {

            //Arrange
            when(userRepository.findById(userId)).thenReturn(Optional.empty()); // User does not exist

            //Act Assert
            String userIdStr = userId.toString();
            Exception e = Assertions.assertThrows(IllegalArgumentException.class, () -> workoutService.getWorkoutsByUserAuth0Id(userIdStr));

            Assertions.assertEquals("Workouts not found with Auth0 ID: " + userId, e.getMessage());

            //verify
            Mockito.verify(userRepository, Mockito.times(1)).findById(userId);
            Mockito.verify(workoutRepository, Mockito.never()).findByUser(Mockito.any(User.class));
        }
    }

    @Nested
    class toggleFavoriteTests {

        //Arrange
        Long workoutId = valueOf("12345");
        User user = new User("testUser", "testEmail", new BigInteger("12345678901234"));
        Workout workout = new Workout("testWorkout", workoutId, user, true);


        @Test
        void toggleFavorite_WorkoutFound() {
            workout.setExercises(Set.of(
                    new Exercise("testExercise1", Equipment.BARBELL, MuscleGroup.BICEPS, user),
                    new Exercise("testExercise2", Equipment.BARBELL, MuscleGroup.BICEPS, user)));

            when(workoutRepository.findById(workoutId)).thenReturn(Optional.of(workout));
            when(workoutRepository.save(Mockito.any(Workout.class))).thenReturn(workout);

            //act
            WorkoutDTO savedWorkoutDTO = workoutService.toggleFavorite(workoutId); // started true, asserting to false

            //Assert
            Assertions.assertFalse(savedWorkoutDTO.isFavorite());

            Mockito.verify(workoutRepository, Mockito.times(1)).findById(workoutId);
        }

        @Test
        void toggleFavorite_WorkoutNotFound() {
            when(workoutRepository.findById(workoutId)).thenReturn(Optional.empty());
            Exception e = Assertions.assertThrows(RuntimeException.class, () -> workoutService.toggleFavorite(workoutId));
            Assertions.assertEquals("Workout not found with ID: " + workoutId, e.getMessage());
        }
    }


    @Nested
    class CreateWorkoutTests {

        @Test
        void createWorkout_Success_ZeroExercises() {
            // Arrange
            BigInteger userId = new BigInteger("11111111111111123456789012341234");
            WorkoutDTO workoutDTO = new WorkoutDTO("Test Workout", true, Set.of(), userId.toString());
            User user = new User("testName", "testEmail", userId);

            when(userRepository.findById(Mockito.any(BigInteger.class))).thenReturn(Optional.of(user));

            Workout workout = new Workout();
            workout.setName(workoutDTO.getName());
            workout.setUser(user);
            workout.setFavorite(workoutDTO.isFavorite());
            workout.setExercises(Set.of());

            when(workoutRepository.save(Mockito.any(Workout.class))).thenReturn(workout);

            // Act
            WorkoutDTO createdWorkoutDTO = workoutService.createWorkout(workoutDTO);

            // Assert
            Assertions.assertNotNull(createdWorkoutDTO);
            Assertions.assertEquals(workoutDTO.getName(), createdWorkoutDTO.getName());
            Assertions.assertTrue(createdWorkoutDTO.isFavorite());
            Assertions.assertEquals(0, createdWorkoutDTO.getExercises().size());

            Mockito.verify(userRepository, Mockito.times(1)).findById(Mockito.any(BigInteger.class));
            Mockito.verify(workoutRepository, Mockito.times(1)).save(Mockito.any(Workout.class));
        }

        @Test
        void createWorkout_Success_OneExercise() {
            // Arrange
            BigInteger userId = new BigInteger("11111111111111123456789012341234");
            ExerciseDTO exerciseDTO = new ExerciseDTO("Push-up", Equipment.NONE.getDisplayName(), MuscleGroup.CHEST.getDisplayName(), userId.toString());
            WorkoutDTO workoutDTO = new WorkoutDTO("Test Workout", true, Set.of(exerciseDTO), userId.toString());
            User user = new User("testName", "testEmail", userId);

            Exercise exercise = new Exercise("Push-up", Equipment.NONE, MuscleGroup.CHEST, user);
            when(userRepository.findById(Mockito.any(BigInteger.class))).thenReturn(Optional.of(user));
            when(exerciseRepository.findByName("Push-up")).thenReturn(Optional.of(exercise));

            Workout workout = new Workout();
            workout.setName(workoutDTO.getName());
            workout.setUser(user);
            workout.setFavorite(workoutDTO.isFavorite());
            workout.setExercises(Set.of(exercise));

            when(workoutRepository.save(Mockito.any(Workout.class))).thenReturn(workout);

            // Act
            WorkoutDTO createdWorkoutDTO = workoutService.createWorkout(workoutDTO);

            // Assert
            Assertions.assertNotNull(createdWorkoutDTO);
            Assertions.assertEquals(workoutDTO.getName(), createdWorkoutDTO.getName());
            Assertions.assertTrue(createdWorkoutDTO.isFavorite());
            Assertions.assertEquals(1, createdWorkoutDTO.getExercises().size());

            Mockito.verify(userRepository, Mockito.times(1)).findById(Mockito.any(BigInteger.class));
            Mockito.verify(exerciseRepository, Mockito.times(1)).findByName("Push-up");
            Mockito.verify(workoutRepository, Mockito.times(1)).save(Mockito.any(Workout.class));
        }

        @Test
        void createWorkout_Success_TwoExercises() {
            // Arrange
            BigInteger userId = new BigInteger("11111111111111123456789012341234");
            ExerciseDTO exerciseDTO1 = new ExerciseDTO("Push-up", Equipment.NONE.getDisplayName(), MuscleGroup.CHEST.getDisplayName(), userId.toString());
            ExerciseDTO exerciseDTO2 = new ExerciseDTO("Squat", Equipment.BARBELL.getDisplayName(), MuscleGroup.CHEST.getDisplayName(), userId.toString());
            WorkoutDTO workoutDTO = new WorkoutDTO("Test Workout", true, Set.of(exerciseDTO1, exerciseDTO2), userId.toString());
            User user = new User("testName", "testEmail", userId);

            Exercise exercise1 = new Exercise("Push-up", Equipment.NONE, MuscleGroup.CHEST, user);
            Exercise exercise2 = new Exercise("Squat", Equipment.BARBELL, MuscleGroup.CHEST, user);
            when(userRepository.findById(Mockito.any(BigInteger.class))).thenReturn(Optional.of(user));
            when(exerciseRepository.findByName("Push-up")).thenReturn(Optional.of(exercise1));
            when(exerciseRepository.findByName("Squat")).thenReturn(Optional.of(exercise2));

            Workout workout = new Workout();
            workout.setName(workoutDTO.getName());
            workout.setUser(user);
            workout.setFavorite(workoutDTO.isFavorite());
            workout.setExercises(Set.of(exercise1, exercise2));

            when(workoutRepository.save(Mockito.any(Workout.class))).thenReturn(workout);

            // Act
            WorkoutDTO createdWorkoutDTO = workoutService.createWorkout(workoutDTO);

            // Assert
            Assertions.assertNotNull(createdWorkoutDTO);
            Assertions.assertEquals(workoutDTO.getName(), createdWorkoutDTO.getName());
            Assertions.assertTrue(createdWorkoutDTO.isFavorite());
            Assertions.assertEquals(2, createdWorkoutDTO.getExercises().size());

            Mockito.verify(userRepository, Mockito.times(1)).findById(Mockito.any(BigInteger.class));
            Mockito.verify(exerciseRepository, Mockito.times(2)).findByName(Mockito.anyString());
            Mockito.verify(workoutRepository, Mockito.times(1)).save(Mockito.any(Workout.class));
        }

        @Test
        void createWorkout_Success_FiveExercises() {
            // Arrange
            BigInteger userId = new BigInteger("11111111111111123456789012341234");
            Set<ExerciseDTO> exerciseDTOs = new HashSet<>();
            Set<Exercise> exercises = new HashSet<>();
            for (int i = 1; i <= 5; i++) {
                String exerciseName = "Exercise " + i;
                exerciseDTOs.add(new ExerciseDTO(exerciseName, Equipment.NONE.getDisplayName(), MuscleGroup.CHEST.getDisplayName(), userId.toString()));
                exercises.add(new Exercise(exerciseName, Equipment.NONE, MuscleGroup.CHEST, new User("testName", "testEmail", userId)));
            }
            WorkoutDTO workoutDTO = new WorkoutDTO("Test Workout", true, exerciseDTOs, userId.toString());
            User user = new User("testName", "testEmail", userId);

            when(userRepository.findById(Mockito.any(BigInteger.class))).thenReturn(Optional.of(user));
            for (Exercise exercise : exercises) {
                when(exerciseRepository.findByName(exercise.getName())).thenReturn(Optional.of(exercise));
            }

            Workout workout = new Workout();
            workout.setName(workoutDTO.getName());
            workout.setUser(user);
            workout.setFavorite(workoutDTO.isFavorite());
            workout.setExercises(exercises);

            when(workoutRepository.save(Mockito.any(Workout.class))).thenReturn(workout);

            // Act
            WorkoutDTO createdWorkoutDTO = workoutService.createWorkout(workoutDTO);

            // Assert
            Assertions.assertNotNull(createdWorkoutDTO);
            Assertions.assertEquals(workoutDTO.getName(), createdWorkoutDTO.getName());
            Assertions.assertTrue(createdWorkoutDTO.isFavorite());
            Assertions.assertEquals(5, createdWorkoutDTO.getExercises().size());

            Mockito.verify(userRepository, Mockito.times(1)).findById(Mockito.any(BigInteger.class));
            Mockito.verify(exerciseRepository, Mockito.times(5)).findByName(Mockito.anyString());
            Mockito.verify(workoutRepository, Mockito.times(1)).save(Mockito.any(Workout.class));
        }

        @Test
        void createWorkout_Error_UserNotFound() {
            // Arrange
            BigInteger userId = new BigInteger("11111111111111123456789012341234");
            WorkoutDTO workoutDTO = new WorkoutDTO("Test Workout", true, Set.of(), userId.toString());

            when(userRepository.findById(Mockito.any(BigInteger.class))).thenReturn(Optional.empty());

            // Act & Assert
            Exception exception = Assertions.assertThrows(NoSuchElementException.class, () -> workoutService.createWorkout(workoutDTO));
            Assertions.assertEquals("create failed from Auth0 ID: " + userId.toString().substring(14), exception.getMessage());

            Mockito.verify(userRepository, Mockito.times(1)).findById(Mockito.any(BigInteger.class));
            Mockito.verify(workoutRepository, Mockito.never()).save(Mockito.any(Workout.class));
        }
    }


    @Test
    void createWorkout_Success() {
        // Arrange
        BigInteger userId = new BigInteger("11111111111111123456789012341234");
        WorkoutDTO workoutDTO = new WorkoutDTO("Test Workout", true, Set.of(new ExerciseDTO("Push-up", Equipment.NONE.getDisplayName(), MuscleGroup.CHEST.getDisplayName(), userId.toString())), userId.toString());
        User user = new User("testName", "testEmail", userId);

        Exercise exercise = new Exercise("Push-up", Equipment.NONE, MuscleGroup.CHEST, user);
        when(userRepository.findById(Mockito.any(BigInteger.class))).thenReturn(Optional.of(user));
        when(exerciseRepository.findByName("Push-up")).thenReturn(Optional.of(exercise));

        Workout workout = new Workout();
        workout.setName(workoutDTO.getName());
        workout.setUser(user);
        workout.setFavorite(workoutDTO.isFavorite());
        workout.setExercises(Set.of(exercise));

        when(workoutRepository.save(Mockito.any(Workout.class))).thenReturn(workout);

        // Act
        WorkoutDTO createdWorkoutDTO = workoutService.createWorkout(workoutDTO);

        // Assert
        Assertions.assertNotNull(createdWorkoutDTO);
        Assertions.assertEquals(workoutDTO.getName(), createdWorkoutDTO.getName());
        Assertions.assertTrue(createdWorkoutDTO.isFavorite());
        Assertions.assertEquals(workoutDTO.getExercises().size(), createdWorkoutDTO.getExercises().size());

        // Verify repository interactions
        Mockito.verify(userRepository, Mockito.times(1)).findById(Mockito.any(BigInteger.class));
        Mockito.verify(exerciseRepository, Mockito.times(1)).findByName("Push-up");
        Mockito.verify(workoutRepository, Mockito.times(1)).save(Mockito.any(Workout.class));
    }



    @Test
    void getWorkoutById_Success() {
        //Arrange
        Long workoutId = 12345L;
        User user = new User("testName", "testEmail", new BigInteger("11111111111111123456789012341234"));
        Workout workout = new Workout("testWorkout", workoutId, user, true);

        when(workoutRepository.findById(workoutId)).thenReturn(Optional.of(workout));

        //act
        Workout foundWorkout = workoutService.getWorkoutById(workoutId);

        //Assert
        Assertions.assertNotNull(foundWorkout);
        Assertions.assertEquals(workoutId, foundWorkout.getId());
        Assertions.assertEquals(workout.getName(), foundWorkout.getName());
        Assertions.assertTrue(foundWorkout.isFavorite());

        Mockito.verify(workoutRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
    }

    @Nested
    class deleteWorkout {
        @Test
        void deleteWorkout_Success() {
            // Arrange
            Long workoutId = 12345L;
            Workout workout = new Workout();
            workout.setId(workoutId);
            workout.setName("Test Workout");

            when(workoutRepository.findById(workoutId)).thenReturn(Optional.of(workout));

            // Act
            workoutService.deleteWorkout(workoutId);

            // Assert
            Mockito.verify(workoutRepository, Mockito.times(1)).findById(workoutId);
            Mockito.verify(workoutRepository, Mockito.times(1)).delete(workout);
        }

        @Test
        void deleteWorkout_WorkoutNotFound() {
            // Arrange
            Long workoutId = 12345L;

            when(workoutRepository.findById(workoutId)).thenReturn(Optional.empty());

            // Act & Assert
            Assertions.assertThrows(NoSuchElementException.class, () -> workoutService.deleteWorkout(workoutId));

            // Verify
            Mockito.verify(workoutRepository, Mockito.times(1)).findById(workoutId);
            Mockito.verify(workoutRepository, Mockito.never()).delete(Mockito.any(Workout.class));
        }
    }
}
