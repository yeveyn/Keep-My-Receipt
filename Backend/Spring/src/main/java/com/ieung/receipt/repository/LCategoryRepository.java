package com.ieung.receipt.repository;

import com.ieung.receipt.entity.LCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LCategoryRepository extends JpaRepository<LCategory, Long> {
}
