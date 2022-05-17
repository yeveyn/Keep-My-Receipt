package com.ieung.receipt.service;

import com.ieung.receipt.dto.res.ReportResDTO;
import com.ieung.receipt.dto.res.SmallCategoryResDTO;
import com.ieung.receipt.entity.Asset;
import com.ieung.receipt.exception.ApiMessageException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class ExcelService {
    public SXSSFWorkbook toExcel(YearMonth date, Map<String, Map<String, List<SmallCategoryResDTO>>> map, String title) {
        List<String>  typeList =  new ArrayList<>(Arrays.asList("자산", "예산", "수입", "지출"));

        SXSSFWorkbook wb = new SXSSFWorkbook();
        Sheet sheet = wb.createSheet(title);
        Row row = null;

        int rowNum = 0;

        // cellStyle 생성
        XSSFCellStyle centerStyle = createCellStyle(wb, "CENTER", null, false, 0);
        XSSFCellStyle rightStyle = createCellStyle(wb, "RIGHT", null, false, 0);
        XSSFCellStyle rightBoldStyle = createCellStyle(wb, "RIGHT", null, true, 0);
        XSSFCellStyle lcTotalStyle = createCellStyle(wb, "CENTER", null, true, 0);
        XSSFCellStyle typeTotalStyle = createCellStyle(wb, "CENTER", new XSSFColor(new byte[] {(byte) 169,(byte) 208,(byte) 142}, null), true, 0);
        XSSFCellStyle typeTotalNumStyle = createCellStyle(wb, "RIGHT", new XSSFColor(new byte[] {(byte) 169,(byte) 208,(byte) 142}, null), true, 0);
        XSSFCellStyle typeStyle = createCellStyle(wb, "CENTER", new XSSFColor(new byte[] {(byte) 237,(byte) 237,(byte) 237}, null), false, 0);
        XSSFCellStyle lcStyle = createCellStyle(wb, "CENTER", new XSSFColor(new byte[] {(byte) 198,(byte) 224,(byte) 180}, null), false, 0);
        XSSFCellStyle headerStyle = createCellStyle(wb, "CENTER", null, true, 500);

        sheet.setColumnWidth(0, 8000);
        sheet.setColumnWidth(1, 6000);

        // Header
        row = sheet.createRow(rowNum++);
        createCell(row, headerStyle, title, 0);
        row = sheet.createRow(rowNum++);
        sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 1));

        row = sheet.createRow(rowNum++);
        createCell(row, centerStyle, date.toString(), 0);
        sheet.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum - 1, 0, 1));

        row = sheet.createRow(rowNum++);
        createCell(row, rightStyle, "(단위: 원)", 0);
        sheet.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum - 1, 0, 1));

        for (String type : typeList) {
            if (!map.containsKey(type)) {
                continue;
            }

            RegionUtil.setBorderBottom(BorderStyle.THIN, CellRangeAddress.valueOf("A"+(rowNum - 1)+":"+"B"+(rowNum -1) ), sheet);

            row = sheet.createRow(rowNum++);
            createCell(row, typeStyle, type, 0);
            sheet.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum - 1, 0, 1));
            row = sheet.createRow(rowNum++);
            createCell(row, typeStyle, "항목", 0);
            createCell(row, typeStyle, "금액", 1);

            int typeTotal = 0;
            int startRow = rowNum;

            for (String lcName : map.get(type).keySet()) {
                int lcTotal = 0;

                row = sheet.createRow(rowNum++);
                createCell(row, lcStyle, lcName, 0);
                sheet.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum - 1, 0, 1));

                for (SmallCategoryResDTO smallCategoryResDTO : map.get(type).get(lcName)) {
                    row = sheet.createRow(rowNum++);
                    createCell(row, null, smallCategoryResDTO.getScName(), 0);
                    createCell(row, null, smallCategoryResDTO.getBalance(), 1);

                    lcTotal += smallCategoryResDTO.getBalance();
                }

                row = sheet.createRow(rowNum++);
                createCell(row, lcTotalStyle, "계", 0);
                createCell(row, rightBoldStyle, lcTotal, 1);

                typeTotal += lcTotal;
            }

            row = sheet.createRow(rowNum++);
            createCell(row, typeTotalStyle, "총 " + type, 0);
            createCell(row, typeTotalNumStyle, typeTotal, 1);

            RegionUtil.setBorderLeft(BorderStyle.THIN, CellRangeAddress.valueOf("A"+startRow+":"+"A"+(rowNum -1)), sheet);
            RegionUtil.setBorderRight(BorderStyle.THIN, CellRangeAddress.valueOf("B"+startRow+":"+"B"+(rowNum -1)), sheet);
            RegionUtil.setBorderBottom(BorderStyle.THIN, CellRangeAddress.valueOf("A"+(rowNum - 1)+":"+"B"+(rowNum -1) ), sheet);
        }

        return wb;
    }

    public void createCell(Row row, XSSFCellStyle style, String value, int columnNum) {
        Cell cell = row.createCell(columnNum);
        cell.setCellValue(value);

        if (style != null) {
            cell.setCellStyle(style);
        }
    }

    public void createCell(Row row, XSSFCellStyle style, int value, int columnNum) {
        Cell cell = row.createCell(columnNum);
        cell.setCellValue(value);

        if (style != null) {
            cell.setCellStyle(style);
        }
    }

    public XSSFCellStyle createCellStyle(SXSSFWorkbook wb, String align, XSSFColor color, boolean isBold, int height) {
        XSSFCellStyle style = (XSSFCellStyle) wb.createCellStyle();

        if (align.equals("CENTER")) {
            style.setAlignment(HorizontalAlignment.CENTER);
        } else if (align.equals("LEFT")) {
            style.setAlignment(HorizontalAlignment.LEFT);
        } else {
            style.setAlignment(HorizontalAlignment.RIGHT);
        }

        if (color != null) {
            style.setFillForegroundColor(color);
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }

        if (isBold || height != 0) {
            Font font = wb.createFont();
            font.setFontName("맑은 고딕");

            if (height != 0) {
                font.setFontHeight((short)height);
            }

            if (isBold) {
                font.setBold(true);
            }

            style.setFont(font);
        }

        return style;
    }
}
