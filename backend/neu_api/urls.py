from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
]

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('neu_api/', include('neu_api.urls')),  # 🔗 Connects to neu_api/urls.py
]

from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
]
