# ── Build Stage ────────────────────────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn clean package -DskipTests -q

# ── Run Stage ──────────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /build/target/analytics-service-1.0.0.jar app.jar

EXPOSE ${PORT:-8084}

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
