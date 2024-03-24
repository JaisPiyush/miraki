from rest_framework.urls import path
from . import views

urlpatterns = [
    path('login/web3', views.Web3LoginAPIView.as_view(), name='web3_login'),
    path('profile', views.ProfileAPIView.as_view(), name='profile'),
    path('wallets', views.UserPublicKeyAPIView.as_view(), name='wallets')
]