package com.example.backend.entity;
import java.math.BigInteger;

import jakarta.persistence.*;

import java.util.Set;

@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Id
	private BigInteger id;

	private String name;

	private String email;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_id") // Foreign key in SetLog table
	private Set<ExerciseLog> exerciseLogs;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Workout> workouts;

	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
