# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-01-10 15:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dreamline91', '0006_remove_history_etc'),
    ]

    operations = [
        migrations.AddField(
            model_name='history',
            name='id',
            field=models.AutoField(default=0, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='history',
            name='start',
            field=models.IntegerField(),
        ),
    ]
