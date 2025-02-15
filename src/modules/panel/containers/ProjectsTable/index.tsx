import ErrorBoundary from '@/common/components/ErrorBoundary';
import { ROLE } from '@/common/constants/role';
import useCheckRole from '@/common/hooks/useCheckRole';
import { useAppDispatch, useAppSelector } from '@/common/store';
import { initProjects } from '@/common/store/slices/panelSlice';
import { Table, Skeleton, Empty, Button } from 'antd';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

const ProjectsTable = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { loading, projects } = useAppSelector((state) => state.panel);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const checkRole = useCheckRole([ROLE.PRO, ROLE.ENTERPRISE]);

  useEffect(() => {
    if (projects) return; // First checking -  Already has data. | fetch network checking...

    //Second checking - for correct steps if you have user data then request dash. for checking role-base steps
    user && dispatch(initProjects());
  }, [projects, user]);

  const columns = useMemo(() => {
    const headers = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: t('title'),
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: t('desc'),
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: t('created'),
        dataIndex: 'created',
        key: 'created',
      },
    ];

    return headers;
  }, [t]);

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
          {t('create')} +
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
