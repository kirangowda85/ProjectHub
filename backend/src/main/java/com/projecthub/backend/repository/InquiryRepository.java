package com.projecthub.backend.repository;

import com.projecthub.backend.entity.Inquiry;
import com.projecthub.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findByUserOrderByIdDesc(User user);
}
