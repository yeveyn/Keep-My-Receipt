package com.ieung.receipt.repository;

import com.ieung.receipt.code.AuthCode;
import com.ieung.receipt.entity.ClubCrew;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubCrewRepoCommon {
    Optional<ClubCrew> findByClubIdAndCrewId(Long crewId, Long clubId); // 특정 모임 조회
    Long findCountByClubId(Long clubId); // 모임별 인원 조회
    AuthCode findAuthCodeByClubIdAndCrewId(long crewId, long clubId); // 모임별 회원 권한 확인
    Boolean findExistByClubIdAndCrewId(Long clubId, Long crewId);    // 가입 여부 확인
    Page<ClubCrew> findAllByClubId(Long clubId, Pageable pageable);  // 모임별 회원 조회
    Page<ClubCrew> findRequestsByClubId(Long clubId, Pageable pageable); // 모임별 가입 신청 회원 조회
}






































