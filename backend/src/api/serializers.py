from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Profile, Hostel, Room, Booking, Review, 
    Favorite, Message, MaintenanceRequest,
    ForumTopic, ForumPost, University,
    CommunityCategory, CommunityPost, CommunityComment
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'date_joined')
        read_only_fields = ('date_joined',)

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = ('id', 'user', 'bio', 'location', 'birth_date', 'phone_number', 
                 'profile_picture', 'is_manager', 'is_admin')
        read_only_fields = ('is_manager', 'is_admin')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'hostel', 'room_number', 'room_type', 'capacity', 
                 'price_per_night', 'is_available', 'amenities', 'images')

class HostelSerializer(serializers.ModelSerializer):
    manager = UserSerializer(read_only=True)
    rooms = RoomSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Hostel
        fields = ('id', 'name', 'description', 'address', 'city', 'state', 
                 'country', 'zip_code', 'price_per_night', 'manager', 'created_at', 
                 'updated_at', 'is_active', 'amenities', 'rules', 'images', 
                 'rooms', 'average_rating')
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if not reviews:
            return 0
        return sum(review.rating for review in reviews) / len(reviews)

class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    room = RoomSerializer(read_only=True)
    
    class Meta:
        model = Booking
        fields = ('id', 'user', 'room', 'check_in_date', 'check_out_date', 
                 'status', 'total_price', 'created_at', 'updated_at', 
                 'special_requests')

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = ('id', 'user', 'hostel', 'rating', 'comment', 'created_at', 'updated_at')

class FavoriteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    hostel = HostelSerializer(read_only=True)
    
    class Meta:
        model = Favorite
        fields = ('id', 'user', 'hostel', 'created_at')

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ('id', 'sender', 'receiver', 'content', 'created_at', 'is_read')

class MaintenanceRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    hostel = HostelSerializer(read_only=True)
    
    class Meta:
        model = MaintenanceRequest
        fields = ('id', 'user', 'hostel', 'title', 'description', 'status', 
                 'created_at', 'updated_at')

class ForumPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = ForumPost
        fields = ('id', 'topic', 'author', 'content', 'created_at', 'updated_at')

class ForumTopicSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    posts = ForumPostSerializer(many=True, read_only=True)
    
    class Meta:
        model = ForumTopic
        fields = ('id', 'title', 'description', 'created_by', 'created_at', 
                 'updated_at', 'is_active', 'posts')

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ('id', 'name', 'location', 'description', 'website', 'logo')

class CommunityCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityCategory
        fields = ('id', 'name', 'description', 'icon', 'created_at', 'updated_at')

class CommunityCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = CommunityComment
        fields = ('id', 'post', 'author', 'content', 'created_at', 'updated_at')

class CommunityPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = CommunityCommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = CommunityPost
        fields = ('id', 'category', 'author', 'title', 'content', 
                 'created_at', 'updated_at', 'is_pinned', 'is_closed', 'comments') 