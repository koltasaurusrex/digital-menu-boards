from rest_framework import serializers
from .models import Flavor, Screen, ScreenView, Location

class FlavorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flavor
        fields = '__all__'

class ScreenViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScreenView
        fields = '__all__'

class ScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screen
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'