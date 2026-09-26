package com.pizzazone;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class PizzaZoneApplication {

    @PostConstruct
    public void init() {
        // Enforce default application timezone to UTC
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

    public static void main(String[] args) {
        SpringApplication.run(PizzaZoneApplication.class, args);
    }
}
