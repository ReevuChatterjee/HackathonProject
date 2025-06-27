from django.urls import path
from . import views

urlpatterns = [
    path('',views.login_view,name='login'),
    path('register/',views.register,name='register'),
    path('home/',views.dashboard,name='home'),
    path('logout/',views.LogoutPage,name='logout'),
    path('chatbot/',views.disease_bot_view,name='chatbot'),
    path('model2/',views.model2part2_view,name='model2'),
    path('upload-profile-picture/', views.upload_profile_picture, name='upload_profile_picture'),



    
]
