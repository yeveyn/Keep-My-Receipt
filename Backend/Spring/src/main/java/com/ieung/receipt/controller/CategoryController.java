package com.ieung.receipt.controller;

import com.ieung.receipt.dto.req.LCategoryReqDTO;
import com.ieung.receipt.dto.res.LCategoryResDTO;
import com.ieung.receipt.service.CategoryService;
import com.ieung.receipt.service.common.CommonResult;
import com.ieung.receipt.service.common.ListResult;
import com.ieung.receipt.service.common.ResponseService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/spring")
public class CategoryController {
    private final CategoryService categoryService;
    private final ResponseService responseService;

    /**
     * 대분류 생성 : post /lcategory
     * 대분류 조회 : get /lcategory/{type}
     */

    // 대분류 생성
    @Operation(summary = "대분류 생성", description = "사용자가 사용 X")
    @PostMapping(value = "/lcategory", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult createLCategory(@Valid @RequestBody LCategoryReqDTO lCategoryReqDTO) throws Exception{
        categoryService.creatLCategory(lCategoryReqDTO);
        return responseService.getSuccessResult();
    }

    // 대분류 조회
    @Operation(summary = "대분류 조회", description = "유형을 기준으로 대분류 조회")
    @GetMapping(value = "/lcategory/{type}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ListResult getLCategory(@PathVariable @NotBlank String type) throws Exception{
        List<LCategoryResDTO> lCategoryResDTOList = categoryService.getLCategoryByType(type);
        return responseService.getListResult(lCategoryResDTOList);
    }
}
