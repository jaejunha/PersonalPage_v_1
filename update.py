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
	while True:
		print 'working...'
		if url:
			del url[:]
		cursor.execute('select * from dreamline91_favorite')
		rows = cursor.fetchall()
		for r in rows:
    			url.append(r[1])

		browser = webdriver.PhantomJS() 
		browser.set_window_size(1920, 1080)
		i = 1
		for u in url:
			response = requests.get(u)
			for l in link.findall(response.text):
				if l.find('short') >= 0:
					for h in href.findall(l):
						t = h[6:].replace('"','')
						if u.find('https://www.google.com') >= 0:
							t = 'https://www.google.com'+ h[6:].replace('"','')
						elif t.find('http') <0:
							t = u+h[6:].replace('"','')
						down = file('static/site/'+str(i), "wb")
    						image = urllib.urlopen(t)
    						while True:
     							buf = image.read(100000000)
        						if len(buf) == 0:
            							break
        						down.write(buf)
    						down.close()
    						image.close()

				elif l.find('icon') >= 0:
					for h in href.findall(l):
						t = h[6:].replace('"','')
						if u.find('https://www.google.com') >= 0:
							t = 'https://www.google.com'+ h[6:].replace('"','')
						elif t.find('http') <0:
							t = u+h[6:].replace('"','')
						down = file('static/site/'+str(i), "wb")
    						image = urllib.urlopen(t)
    						while True:
     							buf = image.read(100000000)
        						if len(buf) == 0:
            							break
        						down.write(buf)
    						down.close()
    						image.close() 
                                                                            
			browser.get(u)
			browser.save_screenshot("static/site/temp.png")
			im = Image.open('static/site/temp.png')
			if im.size[0]<=im.size[1]:
				min = im.size[0]
				box = (0, 0, im.size[0], im.size[0])
				region = im.crop(box)
			else:
				min = im.size[1]
				region = Image.new("RGBA", (im.size[0], im.size[0]), (255,255,255,32))
				region.paste(im, (0,0,im.size[0],im.size[1]))
				region.thumbnail((min/5, min/5))
			region.save('static/site/Website'+str(i)+'.png')

   
			i = i+1
		time.sleep(3600)

def main():
	t = threading.Thread(target=web)
	t.start()

if __name__ == '__main__':
	main()