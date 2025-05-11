#!/bin/bash
# install the necessary packages.
sudo apt update -y && sudo apt upgrade -y
sudo install -y nginx
sudo apt install -y python3-pip
sudo apt install -y python3-venv
sudo apt install -y gunicorn
sudo apt install -y 
sudo apt install -y gedit
sudo apt install -y tesseract-ocr tesseract-ocr-deu tesseract-ocr-vie tesseract-ocr-fra


# install docker
sudo apt install -y docker-io
sudo usermod -aG docker myname

docker --version
# Restart your terminal or log out and log back in 

# Interactive commands
sudo systemctl enable nginx
sudo systemctl restart nginx
 

cd /usr/bin
sudo ln -s python3 python

cd
python -m venv venv
. venv/bin/activate
(venv)
python -m pip install –-upgrade pip
pip install -r requirements.txt

