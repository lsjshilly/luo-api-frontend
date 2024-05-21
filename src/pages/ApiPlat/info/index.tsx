import {deleteApiInfos, getApiInfoById, getApiInfoPage, updateApiInfo,} from '@/services/swagger/apiController';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {FooterToolbar, PageContainer, ProDescriptions, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, message} from 'antd';
import {SortOrder} from 'antd/es/table/interface';
import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "@@/exports";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */


/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.ApiUpdateRequest) => {
  const hide = message.loading('Configuring');
  try {
    await updateApiInfo({
      ...fields,
    });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ApiInfoVo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const ids = selectedRows.filter((row) => row && row?.id).map((row) => row.id) || [];
    await deleteApiInfos({
      // 修复类型错误 不能将类型“undefined”分配给类型“number”。

      ids: ids,
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
const ApiInfoDetail: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ApiInfoVo>();
  const [selectedRowsState, setSelectedRows] = useState<API.ApiInfoVo[]>([]);

  const [apiInfo, setApiInfo] = useState<API.ApiInfoVo>();

  const params  = useParams();

  const handleGetApiDetail = async () => {
    const hide = message.loading('');
    try {
      const res =  await getApiInfoById({
        idRequest: {
          id: params?.id || 0,
        }
      });
      hide();
      setApiInfo(res.data)
    } catch (error) {
      hide();
    }
  };


  useEffect(()=> {
      if (!params.id) return null;

      await handleGetApiDetail()

  })





  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.ApiInfoVo>[] = [
    {
      title: 'ID',
      key: 'id',
      hideInForm: true,
      dataIndex: 'id',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'API名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: '请求信息',
      dataIndex: 'request',
      valueType: 'textarea',
    },
    {
      title: '响应信息',
      dataIndex: 'response',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: false,
      hideInSearch: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },

        1: {
          text: '开启',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ApiInfoVo>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: [10, 20, 50],
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, (string | number)[] | null>,
        ) => {
          console.log(filter);
          // 判断filter是否为空，如果不为空，取出status对象并判断是否是数组和数组中是否有值，取出数组中的第一数值
          const status =
            filter.status && Array.isArray(filter.status) && filter.status.length > 0
              ? filter.status[0]
              : undefined;

          // 将sort参数转换为数组，每个元素并以key=val的形式拼接
          const sortFields = Object.keys(sort).map((key) => `${key}=${sort[key]}`);

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { current, pageSize, keyword, ...otherParams } = params;
          // 如果status存在，就将其加入apiQueryRequest对象中
          const apiQueryRequest = status ? { ...otherParams, status } : otherParams;
          const res = await getApiInfoPage({
            apiQueryRequest: {
              ...apiQueryRequest,
            },
            pageRequest: {
              pageNum: current,
              pageSize: pageSize,
              sortFields: sortFields || [],
            },
          });
          return {
            data: res?.data?.items || [],
            success: true,
            total: res?.data?.total || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}项
              </a>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}


      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default ApiInfoDetail;
