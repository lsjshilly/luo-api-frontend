import { CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormGroup,
  ProFormInstance,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, { useRef, useState } from 'react';

export type CreateFormProps = {
  onCancel: () => void;
  onSubmit: (values: API.ApiAddRequest) => Promise<boolean>;
  visible: boolean;
};
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { visible, onCancel, onSubmit } = props;
  const formRef = useRef<ProFormInstance>();
  const [requestMethod, setRequestMethod] = useState<string>('GET');

  return (
    <ModalForm
      formRef={formRef}
      title={'添加API'}
      width={'950px'}
      open={visible}
      onFinish={async (value) => {
        console.log('valuesssss', value);
        setRequestMethod('GET');
        const success = await onSubmit({
          ...value,
          requestHeaders: JSON.stringify(value.requestHeaders),
          requestParams: JSON.stringify(value.requestParams),
          requestBody: JSON.stringify(value.requestBody),
          responseBody: JSON.stringify(value.responseBody),
          requestExample: JSON.stringify(value.requestExample),
        });
        return success;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
          setRequestMethod('GET');
        },
      }}
    >
      <ProFormGroup key="group">
        <ProFormText
          width={'lg'}
          rules={[
            {
              required: true,
              message: 'API名称为必填项',
            },
          ]}
          label={'名称'}
          name="name"
        />
        <ProFormSelect
          onChange={setRequestMethod}
          width={'md'}
          initialValue={requestMethod}
          options={[
            {
              value: 'GET',
              label: 'GET',
            },
            {
              value: 'POST',
              label: 'POST',
            },
            {
              value: 'PUT',
              label: 'PUT',
            },
            {
              value: 'DELETE',
              label: 'DELETE',
            },
            {
              value: 'HEAD',
              label: 'HEAD',
            },
            {
              value: 'PATCH',
              label: 'PATCH',
            },
          ]}
          name="method"
          label="请求方式"
        />
      </ProFormGroup>

      <ProFormText
        rules={[
          {
            required: true,
            message: '接口地址为必填项',
          },
        ]}
        label={'接口地址'}
        name="url"
      />
      <ProFormTextArea name="description" label="描述" />
      <ProFormList
        name="requestHeaders"
        label="请求头"
        copyIconProps={{ Icon: SmileOutlined, tooltipText: '复制此项到末尾' }}
        deleteIconProps={{
          Icon: CloseCircleOutlined,
          tooltipText: '删除',
        }}
      >
        <ProFormGroup key="requestHeaderGroup">
          <ProFormText width="sm" name="paramName" label="参数名称" />
          <ProFormText width="xs" name="paramType" label="参数类型" />
          <ProFormSelect
            initialValue={1}
            options={[
              {
                value: 1,
                label: '是',
              },
              {
                value: 0,
                label: '否',
              },
            ]}
            name="required"
            label="是否必填"
          />
          <ProFormText width="md" name="description" label="参数说明" />
        </ProFormGroup>
      </ProFormList>

      <ProFormList
        name="requestParams"
        label="请求参数"
        copyIconProps={{ Icon: SmileOutlined, tooltipText: '复制此项到末尾' }}
        deleteIconProps={{
          Icon: CloseCircleOutlined,
          tooltipText: '删除',
        }}
      >
        <ProFormGroup key="requestParamGroup">
          <ProFormText width="sm" name="paramName" label="参数名称" />
          <ProFormText width="xs" name="paramType" label="参数类型" />
          <ProFormSelect
            initialValue={1}
            options={[
              {
                value: 1,
                label: '是',
              },
              {
                value: 0,
                label: '否',
              },
            ]}
            name="required"
            label="是否必填"
          />
          <ProFormText width="md" name="description" label="参数说明" />
        </ProFormGroup>
      </ProFormList>

      {requestMethod !== 'GET' && (
        <ProFormList
          name="requestBody"
          label="body参数"
          copyIconProps={{ Icon: SmileOutlined, tooltipText: '复制此项到末尾' }}
          deleteIconProps={{
            Icon: CloseCircleOutlined,
            tooltipText: '删除',
          }}
        >
          <ProFormGroup key="requestBodyGroup">
            <ProFormText width="sm" name="paramName" label="参数名称" />
            <ProFormText width="xs" name="paramType" label="参数类型" />
            <ProFormSelect
              initialValue={1}
              options={[
                {
                  value: 1,
                  label: '是',
                },
                {
                  value: 0,
                  label: '否',
                },
              ]}
              name="required"
              label="是否必填"
            />
            <ProFormText width={'md'} name="description" label="参数说明" />
          </ProFormGroup>
        </ProFormList>
      )}

      <ProFormList
        name="responseBody"
        label="响应数据"
        copyIconProps={{ Icon: SmileOutlined, tooltipText: '复制此项到末尾' }}
        deleteIconProps={{
          Icon: CloseCircleOutlined,
          tooltipText: '删除',
        }}
      >
        <ProFormGroup key="requestBodyGroup">
          <ProFormText width="sm" name="paramName" label="参数名称" />
          <ProFormText width="xs" name="paramType" label="参数类型" />

          <ProFormText width="lg" name="description" label="参数说明" />
        </ProFormGroup>
      </ProFormList>
      <ProFormTextArea name="requestExample" label="请求示例" />
    </ModalForm>
  );
};
export default CreateForm;
