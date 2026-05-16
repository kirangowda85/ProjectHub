package com.projecthub.backend.service;

import com.projecthub.backend.dto.DashboardStats;
import com.projecthub.backend.dto.InquiryRequest;
import com.projecthub.backend.dto.InquiryResponse;
import com.projecthub.backend.entity.Inquiry;
import com.projecthub.backend.entity.InquiryStatus;
import com.projecthub.backend.entity.Project;
import com.projecthub.backend.entity.User;
import com.projecthub.backend.repository.InquiryRepository;
import com.projecthub.backend.repository.ProjectRepository;
import com.projecthub.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService {

    private final InquiryRepository inquiryRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public InquiryResponse createInquiry(InquiryRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + request.getProjectId()));

        User user = null;
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId()).orElse(null);
        }

        Inquiry inquiry = Inquiry.builder()
                .project(project)
                .user(user)
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .college(request.getCollege())
                .message(request.getMessage())
                .build();

        return InquiryResponse.from(inquiryRepository.save(inquiry));
    }

    @Override
    public List<InquiryResponse> getAllInquiries() {
        return inquiryRepository.findAll()
                .stream()
                .map(InquiryResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public List<InquiryResponse> getInquiriesByStatus(InquiryStatus status) {
        // Implementation might need update in repository to support this if not present
        // For now using findAll and filter if status repo method not there
        return inquiryRepository.findAll().stream()
                .filter(i -> i.getStatus() == status)
                .map(InquiryResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public InquiryResponse updateInquiryStatus(Long id, InquiryStatus status) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inquiry not found with id: " + id));
        inquiry.setStatus(status);
        return InquiryResponse.from(inquiryRepository.save(inquiry));
    }

    @Override
    public DashboardStats getDashboardStats() {
        long total = inquiryRepository.count();
        long pending = countByStatus(InquiryStatus.PENDING);
        long contacted = countByStatus(InquiryStatus.CONTACTED);
        long paid = countByStatus(InquiryStatus.PAID);
        long completed = countByStatus(InquiryStatus.COMPLETED);
        long totalProjects = projectRepository.count();

        return new DashboardStats(totalProjects, total, pending, contacted, paid, completed);
    }

    @Override
    public List<InquiryResponse> getInquiriesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return inquiryRepository.findByUserOrderByIdDesc(user)
                .stream()
                .map(InquiryResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public InquiryResponse updateGithubUsername(Long id, String githubUsername) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inquiry not found"));
        inquiry.setGithubUsername(githubUsername);
        return InquiryResponse.from(inquiryRepository.save(inquiry));
    }

    private long countByStatus(InquiryStatus status) {
        return inquiryRepository.findAll().stream()
                .filter(i -> i.getStatus() == status)
                .count();
    }
}
