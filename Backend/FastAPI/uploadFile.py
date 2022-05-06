import datetime
import os.path
import secrets

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(BASE_DIR, 'images/')
SERVER_IMG_DIR = os.path.join('http://k6d104.p.ssafy.io:5555/', 'images/')

def uploadImg(image):
    print(BASE_DIR)
    print(IMG_DIR)
    print(SERVER_IMG_DIR)
    currentTime = datetime.datetime.now().strftime("%Y%m%d&H%M%S")
    saved_file_name = ''.join([currentTime,secrets.token_hex(16)])
    file_location = os.path.join(IMG_DIR,saved_file_name)
    with open(file_location, "wb+") as fp :
        fp.write(image.file.read())
    return SERVER_IMG_DIR+saved_file_name