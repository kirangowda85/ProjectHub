package com.projecthub.backend.dto;

import com.projecthub.backend.entity.Inquiry;
import com.projecthub.backend.entity.InquiryStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InquiryResponse {
    private Long id;
    private Long projectId;
    private String projectTitle;
    private String projectThumbnail;
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String college;
    private String message;
    private String githubUsername;
    private String privateGithubLink;
    private InquiryStatus status;
    private LocalDateTime createdAt;

    public static InquiryResponse from(Inquiry inquiry) {
        InquiryResponse res = new InquiryResponse();
        res.setId(inquiry.getId());
        res.setProjectId(inquiry.getProject().getId());
        res.setProjectTitle(inquiry.getProject().getTitle());
        res.setProjectThumbnail(inquiry.getProject().getThumbnail());
        res.setUserId(inquiry.getUser() != null ? inquiry.getUser().getId() : null);
        res.setName(inquiry.getName());
        res.setEmail(inquiry.getEmail());
        res.setPhone(inquiry.getPhone());
        res.setCollege(inquiry.getCollege());
        res.setMessage(inquiry.getMessage());
        res.setGithubUsername(inquiry.getGithubUsername());
        
        // Only show GitHub link if status is COMPLETED
        if (inquiry.getStatus() == InquiryStatus.COMPLETED) {
            res.setPrivateGithubLink(inquiry.getProject().getPrivateGithubLink());
        }
        
        res.setStatus(inquiry.getStatus());
        res.setCreatedAt(inquiry.getCreatedAt());
        return res;
    }
}
