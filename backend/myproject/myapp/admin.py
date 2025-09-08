# api/admin.py

from django.contrib import admin
from .models import Trainer, Trainee

admin.site.register(Trainer)
admin.site.register(Trainee)
