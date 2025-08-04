from django.urls import path
from .views import ExpenseListCreate, ExpenseRetrieveUpdateDestroy

urlpatterns = [
    path('expenses/', ExpenseListCreate.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseRetrieveUpdateDestroy.as_view(), name='expense-detail'),
]
