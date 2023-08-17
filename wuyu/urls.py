"""wuyu URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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

from wuyu import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.login),
    path('login/', views.login),
    path('register/', views.register),
    path('index/', views.index),
    path('goods/', views.goods),
    path('search/', views.search),
    path('settings/', views.setting),
    path('shoppingCar/', views.shoppingCar),
    path('collection/', views.collection),
    path('myGoods/', views.myGoods),
    path('orderModify/', views.orderModify),
    path('addGoods/', views.addGoods),
]
