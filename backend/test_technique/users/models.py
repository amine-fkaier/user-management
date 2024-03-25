from django.db import models

class User(models.Model):
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)
  age = models.IntegerField()
  gender = models.CharField(max_length=255)
  city = models.CharField(max_length=255)