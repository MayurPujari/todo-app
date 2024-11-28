from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ToDo
from .serializers import ToDoSerializer

class ToDoList(APIView):
    def get(self, request):
        todos = ToDo.objects.all()
        serializer = ToDoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ToDoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class ToDoDetail(APIView):
    def put(self, request, pk):
        todo = ToDo.objects.get(pk=pk)
        serializer = ToDoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        todo = ToDo.objects.get(pk=pk)
        todo.delete()
        return Response(status=204)

class ToDoDeleteAll(APIView):
    def delete(self, request):
        ToDo.objects.all().delete()
        return Response({"message": "All tasks deleted"}, status=status.HTTP_204_NO_CONTENT)