# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
import os

def index(request):
	return render(request,'index.html')

def home_frame(request):
	return render(request,'home/frame.html')

def home_intro(request):
	return render(request,'home/intro.html')

def home_favorite(request):
	return render(request,'home/favorite.html')

def home_activity(request):
	return render(request,'home/activity.html')

def education(request):
	return render(request,'education/education.html')

def local(request):
	p = popen('start D:\\GitHub');
	p.wait()
	return null;