package com.projecthub.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String technology;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    private String thumbnail;

    @Column(columnDefinition = "TEXT")
    private String screenshots; // Comma-separated URLs

    private String demoLink;

    @Column(columnDefinition = "TEXT")
    private String features; // Comma-separated features

    @Column(columnDefinition = "TEXT")
    private String includedFiles; // e.g., Source Code, Documentation, etc.

    @Builder.Default
    private Boolean featured = false;

    private String privateGithubLink;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
