from django.db import transaction
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status
from assessment.serializers import evidence_serializers
from assessment.services import evidence_services, assessment_core_services


class EvidencesApi(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT), responses={201: ""})
    def post(self, request):
        result = evidence_services.add_evidences(request)
        return Response(data=result["body"], status=result["status_code"])

    assessment_id = openapi.Parameter('assessmentId', openapi.IN_QUERY, description="assessmentId param",
                                      type=openapi.TYPE_STRING, required=True)
    question_id = openapi.Parameter('questionId', openapi.IN_QUERY, description="questionId param",
                                    type=openapi.TYPE_INTEGER, required=True)
    size_param = openapi.Parameter('size', openapi.IN_QUERY, description="size param",
                                   type=openapi.TYPE_INTEGER)
    page_param = openapi.Parameter('page', openapi.IN_QUERY, description="page param",
                                   type=openapi.TYPE_INTEGER)

    @swagger_auto_schema(manual_parameters=[assessment_id, question_id, size_param, page_param])
    def get(self, request):
        result = evidence_services.get_list_evidences(request)
        return Response(data=result["body"], status=result["status_code"])


class EvidenceApi(APIView):
    @swagger_auto_schema(request_body=evidence_serializers.EditEvidenceSerializer(), responses={201: ""})
    def put(self, request, evidence_id):
        serializer_data = evidence_serializers.EditEvidenceSerializer(data=request.data)
        serializer_data.is_valid(raise_exception=True)
        result = evidence_services.edit_evidence(serializer_data.validated_data, evidence_id,
                                                 authorization_header=request.headers['Authorization'],
                                                 )
        return Response(result["body"], result["status_code"])

    def delete(self, request, evidence_id):
        result = evidence_services.delete_evidence(evidence_id)
        return Response(status=result["status_code"])
