from fastapi import FastAPI, File, UploadFile
from starlette.responses import FileResponse
import os.path

from tesseract import tesseractOCR
from uploadFile import uploadImg

app = FastAPI()

@app.post("/fast/ocr/receipt/photo")
async def analysisReceipt(receipt : UploadFile = File(...)):
    result = tesseractOCR(receipt.file.read(), "pic")
    return result

@app.post("/fast/ocr/receipt/img")
async def analysisReceipt(receipt : UploadFile = File(...)):
    result = tesseractOCR(receipt.file.read(), "img")
    return result

@app.post("/fast/uploadImage")
async def uploadImage(image: UploadFile = File(...)):
    return uploadImg(image)

@app.get('/images/{fileName}')
def getImage(fileName : str):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    IMG_DIR = os.path.join(BASE_DIR, 'images/')
    return FileResponse(''.join([IMG_DIR, fileName]))