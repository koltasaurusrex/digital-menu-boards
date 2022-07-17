from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from datetime import *

class Flavor(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    in_stock = models.BooleanField()
    is_assigned = models.BooleanField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Location(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=500)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name

class Screen(models.Model):
    name = models.CharField(max_length=200)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name


class ScreenView(models.Model):
    name = models.CharField(max_length=200)
    screen = models.ForeignKey(Screen, on_delete=models.CASCADE)
    flavor_id = ArrayField(models.IntegerField()) 
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name