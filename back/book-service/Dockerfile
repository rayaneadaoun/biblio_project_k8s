FROM maven:3.8.4-openjdk-17 AS builder

ARG MODULE=""

WORKDIR build


COPY . .

#RUN mvn install 
RUN mvn package -DskipTests

RUN cp target/*.jar /build/app.jar

FROM openjdk:17-jdk-alpine

WORKDIR /app

RUN apk add curl

COPY --from=builder /build/app.jar /app

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

ENTRYPOINT ["java","-jar","/app/app.jar"]
