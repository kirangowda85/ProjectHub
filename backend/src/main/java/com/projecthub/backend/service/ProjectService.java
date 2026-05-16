package com.projecthub.backend.service;

import com.projecthub.backend.dto.ProjectRequest;
import com.projecthub.backend.dto.ProjectResponse;

import java.util.List;

public interface ProjectService {
    List<ProjectResponse> getAllProjects();
    List<ProjectResponse> getFeaturedProjects();
    List<ProjectResponse> getProjectsByCategory(String category);
    ProjectResponse getProjectById(Long id);
    ProjectResponse createProject(ProjectRequest request);
    ProjectResponse updateProject(Long id, ProjectRequest request);
    void deleteProject(Long id);
}
