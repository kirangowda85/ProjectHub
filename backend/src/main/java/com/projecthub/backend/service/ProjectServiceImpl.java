package com.projecthub.backend.service;

import com.projecthub.backend.dto.ProjectRequest;
import com.projecthub.backend.dto.ProjectResponse;
import com.projecthub.backend.entity.Project;
import com.projecthub.backend.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(ProjectResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrue()
                .stream()
                .map(ProjectResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByCategory(String category) {
        return projectRepository.findByCategory(category)
                .stream()
                .map(ProjectResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));
        return ProjectResponse.from(project);
    }

    @Override
    public ProjectResponse createProject(ProjectRequest request) {
        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .technology(request.getTechnology())
                .price(request.getPrice())
                .thumbnail(request.getThumbnail())
                .screenshots(request.getScreenshots())
                .demoLink(request.getDemoLink())
                .features(request.getFeatures())
                .includedFiles(request.getIncludedFiles())
                .featured(request.getFeatured() != null ? request.getFeatured() : false)
                .build();
        return ProjectResponse.from(projectRepository.save(project));
    }

    @Override
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setCategory(request.getCategory());
        project.setTechnology(request.getTechnology());
        project.setPrice(request.getPrice());
        project.setThumbnail(request.getThumbnail());
        project.setScreenshots(request.getScreenshots());
        project.setDemoLink(request.getDemoLink());
        project.setFeatures(request.getFeatures());
        project.setIncludedFiles(request.getIncludedFiles());
        if (request.getFeatured() != null) {
            project.setFeatured(request.getFeatured());
        }

        return ProjectResponse.from(projectRepository.save(project));
    }

    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new EntityNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }
}
