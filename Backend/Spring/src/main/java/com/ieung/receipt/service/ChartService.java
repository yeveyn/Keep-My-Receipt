package com.ieung.receipt.service;

import com.ieung.receipt.dto.res.ChartResDTO;
import com.ieung.receipt.dto.res.TagResDTO;
import com.ieung.receipt.entity.TransactionDetail;
import com.ieung.receipt.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChartService {
    private final TransactionDetailRepository transactionDetailRepository;

    /**
     * 부모태그 차트
     * @param clubId, yearMonth
     */
    public List<ChartResDTO> getParentChartData(Long clubId, YearMonth yearMonth){
        List<ChartResDTO> chartResDTOList = new ArrayList<ChartResDTO>();
        List<TransactionDetail> transactionDetailList = transactionDetailRepository.findByPayDate(clubId, yearMonth);

        int totalCost = 0;

        for(TransactionDetail transactionDetail : transactionDetailList){
            if(transactionDetail.getPrice()>0) continue;
            ChartResDTO chartResDTO = ChartResDTO.builder()
                    .tagName(transactionDetail.getLargeTag()!=null?transactionDetail.getLargeTag():"기타")
                    .percentage(0)
                    .cost(transactionDetail.getPrice()*-1)
                    .build();
            int idx = chartResDTOList.indexOf(chartResDTO);
            if(idx != -1){
                chartResDTOList.get(idx).setCost(chartResDTOList.get(idx).getCost()+chartResDTO.getCost());
            } else chartResDTOList.add(chartResDTO);
            totalCost += chartResDTO.getCost();
        }

        for(int i=0; i<chartResDTOList.size(); i++){
            chartResDTOList.get(i).setPercentage(chartResDTOList.get(i).getCost()/totalCost * 100);
            chartResDTOList.get(i).setTotalCost(totalCost);
        }

        return chartResDTOList;
    }

    /**
     * 자식태그 차트
     * @param clubId, yearMonth, parentTag
     */
    public List<ChartResDTO> getChildChartData(Long clubId, YearMonth yearMonth, String parentTag){
        List<ChartResDTO> chartResDTOList = new ArrayList<ChartResDTO>();
        List<TransactionDetail> transactionDetailList = transactionDetailRepository.findByPayDate(clubId, yearMonth);

        int totalCost = 0;

        for(TransactionDetail transactionDetail : transactionDetailList){
            if(transactionDetail.getPrice()>0) continue;
            if(!transactionDetail.getLargeTag().equals(parentTag)) continue;
            ChartResDTO chartResDTO = ChartResDTO.builder()
                    .tagName(transactionDetail.getSmallTag()!=null?transactionDetail.getSmallTag():"기타")
                    .percentage(0)
                    .cost(transactionDetail.getPrice()*-1)
                    .build();
            int idx = chartResDTOList.indexOf(chartResDTO);
            if(idx != -1){
                chartResDTOList.get(idx).setCost(chartResDTOList.get(idx).getCost()+chartResDTO.getCost());
            } else chartResDTOList.add(chartResDTO);
            totalCost += chartResDTO.getCost();
        }

        for(int i=0; i<chartResDTOList.size(); i++){
            chartResDTOList.get(i).setPercentage(chartResDTOList.get(i).getCost()/totalCost * 100);
            chartResDTOList.get(i).setTotalCost(totalCost);
        }

        return chartResDTOList;
    }
}
