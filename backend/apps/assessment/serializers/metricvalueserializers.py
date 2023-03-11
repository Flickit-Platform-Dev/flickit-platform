from django.db import transaction
from rest_framework import serializers

from account.serializers.commonserializers import UserSimpleSerializer

from baseinfo.models.metricmodels import Metric
from baseinfo.serializers.commonserializers import AnswerTemplateSerializer, SimpleMetricSerializers

from assessment.models import MetricValue, QualityAttributeValue, Evidence
from assessment.fixture.common import update_assessment_status
from assessment.services.maturitylevel import calculate_maturity_level


class EvidenceSerializer(serializers.ModelSerializer):
    created_by = UserSimpleSerializer()
    class Meta:
        model = Evidence
        fields = ['id', 'description', 'created_by']

class EvidenceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evidence
        fields = ['id', 'description']

class MetricValueSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    answer = AnswerTemplateSerializer()
    metric = SimpleMetricSerializers()
    evidences = EvidenceSerializer(many = True)
    class Meta:
        model = MetricValue
        fields = ['id', 'answer', 'assessment_result', 'metric', 'evidences']

class AddMetricValueSerializer(serializers.ModelSerializer):
    metric_id = serializers.IntegerField()
    id = serializers.UUIDField(read_only=True)
    evidences = EvidenceCreateSerializer(many = True, required=False)
    def validate_metric_id(self, value):
        if not Metric.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No Metric with the given ID was found.')
        return value
    
    def validate(self, attrs):
        answer_template = attrs['answer']
        if answer_template is None:
            return attrs
        if attrs['metric_id'] != answer_template.metric.id :
            raise serializers.ValidationError(
                'The options is invalid')
        return attrs

    @transaction.atomic
    def save(self, **kwargs):
        assessment_result_id = self.context['assessment_result_id']
        self.save_metric(assessment_result_id)
        result = self.instance.assessment_result
        self.save_qauality_att_value(result)
        update_assessment_status(result)
        return self.instance

    def save_qauality_att_value(self, result):
        quality_attributes = []
        for mi in self.instance.metric.metric_impacts.all():
            quality_attributes.append(mi.quality_attribute)
        for quality_attribute in quality_attributes:
            maturity_level_value = calculate_maturity_level(result, quality_attribute)
            try:
                att_value = QualityAttributeValue.objects.get(assessment_result_id = result.id, quality_attribute_id = quality_attribute.id)
                att_value.maturity_level_value = maturity_level_value
                att_value.save() 
            except QualityAttributeValue.DoesNotExist:
                QualityAttributeValue.objects.create(assessment_result_id = result.id, quality_attribute_id = quality_attribute.id, maturity_level_value = maturity_level_value)

    def save_metric(self, assessment_result_id):
        metric_id = self.validated_data['metric_id']
        answer = self.validated_data['answer']
        evidences = self.validated_data.get('evidences', None)
        try:
            metric_value = MetricValue.objects.get(assessment_result_id=assessment_result_id, metric_id=metric_id)
            metric_value.answer = answer
            metric_value.save()
            self.instance = metric_value
            if evidences is not None:
                for evidence in evidences:
                    Evidence.objects.create(description = evidence['description'], created_by = self.context['request'].user, metric_value = self.instance)
        except MetricValue.DoesNotExist:
            metric_value = MetricValue()
            metric_value.assessment_result_id = assessment_result_id
            metric_value.answer = answer
            metric_value.metric_id = metric_id
            metric_value.save()
            self.instance = metric_value
            # self.instance = MetricValue.objects.create(assessment_result_id=assessment_result_id, **self.validated_data)
            if evidences is not None:
                for evidence in evidences:
                    Evidence.objects.create(description = evidence['description'], created_by = self.context['request'].user, metric_value = self.instance)

    class Meta:
        model = MetricValue
        fields = ['id', 'answer', 'metric_id', 'evidences']