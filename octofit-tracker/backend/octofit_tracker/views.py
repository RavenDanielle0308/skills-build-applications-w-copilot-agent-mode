from rest_framework import viewsets
from .core import models
from .serializers import TeamSerializer, UserSerializer, ActivitySerializer, WorkoutSerializer, LeaderboardSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = models.Team.objects.all()
    serializer_class = TeamSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = UserSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = models.Activity.objects.all()
    serializer_class = ActivitySerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = models.Workout.objects.all()
    serializer_class = WorkoutSerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = models.Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
