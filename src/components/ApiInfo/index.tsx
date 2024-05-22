// API info组件

import { ProCard } from '@ant-design/pro-components';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Divider, Empty, Table } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { ParamDataType } from '../../pages/ApiPlat/typing';

interface ApiInfoContentProps {
  apiInfo: any;
  desitems: DescriptionsItemType[];
  requestHeaders: any[];
  requestParams: any[];
  requestBody: any[];
  responseBody: any[];
  requestExample: any;
  columns: ColumnsType<ParamDataType>;
}

const ApiInfoContent: React.FC<ApiInfoContentProps> = ({
  apiInfo,
  desitems,
  requestHeaders,
  requestParams,
  requestBody,
  responseBody,
  requestExample,
  columns,
}) => {
  return (
    <>
      <ProCard>
        {!apiInfo && <Empty />}

        {apiInfo && (
          <ProDescriptions column={1} size="small">
            {desitems.map((item, index) => (
              <ProDescriptions.Item key={index} label={item.label}>
                {item.children}
              </ProDescriptions.Item>
            ))}
          </ProDescriptions>
        )}
      </ProCard>

      <ProCard>
        {requestHeaders.length > 0 && (
          <>
            <p className="highlightLine" style={{ marginTop: 15 }}>
              请求头说明：
            </p>
            <Table
              columns={columns}
              pagination={false}
              dataSource={requestHeaders}
              style={{ maxWidth: 800 }}
              size={'small'}
            />
          </>
        )}

        {requestParams.length > 0 && <Divider />}
        {requestParams.length > 0 && (
          <>
            <p className="highlightLine" style={{ marginTop: 15 }}>
              请求参数说明：
            </p>
            <Table
              columns={columns}
              pagination={false}
              dataSource={requestParams}
              style={{ maxWidth: 800 }}
              size={'small'}
            />
          </>
        )}

        {requestBody.length > 0 && <Divider />}
        {requestBody.length > 0 && (
          <>
            <p className="highlightLine" style={{ marginTop: 15 }}>
              请求体参数说明：
            </p>
            <Table
              columns={columns}
              pagination={false}
              dataSource={requestBody}
              style={{ maxWidth: 800 }}
              size={'small'}
            />
          </>
        )}

        {responseBody.length > 0 && <Divider />}
        {responseBody.length > 0 && (
          <>
            <p className="highlightLine" style={{ marginTop: 15 }}>
              响应体参数说明：
            </p>
            <Table
              columns={columns}
              pagination={false}
              dataSource={responseBody}
              style={{ maxWidth: 800 }}
              size={'small'}
            />
          </>
        )}

        {requestExample && <Divider />}
        {requestExample && (
          <>
            <p className="highlightLine" style={{ marginTop: 15 }}>
              请求示例：
            </p>
            <ProDescriptions>
              <ProDescriptions.Item valueType="jsonCode">{requestExample}</ProDescriptions.Item>
            </ProDescriptions>
          </>
        )}
      </ProCard>
    </>
  );
};

export default ApiInfoContent;
