package com.projecthub.backend.config;

import com.projecthub.backend.dto.ProjectRequest;
import com.projecthub.backend.entity.Project;
import com.projecthub.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository;

    @Override
    public void run(String... args) {
        if (projectRepository.count() == 0) {
            log.info("Seeding sample project data...");

            List<Project> projects = List.of(
                Project.builder()
                    .title("AI-Powered Attendance System")
                    .description("A real-time face recognition-based attendance management system built using Python, OpenCV, and deep learning. Automatically detects and marks attendance for students or employees with high accuracy.")
                    .category("AI/ML")
                    .technology("Python, OpenCV, TensorFlow, Flask, SQLite")
                    .price(new BigDecimal("2499"))
                    .thumbnail("https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600")
                    .demoLink("https://www.youtube.com/")
                    .features("Face recognition,Auto attendance marking,Admin dashboard,Export reports,Real-time alerts")
                    .includedFiles("Complete source code,Documentation,Database schema,Setup guide")
                    .featured(true)
                    .build(),

                Project.builder()
                    .title("E-Commerce MERN Stack")
                    .description("A fully functional e-commerce platform with product listings, cart management, user authentication, and order tracking. Built with the MERN stack for modern, scalable web applications.")
                    .category("Full Stack")
                    .technology("MongoDB, Express.js, React, Node.js, JWT, Stripe")
                    .price(new BigDecimal("3499"))
                    .thumbnail("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600")
                    .demoLink("https://www.youtube.com/")
                    .features("Product catalog,Shopping cart,User auth,Order management,Admin panel,Payment ready")
                    .includedFiles("Complete source code,Database models,API documentation,Deployment guide")
                    .featured(true)
                    .build(),

                Project.builder()
                    .title("Hospital Management System")
                    .description("A comprehensive hospital management system built with Java Spring Boot and React. Manages patient records, appointments, doctor schedules, billing, and pharmacy inventory.")
                    .category("Java")
                    .technology("Java, Spring Boot, React, MySQL, Spring Security, JWT")
                    .price(new BigDecimal("4999"))
                    .thumbnail("https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600")
                    .demoLink("https://www.youtube.com/")
                    .features("Patient management,Doctor scheduling,Billing system,Pharmacy inventory,Reports generation")
                    .includedFiles("Source code,Database scripts,API docs,ERD diagram,Setup guide")
                    .featured(true)
                    .build(),

                Project.builder()
                    .title("Stock Market Prediction")
                    .description("A machine learning project that predicts stock prices using LSTM neural networks trained on historical market data. Includes an interactive dashboard for visualization.")
                    .category("AI/ML")
                    .technology("Python, Pandas, NumPy, TensorFlow, Keras, Matplotlib, Flask")
                    .price(new BigDecimal("1999"))
                    .thumbnail("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600")
                    .demoLink("https://www.youtube.com/")
                    .features("LSTM model,Historical data analysis,Price prediction,Interactive charts,REST API")
                    .includedFiles("Source code,Trained model,Jupyter notebooks,Documentation")
                    .featured(false)
                    .build(),

                Project.builder()
                    .title("Student Result Management")
                    .description("A Python Django-based web application for managing student academic results. Features grade calculation, report card generation, and an admin interface for teachers.")
                    .category("Python")
                    .technology("Python, Django, PostgreSQL, Bootstrap, Celery")
                    .price(new BigDecimal("1499"))
                    .thumbnail("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600")
                    .demoLink("https://www.youtube.com/")
                    .features("Student portal,Grade management,Report card generation,Bulk import,Email notifications")
                    .includedFiles("Source code,Database migrations,Setup guide")
                    .featured(false)
                    .build(),

                Project.builder()
                    .title("Real-Time Chat App")
                    .description("A scalable real-time chat application using the MERN stack with Socket.io. Supports private messaging, group channels, file sharing, and read receipts.")
                    .category("Full Stack")
                    .technology("MongoDB, Express, React, Node.js, Socket.io, Redis")
                    .price(new BigDecimal("2999"))
                    .thumbnail("https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600")
                    .demoLink("https://www.youtube.com/")
                    .features("Real-time messaging,Group channels,File sharing,Read receipts,Online status")
                    .includedFiles("Source code,API docs,Deployment scripts,Redis setup guide")
                    .featured(false)
                    .build()
            );

            projectRepository.saveAll(projects);
            log.info("Seeded {} sample projects.", projects.size());
        }
    }
}
