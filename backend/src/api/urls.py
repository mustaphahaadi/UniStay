from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profiles', views.ProfileViewSet, basename='profile')
router.register(r'hostels', views.HostelViewSet, basename='hostel')
router.register(r'rooms', views.RoomViewSet, basename='room')
router.register(r'bookings', views.BookingViewSet, basename='booking')
router.register(r'reviews', views.ReviewViewSet, basename='review')
router.register(r'favorites', views.FavoriteViewSet, basename='favorite')
router.register(r'messages', views.MessageViewSet, basename='message')
router.register(r'maintenance-requests', views.MaintenanceRequestViewSet, basename='maintenance-request')
router.register(r'forum-topics', views.ForumTopicViewSet, basename='forum-topic')
router.register(r'forum-posts', views.ForumPostViewSet, basename='forum-post')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register_user, name='register'),
    path('search/', views.search, name='search'),
] 