package com.ieung.receipt.repository;

import com.ieung.receipt.dto.res.TagResDTO;
import com.ieung.receipt.entity.Club;
import com.ieung.receipt.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<TagResDTO> findTagsByClubAndTagLevel(Club club, int tagLevel);
    List<TagResDTO> findTagsByClubAndParentTag(Club club, String parentTag);
    void deleteTagByClubAndTagName(Club club, String tagName);
}
