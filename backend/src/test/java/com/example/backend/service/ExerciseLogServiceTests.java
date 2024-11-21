package com.example.backend.service;

import com.example.backend.dto.ExerciseDTO;
import com.example.backend.dto.ExerciseLogDTO;
import com.example.backend.dto.SetLogDTO;
import com.example.backend.entity.Exercise;
import com.example.backend.entity.ExerciseLog;
import com.example.backend.entity.SetLog;
import com.example.backend.entity.User;
import com.example.backend.entity.enums.Equipment;
import com.example.backend.entity.enums.MuscleGroup;
import com.example.backend.repository.ExerciseLogRepository;
import com.example.backend.repository.ExerciseRepository;
import com.example.backend.repository.SetLogRepository;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.*;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ExerciseLogServiceTests {

    @Mock
    UserRepository userRepository;

    @Mock
    ExerciseRepository exerciseRepository;

    @Mock
    ExerciseLogRepository exerciseLogRepository;

    @Mock
    SetLogRepository setLogRepository;

    @InjectMocks
    ExerciseLogService exerciseLogService;

    String id = "12345678901234567890";
    User user = new User("testName", "testEmail", new BigInteger(id));
    Exercise exercise = new Exercise("testName", Equipment.NONE, MuscleGroup.BICEPS, user);

    @Test
    void getExercisesByUserAuth0IdTest_Success() {
        //Arrange

        Set<SetLog> SetLogs =  Set.of(new SetLog(1,2));
        ExerciseLog exerciseLog = new ExerciseLog(exercise, SetLogs, new Date());

        when(userRepository.findById(Mockito.any(BigInteger.class))).thenReturn(Optional.of(user));
        when(exerciseLogRepository.findByUser(Mockito.any(User.class))).thenReturn(List.of(exerciseLog));

        List<Exercise> exercises = exerciseLogService.getExercisesByUserAuth0Id(id);

        Assertions.assertNotNull(exercises);
        Assertions.assertEquals(1, exercises.size());
        Assertions.assertEquals(exercise, exercises.getFirst());

        Mockito.verify(exerciseLogRepository, Mockito.times(1)).findByUser(Mockito.any(User.class));
    }

    @Test
    void getExerciseLogsSuccess() {

        List<ExerciseLog> exerciseLogs = List.of(new ExerciseLog(exercise, Set.of(new SetLog()), new Date()));

        when(userRepository.findById(Mockito.any(BigInteger.class))).thenReturn(Optional.of(user));
        when(exerciseRepository.findByName(Mockito.any(String.class))).thenReturn(Optional.of(exercise));
        when(exerciseLogRepository.findByUser(Mockito.any(User.class))).thenReturn(exerciseLogs);

        List<ExerciseLog> foundLogs = exerciseLogService.getExerciseLogs(id, "testName");

        Assertions.assertNotNull(foundLogs);
        Assertions.assertEquals(1, foundLogs.size());
        Assertions.assertEquals(exercise, foundLogs.getFirst().getExercise());

        Mockito.verify(exerciseLogRepository, Mockito.times(1)).findByUser(Mockito.any(User.class));
    }

    @Test
    void saveAllSuccess() {
        ExerciseLog exerciseLog = new ExerciseLog(exercise, Set.of(new SetLog()), new Date());
        ExerciseLogDTO exerciseLogDTO = new ExerciseLogDTO();
        exerciseLogDTO.setUserAuth0Id(id);
        exerciseLogDTO.setExercise(new ExerciseDTO(exercise.getName(), exercise.getEquipment().toString(),
                exercise.getMuscleGroup().toString(), exercise.getCreatedBy().getId().toString()));
        exerciseLogDTO.setSets(Set.of(new SetLogDTO()));
        exerciseLogDTO.setDate(new Date());
        List<ExerciseLogDTO> exerciseLogDTOs = List.of(exerciseLogDTO);

        when(userRepository.findById(Mockito.any(BigInteger.class))).thenReturn(Optional.of(user));
        when(exerciseRepository.findByName(Mockito.any(String.class))).thenReturn(Optional.of(exercise));
        when(exerciseRepository.save(Mockito.any(Exercise.class))).thenReturn(exercise);
        when(setLogRepository.saveAll(Mockito.any())).thenReturn(Set.of(new SetLog()));
        when(exerciseLogRepository.saveAll(Mockito.anyList())).thenReturn(List.of(exerciseLog));

        List<ExerciseLog> exerciseLogs = exerciseLogService.saveAll(exerciseLogDTOs);

        Assertions.assertNotNull(exerciseLogs);
        Assertions.assertEquals(1, exerciseLogs.size());
        Assertions.assertEquals(exercise, exerciseLogs.getFirst().getExercise());
        Mockito.verify(exerciseLogRepository, Mockito.times(1)).saveAll(Mockito.anyList());


    }

}
