# -*- coding: utf-8 -*-
import requests
import time
import threading
import sqlite3
import re
import os
import sys

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
	browser = webdriver.PhantomJS(service_args=['--ignore-ssl-errors=true', '--ssl-protocol=any'])
	browser.set_window_size(1920, 1080)
	i = 1
	for u in url:
		get_favicon(u,i)   
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
	return t

def get_favicon(u,i):
	t = u
	while t.rfind('/') != t.rfind('//')+1:
		t = t[:t.rfind('/')]
	t = t+'/favicon.ico'
	if save_favicon(i,t) == False:
		for l in link.findall(requests.get(u).text):
			if l.find('"icon"') >=0 or l.find('"shortcut icon"') >= 0:
				if len(href.findall(l)) > 0:
					t = process_url(u,href.findall(l)[0])
					if save_favicon(i,t) == True:
						break
def save_favicon(i,t):
	image = requests.get(t, stream=True, allow_redirects=True)
	ok = True
	if image.headers['Content-length'] == '0':
		ok = False
	if image.status_code != 200:
		ok = False		
	if ok == True:
		open('static/site/'+str(i), 'wb').write(image.content)
	del image
	return ok

def save_capture(browser,u,i):
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
	print 'finish work at '+u