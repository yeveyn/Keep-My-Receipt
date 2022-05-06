from imutils.perspective import four_point_transform
import matplotlib.pyplot as plt
import pytesseract
import imutils
import cv2
import numpy as np
import re
from uploadFile import uploadImg
from datetime import datetime

# UploadFile 형식을 numpy array 형식으로 변환
def uploadFileToNumpyArray(imgSrc):
    image_nparray = np.asarray(bytearray(imgSrc), dtype=np.uint8)
    org_image = cv2.imdecode(image_nparray, cv2.IMREAD_COLOR)
    return org_image

# 영수증의 윤곽선을 찾고 윤곽선에 맞는 이미지로 변환
def findContour(image):
    ratio = image.shape[0] / 500.0
    org_image = image.copy()
    image = imutils.resize(image, height=500)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(gray, 0, 40)

    cnts = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)[:5]

    screenCnt = None

    for c in cnts:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)

        if len(approx) == 4:
            screenCnt = approx
            break

    if screenCnt is None:
        raise Exception("Could not find outline.")

    cv2.drawContours(image, [screenCnt], -1, (0, 255, 0), 2)
    transform_image = four_point_transform(org_image, screenCnt.reshape(4, 2)*ratio)

    return transform_image



def tesseractOCR(receipt, type):
    imgUrl = uploadImg(receipt)
    image = uploadFileToNumpyArray(receipt)
    if type == "pic":
        image = findContour(image)
    configs = r'--oem 3 --psm 6'
    text = pytesseract.image_to_string(image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB), config=configs, lang='kor+eng')
    text_list = text.split("\n")
    text_list = list(filter(("").__ne__, text_list))

    totalPrice = ""
    dealDate = ""

    for text in text_list:
        replaceText = text.replace(" ","")
        if replaceText.find("받을금액")!=-1:
            replaceText = replaceText[replaceText.find("받을금액")+4:]
            totalPrice = replaceText
        elif replaceText.find("승인금액")!=-1:
            replaceText = replaceText[replaceText.find("승인금액")+4:]
            totalPrice = replaceText
        elif replaceText.find("합계")!=-1:
            replaceText = replaceText[replaceText.find("합계")+2:]
            totalPrice = replaceText
        elif replaceText.find("결제액")!=-1:
            replaceText = replaceText[replaceText.find("결제액")+3:]
            totalPrice = replaceText

        if replaceText.find("일시")!=-1 or replaceText.find("판매일")!=-1 or replaceText.find("2022")!=-1 :
            dealDateList = text.split(" ")
            dealDateList = list(filter(("").__ne__, dealDateList))
            dateFlag = False
            timeFlag = False
            for dealDateItem in dealDateList:
                if dealDateItem[0] >= '0' and dealDateItem[0] <= '9' :
                    if dateFlag == False :
                        dateFlag = True
                        dealDateItem = dealDateItem.replace(".", "/")
                        dealDateItem = dealDateItem.replace("-", "/")
                        dealDate += dealDateItem + " "
                    elif timeFlag == False :
                        timeFlag = True
                        dealDate += dealDateItem


    format_data = "%y/%m/%d %H:%M:%S"
    # dealDate = datetime.strptime(dealDate, format_data)

    totalPrice = re.sub(r'[^0-9]', '', totalPrice)
    return {"금액":totalPrice, "거래날짜":dealDate, "이미지 url":imgUrl}
    # print(totalPrice + ", " + dealDate)
    # return text_list