// debug组件

import { ApiInfoContent } from '@/components';
import { getApiInfoById } from '@/services/swagger/apiController';
import { useParams } from '@@/exports';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Space, Tabs, TabsProps, message } from 'antd';
import { Collapse } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import { ParamDataType, paramsColumns, paramsDesitems } from '../typing';

const ApiInfoDetail: React.FC = () => {
  /**
   * 保存响应值
   */
  const [apiInfo, setApiInfo] = useState<API.ApiInfoVo>();
  const [requestParams, setRequestParams] = useState<ParamDataType[]>([]);
  const [requestHeaders, setRequestHeaders] = useState<ParamDataType[]>([]);
  const [requestBody, setRequestBody] = useState<ParamDataType[]>([]);
  const [responseBody, setresponseBody] = useState<ParamDataType[]>([]);
  const [requestExample, setrequestExample] = useState<string>('');
  /**
   * 获取参数id
   */
  const params = useParams();

  const handleGetApiDetail = async () => {
    const hide = message.loading('');
    try {
      const res = await getApiInfoById({
        // 解决下面的类型错误问题
        id: params.id || 0,
      });
      hide();
      setApiInfo(res.data);
    } catch (error) {
      hide();
    }
  };

  /**
   * 页面加载
   */
  useEffect(() => {
    if (!params.id) return;
    handleGetApiDetail().then((r) => console.log('Api详情获取完成'));
  }, [params.id]);

  useEffect(() => {
    if (apiInfo?.requestParams) {
      try {
        const parsedParams = JSON.parse(apiInfo.requestParams);
        setRequestParams(parsedParams);
      } catch (e) {
        console.error('解析 requestParams 失败:', e);
        setRequestParams([]);
      }
    } else {
      setRequestParams([]);
    }
  }, [apiInfo]);

  useEffect(() => {
    if (apiInfo?.requestHeaders) {
      try {
        const parsedHeaders = JSON.parse(apiInfo.requestHeaders);
        setRequestHeaders(parsedHeaders);
      } catch (e) {
        console.error('解析 requestHeaders 失败:', e);
        setRequestHeaders([]);
      }
    } else {
      setRequestHeaders([]);
    }
  }, [apiInfo]);

  useEffect(() => {
    if (apiInfo?.requestBody) {
      try {
        const parsedBody = JSON.parse(apiInfo.requestBody);
        setRequestBody(parsedBody);
      } catch (e) {
        console.error('解析 requestBody 失败:', e);
        setRequestBody([]);
      }
    } else {
      setRequestBody([]);
    }
  }, [apiInfo]);

  useEffect(() => {
    if (apiInfo?.responseBody) {
      try {
        const parsedBody = JSON.parse(apiInfo.responseBody);
        setresponseBody(parsedBody);
      } catch (e) {
        console.error('解析 responseBody 失败:', e);
        setresponseBody([]);
      }
    } else {
      setresponseBody([]);
    }
  }, [apiInfo]);

  useEffect(() => {
    if (apiInfo?.requestExample) {
      setrequestExample(apiInfo.requestExample);
    } else {
      setrequestExample('');
    }
  }, [apiInfo]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '文档',
      children: (
        <ApiInfoContent
          apiInfo={apiInfo}
          desitems={paramsDesitems(apiInfo)}
          requestHeaders={requestHeaders}
          requestParams={requestParams}
          requestBody={requestBody}
          responseBody={responseBody}
          requestExample={requestExample}
          columns={paramsColumns}
        />
      ),
    },
    {
      key: '2',
      label: '调用结果',
      children: 'Content of Tab Pane 2',
    },
  ];

  return (
    <PageContainer
      header={{
        extra: [
          <Button key="1" type="primary" onClick={() => {}}>
            在线调试
          </Button>,
        ],
      }}
    >
      <ProCard title="调试" extra="2019年9月28日" split={'vertical'} bordered headerBordered>
        <ProCard title="参数配置" colSpan="40%">
          <ProForm
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            }}
            onFinish={async (values) => console.log(values)}
          >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              {requestHeaders.length > 0 && (
                <Collapse
                  defaultActiveKey={'1'}
                  items={[
                    {
                      key: '1',
                      label: 'headers 请求头',
                      children: requestHeaders.map((param, index) => {
                        return (
                          <ProFormText
                            key={index}
                            name={param?.paramName || ''}
                            label={param?.paramName || ''}
                          />
                        );
                      }),
                    },
                  ]}
                />
              )}

              {requestParams.length > 0 && (
                <Collapse
                  defaultActiveKey={'1'}
                  items={[
                    {
                      key: '1',
                      label: 'params 请求参数',
                      children: requestParams.map((param, index) => {
                        return (
                          <ProFormText
                            key={index}
                            name={param?.paramName || ''}
                            label={param?.paramName || ''}
                          />
                        );
                      }),
                    },
                  ]}
                />
              )}

              {requestBody.length > 0 && (
                <Collapse
                  defaultActiveKey={'1'}
                  items={[
                    {
                      key: '1',
                      label: 'body 请求体参数',
                      children: requestBody.map((param, index) => {
                        return (
                          <ProFormText
                            key={index}
                            name={param?.paramName || ''}
                            label={param?.paramName || ''}
                          />
                        );
                      }),
                    },
                  ]}
                />
              )}
            </Space>
          </ProForm>
        </ProCard>

        <ProCard>
          <Tabs defaultActiveKey="1" items={items} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
export default ApiInfoDetail;
