package com.projecthub.backend.controller;

import com.projecthub.backend.dto.DashboardStats;
import com.projecthub.backend.dto.InquiryRequest;
import com.projecthub.backend.dto.InquiryResponse;
import com.projecthub.backend.entity.InquiryStatus;
import com.projecthub.backend.service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping
    public ResponseEntity<InquiryResponse> createInquiry(@Valid @RequestBody InquiryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inquiryService.createInquiry(request));
    }

    @GetMapping
    public ResponseEntity<List<InquiryResponse>> getAllInquiries(
            @RequestParam(required = false) InquiryStatus status) {
        if (status != null) {
            return ResponseEntity.ok(inquiryService.getInquiriesByStatus(status));
        }
        return ResponseEntity.ok(inquiryService.getAllInquiries());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<InquiryResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        InquiryStatus status = InquiryStatus.valueOf(body.get("status").toUpperCase());
        return ResponseEntity.ok(inquiryService.updateInquiryStatus(id, status));
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(inquiryService.getDashboardStats());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InquiryResponse>> getUserInquiries(@PathVariable Long userId) {
        return ResponseEntity.ok(inquiryService.getInquiriesByUserId(userId));
    }

    @PatchMapping("/{id}/github")
    public ResponseEntity<InquiryResponse> updateGithub(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(inquiryService.updateGithubUsername(id, body.get("githubUsername")));
    }
}
