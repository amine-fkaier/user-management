from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.get_users, name='users'),
    path('user/<int:user_id>/', views.get_user, name='user'),
    path('user/create/', views.create_user, name='create_user'),
    path('user/<int:user_id>/update/', views.update_user, name='update_user'),
    path('user/<int:user_id>/delete/', views.delete_user, name='delete_user'),
]