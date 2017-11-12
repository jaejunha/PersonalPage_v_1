# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class User(models.Model):
    user = models.CharField(max_length=20,primary_key=True)
    name = models.CharField(max_length=20)
    birth = models.IntegerField()
    picture = models.CharField(max_length=100, null=True, default='')
    def __str__(self):
        return self.name

class Hobby(models.Model):
    name = models.CharField(max_length=20,primary_key=True)
    user = models.CharField(max_length=20)
    def __str__(self):
        return self.name

class School(models.Model):
    name = models.CharField(max_length=20,primary_key=True)
    type = models.CharField(max_length=20)
    major = models.CharField(max_length=20)
    score = models.IntegerField(null=True)
    user = models.CharField(max_length=20)
    def __str__(self):
        return self.name

class Favorite(models.Model):
    name = models.CharField(max_length=20)
    url = models.CharField(max_length=50, primary_key=True)
    def __str__(self):
        return self.name