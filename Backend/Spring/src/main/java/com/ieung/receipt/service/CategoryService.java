package com.ieung.receipt.service;

import com.ieung.receipt.dto.req.AssetSCategoryReqDTO;
import com.ieung.receipt.dto.req.BudgetSCategoryReqDTO;
import com.ieung.receipt.dto.req.LCategoryReqDTO;
import com.ieung.receipt.dto.res.AssetSCategoryResDTO;
import com.ieung.receipt.dto.res.BudgetSCategoryResDTO;
import com.ieung.receipt.dto.res.LCategoryResDTO;
import com.ieung.receipt.entity.AssetSCategory;
import com.ieung.receipt.entity.BudgetSCategory;
import com.ieung.receipt.entity.LCategory;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.repository.AssetSCategoryRepository;
import com.ieung.receipt.repository.BudgetSCategoryRepository;
import com.ieung.receipt.repository.ClubRepository;
import com.ieung.receipt.repository.LCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    private final LCategoryRepository lCategoryRepository;
    private final BudgetSCategoryRepository budgetSCategoryRepository;
    private final AssetSCategoryRepository assetSCategoryRepository;
    private final ClubRepository clubRepository;

    /**
     * 대분류 조회
     * @param type
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
     * @param lCategoryReqDTO
     */
    @Transactional
    public void creatLCategory(LCategoryReqDTO lCategoryReqDTO){
        lCategoryRepository.save(LCategoryReqDTO.toEntity(lCategoryReqDTO));
    }

    /**
     * 예산 소분류 생성
     * @param budgetSCategoryReqDTO
     */
    @Transactional
    public void createBudgetSCategory(BudgetSCategoryReqDTO budgetSCategoryReqDTO){
        BudgetSCategory newBudgetSCategory = BudgetSCategoryReqDTO.toEntity(budgetSCategoryReqDTO, clubRepository.getById(budgetSCategoryReqDTO.getClubId()));
        int checkDuplicate = budgetSCategoryRepository.countByClubAndLcNameAndBscName(newBudgetSCategory.getClub(), newBudgetSCategory.getLcName(), newBudgetSCategory.getBscName());
        if(checkDuplicate != 0){
            throw new ApiMessageException("이미 존재하는 소분류입니다.");
        }
        BudgetSCategory resBudgetSCategory = budgetSCategoryRepository.save(newBudgetSCategory);
        if(resBudgetSCategory == null)
            throw new ApiMessageException("소분류 생성에 실패했습니다. 다시 시도해 주세요.");
    }

    /**
     * 예산 소분류 조회
     * @param clubId, lcName
     */
    public List<BudgetSCategoryResDTO> findBudgetSCList(Long clubId, String lcName){
        return budgetSCategoryRepository.findAllByClubAndLcName(clubRepository.getById(clubId), lcName);
    }

    /**
     * 예산 소분류 수정
     * @param bscId, budgetSCategoryReqDTO
     */
    public void updateBSC(Long bscId, BudgetSCategoryReqDTO budgetSCategoryReqDTO){
        BudgetSCategory originBudgetSCategory = budgetSCategoryRepository.getById(bscId);
        BudgetSCategory newBudgetSCategory = BudgetSCategoryReqDTO.toEntity(budgetSCategoryReqDTO, clubRepository.getById(budgetSCategoryReqDTO.getClubId()));
        int checkDuplicate = budgetSCategoryRepository.countByClubAndLcNameAndBscName(newBudgetSCategory.getClub(), newBudgetSCategory.getLcName(), newBudgetSCategory.getBscName());
        if(checkDuplicate!=0)
            throw new ApiMessageException("태그가 이미 존재합니다.");
        originBudgetSCategory.updateBSC(newBudgetSCategory);
        budgetSCategoryRepository.save(originBudgetSCategory);
    }

    /**
     * 예산 소분류 삭제
     * @param bscId
     */
    @Transactional
    public void deleteBSC(Long bscId){ budgetSCategoryRepository.deleteById(bscId); }

    /**
     * 자산 소분류 생성
     * @param assetSCategoryReqDTO
     */
    @Transactional
    public void createAssetSCategory(AssetSCategoryReqDTO assetSCategoryReqDTO){
        AssetSCategory newAssetSCategory = AssetSCategoryReqDTO.toEntity(assetSCategoryReqDTO, clubRepository.getById(assetSCategoryReqDTO.getClubId()));
        int checkDuplicate = assetSCategoryRepository.countByClubAndLcNameAndAscName(newAssetSCategory.getClub(), newAssetSCategory.getLcName(), newAssetSCategory.getAscName());
        if(checkDuplicate != 0){
            throw new ApiMessageException("이미 존재하는 소분류입니다.");
        }
        AssetSCategory resAssetSCategory = assetSCategoryRepository.save(newAssetSCategory);
        if(resAssetSCategory == null)
            throw new ApiMessageException("소분류 생성에 실패했습니다. 다시 시도해 주세요.");
    }

    /**
     * 자산 소분류 조회
     * @param clubId, lcName
     */
    public List<AssetSCategoryResDTO> findAssetSCList(Long clubId, String lcName){
        return assetSCategoryRepository.findAllByClubAndLcName(clubRepository.getById(clubId), lcName);
    }

    /**
     * 자산 소분류 수정
     * @param ascId, assetSCategoryReqDTO
     */
    @Transactional
    public void updateASC(Long ascId, AssetSCategoryReqDTO assetSCategoryReqDTO){
        AssetSCategory originAssetSCategory = assetSCategoryRepository.getById(ascId);
        AssetSCategory newAssetSCategory = AssetSCategoryReqDTO.toEntity(assetSCategoryReqDTO, clubRepository.getById(assetSCategoryReqDTO.getClubId()));
        int checkDuplicate = assetSCategoryRepository.countByClubAndLcNameAndAscName(newAssetSCategory.getClub(), newAssetSCategory.getLcName(), newAssetSCategory.getAscName());
        if(checkDuplicate!=0)
            throw new ApiMessageException("태그가 이미 존재합니다.");
        originAssetSCategory.updateASC(newAssetSCategory);
        assetSCategoryRepository.save(originAssetSCategory);
    }

    /**
     * 자산 잔액 업데이트
     * @param ascId, balance
     */
    @Transactional
    public void updateBalance(Long ascId, int balance){
        AssetSCategory originAssetSCategory = assetSCategoryRepository.getById(ascId);
        originAssetSCategory.updateBalance(balance);
        assetSCategoryRepository.save(originAssetSCategory);
    }

    /**
     * 자산 소분류 삭제
     * @param ascId
     */
    @Transactional
    public void deleteASC(Long ascId){ assetSCategoryRepository.deleteById(ascId); }
}
