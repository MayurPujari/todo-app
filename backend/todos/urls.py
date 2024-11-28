from django.urls import path
from .views import ToDoList, ToDoDetail, ToDoDeleteAll

urlpatterns = [
    path('todos/', ToDoList.as_view()),
    path('todos/<int:pk>/', ToDoDetail.as_view()),
    path('todos/delete-all/', ToDoDeleteAll.as_view()),
]
