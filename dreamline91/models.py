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
    id = models.AutoField(primary_key=True, default=0)
    start = models.IntegerField()
    finish = models.IntegerField(default=0)
    content = models.CharField(max_length=100)
    sub = models.IntegerField(default=0)
    def __str__(self):
        return self.start

class Happy(models.Model):
    year = models.IntegerField(primary_key=True)
    company = models.CharField(max_length=50)
    content = models.TextField(max_length=100)
    def __str__(self):
        return self.year