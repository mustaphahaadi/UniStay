from django.urls import path
from . import views

urlpatterns = [
    # Add your API endpoints here
    path('test/', views.test_view, name='test'),
    path('profile/', views.profile_view, name='profile'),
    path('profile/create/', views.create_profile, name='create_profile'),
] 