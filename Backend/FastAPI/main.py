from fastapi import FastAPI, File, UploadFile
from tesseract import tesseractOCR

app = FastAPI()


@app.post("/fast/ocr/receipt")
async def analysisReceipt(receipt : UploadFile = File(...)):
    text = tesseractOCR(receipt.file.read())
    return {"message": text}
