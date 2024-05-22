// info组件

import { ApiInfoContent } from '@/components';
import { getApiInfoById } from '@/services/swagger/apiController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { history } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { paramsColumns, paramsDesitems } from '../typing';

const ApiInfoDetail: React.FC = () => {
  /**
   * 保存响应值
   */
  const [apiInfo, setApiInfo] = useState<API.ApiInfoVo>();
  const [requestParams, setRequestParams] = useState([]);
  const [requestHeaders, setRequestHeaders] = useState([]);
  const [requestBody, setRequestBody] = useState([]);
  const [responseBody, setresponseBody] = useState([]);
  const [requestExample, setrequestExample] = useState('');
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

  return (
    <PageContainer
      header={{
        extra: [
          <Button
            key="1"
            type="primary"
            onClick={() => {
              history.push('/api-info/debug/' + apiInfo?.id);
            }}
          >
            在线调试
          </Button>,
        ],
      }}
    >
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
    </PageContainer>
  );
};
export default ApiInfoDetail;
