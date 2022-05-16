package com.ieung.receipt.controller;

import com.ieung.receipt.dto.res.ChartResDTO;
import com.ieung.receipt.service.ChartService;
import com.ieung.receipt.service.common.CommonResult;
import com.ieung.receipt.service.common.ResponseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.time.YearMonth;
import java.util.List;

@Tag(name = "11. 차트")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/spring")
public class ChartController {
    private final ChartService chartService;
    private final ResponseService responseService;

    /**
     * 1차 차트 데이터 : get /chart/{clubId}/{yearMonth}
     * 2차 차트 데이터 : get /chart/{clubId}/{yearMonth}/{parentTag}
     */

    @Operation(summary = "1차 차트", description = "1차 차트 데이터")
    @GetMapping(value = "/chart/{clubId}/{yearMonth}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult getFirstChart(@PathVariable @NotBlank Long clubId, @PathVariable @NotBlank YearMonth yearMonth){
        List<ChartResDTO> chartResDTOList = chartService.getParentChartData(clubId, yearMonth);
        return responseService.getListResult(chartResDTOList);
    }

    @Operation(summary = "2차 차트", description = "2차 차트 데이터")
    @GetMapping(value = "/chart/{clubId}/{yearMonth}/{parentTag}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody CommonResult getSecondChart(@PathVariable @NotBlank Long clubId, @PathVariable @NotBlank YearMonth yearMonth, @PathVariable @NotBlank String parentTag){
        List<ChartResDTO> chartResDTOList = chartService.getChildChartData(clubId, yearMonth, parentTag);
        return responseService.getListResult(chartResDTOList);
    }
}
