from django.http import JsonResponse
from .models import Flavor
from .serializers import FlavorSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def list_flavors(request):

    if request.method == 'GET':

        id = request.query_params.get('id')

        if id is not None:
            flavors = Flavor.objects.filter(id=id)
        else:
            flavors = Flavor.objects.all()

        serializedJson = FlavorSerializer(flavors, many=True)
        return JsonResponse(serializedJson.data, safe=False)

    if request.method == 'POST':
        serializer = FlavorSerializer(data=request.data)
        print(request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


