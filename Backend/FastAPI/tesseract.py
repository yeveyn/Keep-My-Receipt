import numpy as np
import pytesseract
import cv2
import matplotlib.pyplot as plt

# Convert UploadFile to numpyArray
def load_image_into_numpy_array(img):
    npimg = np.frombuffer(img, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    return frame

def tesseractOCR(receipt):
    rgb_receipt = load_image_into_numpy_array(receipt)
    # rgb_receipt = cv2.cvtColor(receipt, cv2.COLOR_BGR2RGB)

    # use Tesseract to OCR the image
    text = pytesseract.image_to_string(rgb_receipt, lang="kor+eng")

    return text