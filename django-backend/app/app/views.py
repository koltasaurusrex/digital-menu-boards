from django.http import JsonResponse
from .models import Flavor, Screen, ScreenView, Location
from .serializers import FlavorSerializer, ScreenSerializer, ScreenViewSerializer, LocationSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'List_Flavors':'/flavors/',
        'Flavor':'/flavors/<str:pk>',
        'List_Screen_Views':'/screen-views/',
        'Screen_View':'/screen-views/<str:pk>',
        'List_Screens':'/screens/',
        'Screen':'/screens/<str:pk>',
        'List_Locations':'/locations/',
        'Locations':'/locations/<str:pk>',
        'List_Users':'/users/',
        'Users':'/users/<str:pk>',
    }

    return Response(api_urls)

@api_view(['GET', 'POST'])
def flavors(request):
    
    if request.method == 'GET':

        flavors = Flavor.objects.all()

        serializedJson = FlavorSerializer(flavors, many=True)
        return Response(serializedJson.data)

    if request.method == 'POST':
        serializer = FlavorSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PATCH'])
def flavor(request, pk):

    flavor = Flavor.objects.get(id=pk)

    if request.method == 'GET':

        serializer = FlavorSerializer(flavor, many=False)
        return Response(serializer.data)

    if request.method == 'PATCH':
        serializer = FlavorSerializer(instance=flavor, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if request.method == 'DELETE':
        if flavor is not None:
            flavor.delete()
            return Response("Flavor {id} deleted", status=status.HTTP_200_OK)
        else:
            return Response("Flavor does not exsist", status=status.HTTP_204_NO_CONTENT)


# Screen Views
@api_view(['GET', 'POST'])
def screen_views(request):
    
        if request.method == 'GET':

            screen_views = ScreenView.objects.all()

            serializedJson = ScreenViewSerializer(screen_views, many=True)
            return Response(serializedJson.data)

        if request.method == 'POST':
            serializer = ScreenViewSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PATCH'])
def screen_view(request, pk):

    screen_view = ScreenView.objects.get(id=pk)

    if request.method == 'GET':

        serializer = ScreenViewSerializer(screen_view, many=False)
        return Response(serializer.data)

    if request.method == 'PATCH':
        serializer = ScreenViewSerializer(instance=screen_view, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if request.method == 'DELETE':
        if screen_view is not None:
            screen_view.delete()
            return Response("ScreenView {id} deleted", status=status.HTTP_200_OK)
        else:
            return Response("ScreenView does not exsist", status=status.HTTP_204_NO_CONTENT)


# Screens
@api_view(['GET', 'POST'])
def screens(request):
    
    if request.method == 'GET':

        screens = Screen.objects.all()

        serializedJson = ScreenSerializer(screens, many=True)
        return Response(serializedJson.data)

    if request.method == 'POST':
        serializer = ScreenSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PATCH'])
def screen(request, pk):

    screen = Screen.objects.get(id=pk)

    if request.method == 'GET':

        serializer = ScreenSerializer(screen, many=False)
        return Response(serializer.data)

    if request.method == 'PATCH':
        serializer = ScreenSerializer(instance=screen, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if request.method == 'DELETE':
        if screen is not None:
            screen.delete()
            return Response("Screen {id} deleted", status=status.HTTP_200_OK)
        else:
            return Response("Screen does not exsist", status=status.HTTP_204_NO_CONTENT)


# Locations
@api_view(['GET', 'POST'])
def locations(request):
    
    if request.method == 'GET':

        locations = Location.objects.all()

        serializedJson = LocationSerializer(locations, many=True)
        return Response(serializedJson.data)

    if request.method == 'POST':
        serializer = LocationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PATCH'])
def location(request, pk):

    location = Location.objects.get(id=pk)

    if request.method == 'GET':

        serializer = LocationSerializer(location, many=False)
        return Response(serializer.data)

    if request.method == 'PATCH':
        serializer = LocationSerializer(instance=location, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if request.method == 'DELETE':
        if location is not None:
            location.delete()
            return Response("Location {id} deleted", status=status.HTTP_200_OK)
        else:
            return Response("Location does not exsist", status=status.HTTP_204_NO_CONTENT)

