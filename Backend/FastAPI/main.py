from fastapi import FastAPI, File, UploadFile
from tesseract import tesseractOCR

app = FastAPI()

@app.post("/fast/ocr/receiptPic")
async def analysisReceipt(receipt : UploadFile = File(...)):
    text = tesseractOCR(receipt.file.read(), "pic")
    return {"message": text}

@app.post("/fast/ocr/receiptImg")
async def analysisReceipt(receipt : UploadFile = File(...)):
    text = tesseractOCR(receipt.file.read(), "img")
    return {"message": text}