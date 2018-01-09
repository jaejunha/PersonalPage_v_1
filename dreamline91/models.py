# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class Favorite(models.Model):
    name = models.CharField(max_length=20)
    url = models.CharField(max_length=50, primary_key=True)
    def __str__(self):
        return self.name

class Personal(models.Model):
    no = models.AutoField(primary_key=True, default=1)
    bold = models.CharField(max_length=50)
    content = models.CharField(max_length=100)
    def __str__(self):
        return self.bold

class History(models.Model):
    start = models.IntegerField(primary_key=True)
    finish = models.IntegerField(default=0)
    content = models.CharField(max_length=100)
    def __str__(self):
        return self.start

class HContent(models.Model):
    year = models.IntegerField(default=0)
    bold = models.CharField(max_length=20)
    content = models.CharField(max_length=100)