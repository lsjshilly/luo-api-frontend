import { DescriptionsProps, TableProps } from 'antd';

export interface ParamDataType {
  paramName: string;
  paramType: string;
  required: number;
  description: string;
}

export const paramsColumns: TableProps<ParamDataType>['columns'] = [
  {
    title: '参数名称',
    dataIndex: 'paramName',
    key: 'name',
  },
  {
    title: 'paramType',
    dataIndex: 'paramType',
    key: 'paramType',
  },
  {
    title: 'required',
    dataIndex: 'required',
    key: 'required',
    render: (text, record) => {
      // 直接返回 '是' 或 '否'
      return record.required === 1 ? '是' : '否';
    },
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },
];
export const paramsDesitems = (apiInfo: API.ApiInfoVo): DescriptionsProps['items'] => [
  {
    key: '1',
    label: '请求方式',
    children: apiInfo?.method || '',
  },
  {
    key: '2',
    label: 'URL',
    children: apiInfo?.url || '',
  },
  {
    key: '3',
    label: '功能',
    children: apiInfo?.description || '',
  },
];
