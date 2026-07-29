# ── Build Stage ────────────────────────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /build
COPY pom.xml .
# Download dependencies first (cached layer)
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn clean package -DskipTests -q

# ── Run Stage ──────────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine
# Add curl for health checks
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=build /build/target/eureka-server-1.0.0.jar app.jar

# Render assigns PORT dynamically; default to 8761 for local use
EXPOSE ${PORT:-8761}

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
