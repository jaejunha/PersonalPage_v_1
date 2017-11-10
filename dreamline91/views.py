# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from selenium import webdriver 
import subprocess
import threading
 
browser = webdriver.PhantomJS() 

def web():
	global browser
	#need to read from db
	browser.get("https://www.google.com/")
	browser.save_screenshot("static\site\Website1.png")
	browser.get("https://github.com/jaejunha")
	browser.save_screenshot("static\site\Website2.png")
	browser.get("http://portal.ajou.ac.kr")
	browser.save_screenshot("static\site\Website3.png")
	browser.get("https://www.naver.com/")
	browser.save_screenshot("static\site\Website4.png")
	browser.get("https://drive.google.com")
	browser.save_screenshot("static\site\Website5.png")
	browser.get("http://www.chuing.net/")
	browser.save_screenshot("static\site\Website6.png")
 
def index(request):
	t = threading.Thread(target=web)
	t.start()
	return render(request,'index.html')

def home_frame(request):
	return render(request,'home/frame.html')

def home_intro(request):
	return render(request,'home/intro.html')

def home_favorite(request):
	return render(request,'home/favorite.html')

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