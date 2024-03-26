from django.db import models

GENDER_CHOICES = [
    ('male', 'male'),
    ('female', 'female')
]

class User(models.Model):
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)
  age = models.IntegerField()
  gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
  city = models.CharField(max_length=255)