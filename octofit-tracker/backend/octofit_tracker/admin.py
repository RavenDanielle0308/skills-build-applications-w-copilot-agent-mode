from django.contrib import admin
from .core import models

admin.site.register(models.Team)
admin.site.register(models.User)
admin.site.register(models.Activity)
admin.site.register(models.Workout)
admin.site.register(models.Leaderboard)
