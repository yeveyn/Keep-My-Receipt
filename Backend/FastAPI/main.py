from fastapi import FastAPI, File, UploadFile
from tesseract import tesseractOCR

app = FastAPI()


@app.post("/fast/ocr/receipt")
async def analysisReceipt(file : UploadFile = File(...)):
    text = tesseractOCR(file)
    return {"message": text}
