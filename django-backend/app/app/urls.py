"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', views.api_overview),
    path('api/flavors/', views.flavors, name='flavors'),
    path('api/flavors/<str:pk>', views.flavor, name='flavor'),
    path('api/screens/', views.screens, name='screens'),
    path('api/screens/<str:pk>', views.screen, name='screen'),
    path('api/screen_views/', views.screen_views, name='screen_views'),
    path('api/screen_views/<str:pk>', views.screen_view, name='screen_view'),
    path('api/locations/', views.locations, name='locations'),
    path('api/locations/<str:pk>', views.location, name='location'),
]
