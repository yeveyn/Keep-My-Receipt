from fastapi import FastAPI, File, UploadFile
from tesseract import tesseractOCR

app = FastAPI()

@app.post("/fast/ocr/receipt/photo")
async def analysisReceipt(receipt : UploadFile = File(...)):
    result = tesseractOCR(receipt.file.read(), "pic")
    return result

@app.post("/fast/ocr/receipt/img")
async def analysisReceipt(receipt : UploadFile = File(...)):
    result = tesseractOCR(receipt.file.read(), "img")
    return result