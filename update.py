#-*- coding: utf-8
import requests
import time
import threading
import sqlite3
import re
import os
import sys
import urllib

from selenium import webdriver 
from PIL import Image

con = sqlite3.connect("db.sqlite3",check_same_thread=False)
cursor = con.cursor()
link = re.compile('<link.*>')
href = re.compile('href="[^"]*"')

def web():
	url = []
	print 'working...'
	url = reset_url(url)
	browser = webdriver.PhantomJS(service_args=['--ignore-ssl-errors=true', '--ssl-protocol=TLSv1'])
	browser.set_window_size(1920, 1080)
	i = 1
	for u in url:
		t = ''
		response = requests.get(u)
		for l in link.findall(response.text):
			if l.find('icon') >= 0 or l.find('short')>=0:
				for h in href.findall(l):
					t = process_url(u,h)
		if t == '':
			t = infer_url(u)
		save_favicon(i,t)
		print t                       
		save_capture(browser,u,i)
		i = i+1

def main():
	t = threading.Thread(target=web)
	t.start()

if __name__ == '__main__':
	main()
def reset_url(old_url):
	url = old_url
	if url:
                del url[:]
        cursor.execute('select * from dreamline91_favorite')
        rows = cursor.fetchall()
        for r in rows:
                url.append(r[1])
	return url

def process_url(u,h):
	t = h[6:].replace('"','')
	if t.find('http') <0:
                t = u+h[6:].replace('"','')

	if t.find('github.com')>-1 and t.find('?raw=true')>-1:
		t = t.replace('?raw=true','')
		user = t.split('github.com/')[1].split('/')[0]
		path = t.split('blob/')[1]
		t = 'https://raw.githubusercontent.com/'+user+'/'+user+'.github.io/'+path
	return t

def infer_url(u):
	t=''
	if u.find('naver.com')>-1:
		t = u.split('.')[0]+'.naver.com/favicon.ico'
	elif u.find('google.com')>-1:
		if u.find('drive')>-1:
			t = 'https://www.google.com/drive/static/images/drive/favicon.ico'
		elif u.find('spreadsheets')>-1:
			t = 'https://ssl.gstatic.com/docs/spreadsheets/favicon_jfk2.png'
		elif u.find('calendar')>-1:
			t = 'https://calendar.google.com/googlecalendar/images/favicon_v2014_4.ico'
	return t

def save_favicon(i,t):
	if t:
		down = file('static/site/'+str(i), "wb")
       		image = urllib.urlopen(t)
        	while True:
        		buf = image.read(100000000)
                	if len(buf) == 0:
                		break
                	down.write(buf)
        	down.close()
        	image.close()


def save_capture(browser,u,i):
	print 'working at '+u
	browser.get(u)
	time.sleep(5)
        browser.save_screenshot("static/site/"+str(i)+".png")
       	im = Image.open('static/site/'+str(i)+'.png')
        if im.size[0]<=im.size[1]:
        	min = im.size[0]
                box = (0, 0, min, min)
		region = Image.new("RGBA", (min,min), (255,255,255,255))
		region.paste(im.crop(box),mask=im.crop(box))
        else:
                min = im.size[1]
               	region = Image.new("RGBA", (im.size[0], im.size[0]), (255,255,255,32))
		temp = Image.new("RGBA", (im.size[0], im.size[1]), (255,255,255,255))
                region.paste(temp,mask=temp)
		region.paste(im, (0,0,im.size[0],im.size[1]),mask=im)
        region.thumbnail((min/5, min/5))
        region.save('static/site/Website'+str(i)+'.png')

