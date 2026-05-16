package com.projecthub.backend.dto;

import com.projecthub.backend.entity.Project;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProjectResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String technology;
    private BigDecimal price;
    private String thumbnail;
    private String screenshots;
    private String demoLink;
    private String features;
    private String includedFiles;
    private Boolean featured;
    private LocalDateTime createdAt;

    public static ProjectResponse from(Project project) {
        ProjectResponse res = new ProjectResponse();
        res.setId(project.getId());
        res.setTitle(project.getTitle());
        res.setDescription(project.getDescription());
        res.setCategory(project.getCategory());
        res.setTechnology(project.getTechnology());
        res.setPrice(project.getPrice());
        res.setThumbnail(project.getThumbnail());
        res.setScreenshots(project.getScreenshots());
        res.setDemoLink(project.getDemoLink());
        res.setFeatures(project.getFeatures());
        res.setIncludedFiles(project.getIncludedFiles());
        res.setFeatured(project.getFeatured());
        res.setCreatedAt(project.getCreatedAt());
        return res;
    }
}
