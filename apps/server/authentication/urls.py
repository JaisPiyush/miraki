from rest_framework.urls import path
from django.urls import include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
    r'profile', views.ProfileViewSet, basename='profile'
)

urlpatterns = [
    path('', include(router.urls)),
    path('login/web3/', views.Web3LoginAPIView.as_view(), name='web3_login'),
    path('wallets/', views.UserPublicKeyAPIView.as_view(), name='wallets'),
    # path('user/', views.UserUpdateGenericView.as_view(), name='user-update')
]