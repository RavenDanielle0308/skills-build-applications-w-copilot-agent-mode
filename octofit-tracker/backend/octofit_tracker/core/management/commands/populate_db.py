from django.core.management.base import BaseCommand
from octofit_tracker.core import models

def clear_all():
    models.User.objects.all().delete()
    models.Team.objects.all().delete()
    models.Activity.objects.all().delete()
    models.Leaderboard.objects.all().delete()
    models.Workout.objects.all().delete()

def create_teams():
    marvel = models.Team.objects.create(name='Team Marvel')
    dc = models.Team.objects.create(name='Team DC')
    return marvel, dc

def create_users(marvel, dc):
    users = [
        models.User(name='Iron Man', email='ironman@marvel.com', team=marvel),
        models.User(name='Captain America', email='cap@marvel.com', team=marvel),
        models.User(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
        models.User(name='Batman', email='batman@dc.com', team=dc),
    ]
    for user in users:
        user.save()
    return users

def create_activities(users):
    activities = [
        models.Activity(user=users[0], type='run', duration=30, calories=300),
        models.Activity(user=users[1], type='cycle', duration=45, calories=400),
        models.Activity(user=users[2], type='swim', duration=60, calories=500),
        models.Activity(user=users[3], type='walk', duration=20, calories=100),
    ]
    for activity in activities:
        activity.save()
    return activities

def create_workouts():
    workouts = [
        models.Workout(name='Morning Cardio', description='Cardio for all'),
        models.Workout(name='Strength Training', description='Strength for all'),
    ]
    for workout in workouts:
        workout.save()
    return workouts

def create_leaderboard(users):
    for user in users:
        models.Leaderboard.objects.create(user=user, score=100)

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        clear_all()
        marvel, dc = create_teams()
        users = create_users(marvel, dc)
        create_activities(users)
        create_workouts()
        create_leaderboard(users)
        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
