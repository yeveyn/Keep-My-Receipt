import datetime
import os.path
import secrets

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(BASE_DIR, 'images/')
SERVER_IMG_DIR = os.path.join('http://localhost:5555/', 'static/')

def uploadImg(image):
    currentTime = datetime.datetime.now().strftime("%Y%m%d&H%M%S")
    saved_file_name = ''.join([currentTime,secrets.token_hex(16)])
    file_location = os.path.join(IMG_DIR,saved_file_name)
    with open(file_location, "wb+") as file_object :
        file_object.write(image.file.read())
    return SERVER_IMG_DIR+saved_file_name
