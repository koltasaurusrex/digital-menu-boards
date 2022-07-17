# Generated by Django 4.0.5 on 2022-07-14 17:17

import django.contrib.postgres.fields
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_rename_flavors_flavor'),
    ]

    operations = [
        migrations.CreateModel(
            name='ScreenView',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('screen', models.IntegerField()),
                ('flavor_id', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
            ],
        ),
        migrations.AddField(
            model_name='flavor',
            name='in_stock',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='flavor',
            name='is_assigned',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]
