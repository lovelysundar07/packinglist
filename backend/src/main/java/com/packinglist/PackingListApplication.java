package com.packinglist;

import com.packinglist.model.User;
import com.packinglist.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class PackingListApplication {

    public static void main(String[] args) {
        SpringApplication.run(PackingListApplication.class, args);
    }

    // Seed default admin user on startup if not present
    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword("admin123"); // Default password
                admin.setEmail("admin@packmate.com");
                admin.setRole("ADMIN");
                userRepository.save(admin);
                System.out.println("Default admin user pre-seeded in MongoDB: (admin / admin123)");
            }
        };
    }

    // Define Global CORS settings to allow local frontend access
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173", "http://127.0.0.1:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
