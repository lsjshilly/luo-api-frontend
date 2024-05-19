import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: API.ApiUpdateRequest) => Promise<boolean>;
  visible: boolean;
  values: Partial<API.ApiInfoVo>;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { visible, onCancel, onSubmit, values } = props;
  return (
    <ModalForm
      title={'添加API'}
      width={'500px'}
      open={visible}
      onFinish={async (value) => {
        const success = await onSubmit({
          ...value,
          id: values.id,
        });
        return success;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      initialValues={values}
    >
      <ProFormText
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
      <ProFormTextArea name="request" label="请求参数" />
      <ProFormTextArea name="response" label="响应参数" />
      <ProFormTextArea name="description" label="描述" />
    </ModalForm>
  );
};
export default UpdateForm;
