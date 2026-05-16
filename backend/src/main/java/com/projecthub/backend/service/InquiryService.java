package com.projecthub.backend.service;

import com.projecthub.backend.dto.DashboardStats;
import com.projecthub.backend.dto.InquiryRequest;
import com.projecthub.backend.dto.InquiryResponse;
import com.projecthub.backend.entity.InquiryStatus;

import java.util.List;

public interface InquiryService {
    InquiryResponse createInquiry(InquiryRequest request);
    List<InquiryResponse> getAllInquiries();
    List<InquiryResponse> getInquiriesByStatus(InquiryStatus status);
    InquiryResponse updateInquiryStatus(Long id, InquiryStatus status);
    DashboardStats getDashboardStats();
    List<InquiryResponse> getInquiriesByUserId(Long userId);
    InquiryResponse updateGithubUsername(Long id, String githubUsername);
}
