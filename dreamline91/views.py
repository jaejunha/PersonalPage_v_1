# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from selenium import webdriver 
import subprocess
import threading
from PIL import Image
from bs4 import BeautifulSoup
import requests

def web():

	f = open('static/personal/txt/favorite.txt','r')
	data = []
	while True:
		line = f.readline()
		if line.find('http') == 0:
			line = line.split('\n')[0]
			data.append(line)
		if not line:
			break
	f.close()

	browser = webdriver.PhantomJS() 
	browser.set_window_size(1920, 1080)
	i = 1
	for d in data:
		browser.get(d)
		browser.save_screenshot("static/site/temp.png")
		im = Image.open('static/site/temp.png')
		if im.size[0]<=im.size[1]:
			box = (0, 0, im.size[0], im.size[0])
			region = im.crop(box)
		else:
			region = Image.new("RGBA", (im.size[0], im.size[0]), (255,255,255,0))
			region.paste(im, (0,im.size[0]-im.size[1],im.size[0],im.size[0]))
		region.save('static/site/Website'+str(i)+'.png')
		i = i+1
 
def index(request):
	t = threading.Thread(target=web)
	t.start()
	return render(request,'index.html')

def home_frame(request):
	return render(request,'home/frame.html')

def home_intro(request):
	return render(request,'home/intro.html')

def home_favorite(request):
	f = open('static/personal/txt/favorite.txt','r')
	data = []
	while True:
		line = f.readline()
		if line.find('http') == 0:
			line = line.split('\n')[0]
			data.append(line)
		if not line:
			break
	f.close()

	title = []	
	for d in data:
		res = requests.get(d)
		soup = BeautifulSoup(res.text,"html.parser")
		title.append(soup.find('title').string)

		item = zip(data, title)
	return render(request,'home/favorite.html', {'item':item})

def home_activity(request):
	return render(request,'home/activity.html')

def about_frame(request):
	return render(request,'about/frame.html')

def about_personal(request):
	f = open('static/personal/txt/personal.txt','r')
	data = []
	while True:
		line = f.readline()
		data.append(line)
		if not line:
			break
	f.close()
	return render(request,'about/personal.html', {'data': data})

def about_bucketlist(request):
	f = open('static/personal/txt/bucketlist.txt','r')
	data = []
	while True:
		line = f.readline()
		data.append(line)
		if not line:
			break
	f.close()
	return render(request,'about/bucketlist.html', {'data': data})

def about_history(request):
	f = open('static/personal/txt/history.txt','r')
	data = []
	while True:
		line = f.readline()
		data.append(line)
		if not line:
			break
	f.close()
	return render(request,'about/history.html', {'data': data})

def education(request):
	f = open('static/personal/txt/education.txt','r')
	data = []
	while True:
		line = f.readline()
		data.append(line)
		if not line:
			break
	f.close()
	return render(request,'education/education.html', {'data': data})

def local(request):
	p = subprocess.Popen('C:\\Windows\\EXPLORER.EXE /n /cwd="D:\\GitHub"')
	p.wait()
	return HttpResponse(status=204)