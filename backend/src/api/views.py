from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import (
    Hostel, Room, Booking, Review, Favorite, Message, MaintenanceRequest,
    ForumTopic, ForumPost, University,
    CommunityCategory, CommunityPost, CommunityComment
)
from .serializers import (
    HostelSerializer, RoomSerializer, BookingSerializer, ReviewSerializer,
    FavoriteSerializer, MessageSerializer, MaintenanceRequestSerializer,
    ForumTopicSerializer, ForumPostSerializer,
    UniversitySerializer, CommunityCategorySerializer, CommunityPostSerializer,
    CommunityCommentSerializer
)

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def test_view(request):
    return Response({
        'message': 'Django REST Framework is working!',
        'status': 'success'
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    try:
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_profile(request):
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Authentication Views
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        Profile.objects.create(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Profile Views
class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Hostel Views
class HostelViewSet(viewsets.ModelViewSet):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Hostel.objects.all()
        city = self.request.query_params.get('city', None)
        if city:
            queryset = queryset.filter(city__icontains=city)
        return queryset

    @action(detail=True, methods=['post'])
    def add_review(self, request, pk=None):
        hostel = self.get_object()
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, hostel=hostel)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Room Views
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        hostel_id = self.request.query_params.get('hostel_id', None)
        if hostel_id:
            return Room.objects.filter(hostel_id=hostel_id)
        return Room.objects.all()

# Booking Views
class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Booking.objects.all()
        return Booking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Review Views
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        hostel_id = self.request.query_params.get('hostel_id', None)
        if hostel_id:
            return Review.objects.filter(hostel_id=hostel_id)
        return Review.objects.all()

# Favorite Views
class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Message Views
class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user)
        ).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

# Maintenance Request Views
class MaintenanceRequestViewSet(viewsets.ModelViewSet):
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return MaintenanceRequest.objects.all()
        return MaintenanceRequest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Forum Views
class ForumTopicViewSet(viewsets.ModelViewSet):
    queryset = ForumTopic.objects.all()
    serializer_class = ForumTopicSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ForumPostViewSet(viewsets.ModelViewSet):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        topic_id = self.request.query_params.get('topic_id', None)
        if topic_id:
            return ForumPost.objects.filter(topic_id=topic_id)
        return ForumPost.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# Search View
@api_view(['GET'])
@permission_classes([AllowAny])
def search(request):
    query = request.query_params.get('q', '')
    hostels = Hostel.objects.filter(
        Q(name__icontains=query) |
        Q(city__icontains=query) |
        Q(description__icontains=query)
    )
    serializer = HostelSerializer(hostels, many=True)
    return Response(serializer.data)

# University Views
class UniversityViewSet(viewsets.ModelViewSet):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = University.objects.all()
        location = self.request.query_params.get('location', None)
        if location:
            queryset = queryset.filter(location__icontains=location)
        return queryset

# Community Views
class CommunityCategoryViewSet(viewsets.ModelViewSet):
    queryset = CommunityCategory.objects.all()
    serializer_class = CommunityCategorySerializer
    permission_classes = [AllowAny]

class CommunityPostViewSet(viewsets.ModelViewSet):
    queryset = CommunityPost.objects.all()
    serializer_class = CommunityPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = CommunityPost.objects.all()
        category_id = self.request.query_params.get('category_id', None)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset.order_by('-is_pinned', '-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CommunityCommentViewSet(viewsets.ModelViewSet):
    queryset = CommunityComment.objects.all()
    serializer_class = CommunityCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.request.query_params.get('post_id', None)
        if post_id:
            return CommunityComment.objects.filter(post_id=post_id).order_by('created_at')
        return CommunityComment.objects.none()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
