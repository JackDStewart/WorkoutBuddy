package com.example.backend.entity;
import java.math.BigInteger;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;


@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Setter
    @Getter
    @Id
	private BigInteger id;

	@Setter
    @Getter
    private String name;

	@Setter
    @Getter
    private String email;

	public User() {}

	public User(String name, String email, BigInteger id) {
		this.name = name;
		this.email = email;
		this.id = id;
	}

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_id") // Foreign key in SetLog table
	private Set<ExerciseLog> exerciseLogs;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Workout> workouts;

	public BigInteger getId() {
	}
}
