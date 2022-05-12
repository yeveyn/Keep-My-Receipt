package com.ieung.receipt.service;

import com.ieung.receipt.dto.req.LCategoryReqDTO;
import com.ieung.receipt.dto.res.LCategoryResDTO;
import com.ieung.receipt.entity.LCategory;
import com.ieung.receipt.repository.LCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    private LCategoryRepository lCategoryRepository;

    /**
     * 대분류 조회
     * @Param type
     */
    public List<LCategoryResDTO> getLCategoryByType(String type){
        List<LCategory> lCategoryList = lCategoryRepository.findAll();
        List<LCategoryResDTO> lCategoryResDTOList = new ArrayList<>();
        for(LCategory lCategory : lCategoryList){
            lCategoryResDTOList.add(LCategoryResDTO.of(lCategory));
        }
        return lCategoryResDTOList;
    }

    /**
     * 대분류 생성
     * @Param lCategoryReqDTO
     */
    public void creatLCategory(LCategoryReqDTO lCategoryReqDTO){
        lCategoryRepository.save(LCategoryReqDTO.toEntity(lCategoryReqDTO));
    }
}
