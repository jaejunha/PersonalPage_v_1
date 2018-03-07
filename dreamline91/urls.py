"""dreamline91 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.http import HttpResponse
from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^mobile',views.m_index, name='m_index'),
	url(r'^home/frame', views.home_frame, name='home_frame'),
	url(r'^home/intro', views.home_intro, name='home_intro'),
	url(r'^home/activity', views.home_activity, name='home_activity'),
	url(r'^home/favorite', views.home_favorite, name='home_favorite'),
	url(r'^home/calendar', views.home_calendar, name='home_calendar'),
	url(r'^about/frame', views.about_frame, name='about_frame'),
	url(r'^about/personal', views.about_personal, name='about_personal'),
	url(r'^portfolio/frame', views.portfolio_frame, name='portfolio_frame'),
	url(r'^portfolio/program', views.portfolio_program, name='portfolio_program'),
	url(r'^portfolio/art', views.portfolio_art, name='portfolio_art'),
	url(r'^portfolio/marathon', views.portfolio_marathon, name='portfolio_marathon'),
	url(r'^robots.txt', lambda x: HttpResponse("User-agent: *\nDisallow: /", content_type="text/plain"), name="robots_file"),
	url(r'^.+$', views.not_found, name='not_found'),
]
