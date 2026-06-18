#!/usr/bin/env bash
# Exit on error
set -o errexit

# Check if Maven is already downloaded in cache
if [ ! -d "apache-maven" ]; then
  echo "Downloading Maven 3.8.8..."
  curl -sL https://archive.apache.org/dist/maven/maven-3/3.8.8/binaries/apache-maven-3.8.8-bin.tar.gz -o maven.tar.gz
  tar -xzf maven.tar.gz
  mv apache-maven-3.8.8 apache-maven
  rm maven.tar.gz
  echo "Maven downloaded successfully."
fi

# Run the build using our portable Maven
echo "Building Spring Boot Application..."
./apache-maven/bin/mvn clean package -DskipTests
echo "Build finished successfully."
