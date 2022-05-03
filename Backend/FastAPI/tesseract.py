from imutils.perspective import four_point_transform
from imutils.contours import sort_contours
import matplotlib.pyplot as plt
import pytesseract
import imutils
import cv2
import re
import requests
import numpy as np

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
    cv2.imshow("outline", image)
    cv2.imshow("result", transform_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    return transform_image

def tesseractOCR(receipt, type):
    image = uploadFileToNumpyArray(receipt)
    if type == "pic":
        img = findContour(image)
    text = pytesseract.image_to_string(cv2.cvtColor(image, cv2.COLOR_BGR2RGB), lang='kor+eng')

    return text