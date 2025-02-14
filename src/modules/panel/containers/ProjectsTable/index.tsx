import ErrorBoundary from '@/common/components/ErrorBoundary';
import { ROLE } from '@/common/constants/role';
import useCheckRole from '@/common/hooks/useCheckRole';
import { useAppDispatch, useAppSelector } from '@/common/store';
import { initProjects } from '@/common/store/slices/panelSlice';
import { Table, Skeleton, Empty, Button } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

const ProjectsTable = () => {
  const { loading, projects } = useAppSelector((state) => state.panel);

  const dispatch = useAppDispatch();

  const checkRole = useCheckRole([ROLE.PRO, ROLE.ENTERPRISE]);

  useEffect(() => {
    dispatch(initProjects());
  }, []);

  const columns = useMemo(() => {
    const headers = [
      {
        title: 'Project ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: 'Created',
        dataIndex: 'created',
        key: 'created',
      },
    ];

    return headers;
  }, []);

  const handleCreate = useCallback(() => {
    toast.info('Coming soon');
  }, []); // payload for next feature for un-necessary rendering

  if (loading) {
    return <Skeleton active />;
  }

  return !projects?.length ? (
    <Empty description="No Projects Available" />
  ) : (
    <ErrorBoundary>
      {checkRole(
        <Button style={{ marginBottom: 14 }} onClick={handleCreate}>
          Create +
        </Button>
      )}
      <Table
        columns={columns}
        dataSource={projects}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </ErrorBoundary>
  );
};

export default ProjectsTable;
