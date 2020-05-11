package com.epos.categoryapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan("com.epos")
@EntityScan("com.epos")
@EnableJpaRepositories("com.epos")
public class CategoryApiApplication {

	public static void main(String[] args) {
		System.out.println("Started------------------");
		SpringApplication.run(CategoryApiApplication.class, args);
		System.out.println("Ended------------------");
	}

}