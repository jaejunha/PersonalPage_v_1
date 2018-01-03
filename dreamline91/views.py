# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from models import *
import subprocess

def not_found(request):
	return render(request,'404.html')

def index(request):
	agent = request.META.get('HTTP_USER_AGENT')
	if agent.find('Android')>-1:
		isMobile = True;
        elif agent.find('webOS')>-1:
                isMobile = True;
	elif agent.find('iPhone')>-1:
		isMobile = True;
	elif agent.find('iPad')>-1:
		isMobile = True;
        elif agent.find('iPod')>-1:
                isMobile = True;
        elif agent.find('BlackBerry')>-1:
                isMobile = True;
	else:
		isMobile = False;
	if isMobile:
		item = get_favorite()
		return render(request,'mobile/index.html', {'item':item})
	else:
		return render(request,'index.html')

def m_index(request):
	item = get_favorite()
	return render(request,'mobile/index.html', {'item':item})

def home_frame(request):
	return render(request,'home/frame.html')

def home_intro(request):
	return render(request,'home/intro.html')

def home_favorite(request):
	item = get_favorite()
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

def get_favorite():
	url = []
        name = []
        result = Favorite.objects.filter()
        for r in result:
                url.append(r.url)
                name.append(r.name)
        item = zip(url, name)
	return item
