import copy

from fastapi import FastAPI, File, UploadFile
from starlette.responses import FileResponse
import os.path

from tesseract import tesseractOCR
from uploadFile import uploadImg

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(BASE_DIR, 'images/')

@app.post("/fast/ocr/receipt/photo")
async def analysisReceipt(receipt : UploadFile = File(...)):
    receiptSrc = uploadImage(receipt)
    receiptName = receiptSrc['file_name']
    result = tesseractOCR(IMG_DIR + receiptName, "pic")
    result['이미지 url'] = receiptSrc['file']
    return result

@app.post("/fast/ocr/receipt/img")
async def analysisReceipt(receipt : UploadFile = File(...)):
    receiptSrc = uploadImage(receipt)
    receiptName = receiptSrc['file_name']
    result = tesseractOCR(IMG_DIR + receiptName, "img")
    result['이미지 url'] = receiptSrc['file']
    return result

@app.post("/fast/uploadImage")
def uploadImage(image: UploadFile = File(...)):
    return uploadImg(image)

@app.get('/images/{fileName}')
def getImage(fileName : str):
    return FileResponse(''.join([IMG_DIR, fileName]))