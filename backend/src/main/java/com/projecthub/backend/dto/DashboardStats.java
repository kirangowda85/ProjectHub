package com.projecthub.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStats {
    private long totalProjects;
    private long totalInquiries;
    private long pendingInquiries;
    private long contactedInquiries;
    private long paidInquiries;
    private long completedInquiries;
}
