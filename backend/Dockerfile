# Step 1: Build the Spring Boot application using Maven
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom.xml and download dependencies (cached if unchanged)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and compile the jar file
COPY src ./src
RUN mvn clean package -DskipTests

# Step 2: Create the final lightweight container to run the JAR
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the compiled jar from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 (matching server.port in application.properties)
EXPOSE 8080

# Execute the application
ENTRYPOINT ["java", "-jar", "app.jar"]
