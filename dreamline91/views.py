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
		intro = get_intro()
		favorite = get_favorite()
		personal = get_personal()
		happy = get_happy()
		history = get_history()
		return render(request,'mobile/index.html', {'intro':intro, 'favorite':favorite, 'personal':personal, 'happy':happy, 'history':history})
	else:
		return render(request,'index.html')

def m_index(request):
	intro = get_intro()
	favorite = get_favorite()
	personal = get_personal()
	happy = get_happy()
	history = get_history()
	return render(request,'mobile/index.html', {'intro':intro, 'favorite':favorite, 'personal':personal, 'happy':happy, 'history':history})

def home_frame(request):
	return render(request,'home/frame.html')

def home_intro(request):
	intro = get_intro()
	return render(request,'home/intro.html', {'intro':intro})

def home_favorite(request):
	favorite = get_favorite()
	return render(request,'home/favorite.html', {'favorite':favorite})

def home_activity(request):
	return render(request,'home/activity.html')

def about_frame(request):
	return render(request,'about/frame.html')

def about_personal(request):
	personal = get_personal()
	happy = get_happy()
	history = get_history()
	return render(request,'about/personal.html', {'personal':personal, 'happy':happy,  'history':history})

def portfolio_frame(request):
	return render(request,'portfolio/frame.html')

def portfolio_program(request):
	return render(request,'portfolio/program.html')

def portfolio_art(request):
	return render(request,'portfolio/art.html')

def portfolio_marathon(request):
	return render(request,'portfolio/marathon.html')

def local(request):
	p = subprocess.Popen('C:\\Windows\\EXPLORER.EXE /n /cwd="D:\\GitHub"')
	p.wait()
	return HttpResponse(status=204)

def get_intro():
	intro = []
        result = Intro.objects.filter()
        for r in result:
		intro.append(r.content)
	return intro

def get_favorite():
	url = []
        name = []
        result = Favorite.objects.filter()
        for r in result:
                url.append(r.url)
                name.append(r.name)
        favorite = zip(url, name)
	return favorite

def get_personal():
	bold = []
        content = []
        result = Personal.objects.order_by('no')
        for r in result:
                bold.append(r.bold)
                content.append(r.content)
        personal = zip(bold, content)
	return personal

def get_happy():
	year = []
	company = []
        content = []
	value = []
        result = Happy.objects.order_by('year')
        for r in result:
                year.append(r.year)
                company.append(r.company)
                content.append(r.content)
                value.append(r.value)
        happy = zip(year, company, content, value)
	return happy

def get_history():
	bold = []
        content = []
	sub = []
	name = []
	cur=''
        result = History.objects.order_by('sub').order_by('-finish')
        for r in result:
                bold.append((r.start,r.finish))
			
                content.append(r.content)
		sub.append(r.sub)
		if r.sub == 0:
			if r.start == r.finish:
				cur = str(r.start)
			else:
				cur = str(r.start)+'_'+str(r.finish)
		name.append(cur)
        history = zip(bold, content,sub,name)
	return history