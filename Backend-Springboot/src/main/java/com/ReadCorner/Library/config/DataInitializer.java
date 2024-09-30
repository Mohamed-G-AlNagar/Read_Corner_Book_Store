package com.ReadCorner.Library.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;


@Component
public class DataInitializer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public DataInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        // Create the app_init_flag table if it doesn't exist
        jdbcTemplate.execute(
                "CREATE TABLE IF NOT EXISTS app_init_flag (id INT PRIMARY KEY, initialized BOOLEAN NOT NULL)"
        );

        // Initialize the table with default data if it is empty
        int count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM app_init_flag",
                Integer.class
        );

        if (count == 0) {
            jdbcTemplate.update(
                    "INSERT INTO app_init_flag (id, initialized) VALUES (1, false)"
            );
        }

        // Check if data has been initialized
        boolean initialized = Boolean.TRUE.equals(jdbcTemplate.queryForObject(
                "SELECT initialized FROM app_init_flag WHERE id = 1",
                Boolean.class
        ));

        if (!initialized) {
            // Execute the SQL statements in data.sql
            executeDataScript();

            // Update the flag to indicate initialization is complete
            jdbcTemplate.update(
                    "UPDATE app_init_flag SET initialized = true WHERE id = 1"
            );
        }
    }

    private void executeDataScript() {
        try {
            ClassPathResource resource = new ClassPathResource("data.sql");
            String script = new BufferedReader(new InputStreamReader(resource.getInputStream()))
                    .lines()
                    .collect(Collectors.joining("\n"));

            String[] statements = script.split(";");
            for (String statement : statements) {
                if (!statement.trim().isEmpty()) {
                    jdbcTemplate.execute(statement + ";");
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to execute data.sql script", e);
        }
    }
}
