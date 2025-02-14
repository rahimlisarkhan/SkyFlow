import ErrorBoundary from '@/common/components/ErrorBoundary';
import { Table, Skeleton, Empty } from 'antd';
import { useState, useEffect } from 'react';

const ProjectsTable = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<
    { id: string; title: string; desc: string; created: string }[]
  >([]);

  // Mock data
  const mockData = [
    {
      id: '1',
      title: 'Project Alpha',
      desc: 'Description for Project Alpha.',
      created: '2024-02-01',
    },
    {
      id: '2',
      title: 'Project Beta',
      desc: 'Description for Project Beta.',
      created: '2024-02-10',
    },
    {
      id: '3',
      title: 'Project Gamma',
      desc: 'Description for Project Gamma.',
      created: '2024-01-15',
    },
  ];

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setProjects(mockData);
      setLoading(false);
    }, 2000);
  }, []);

  const columns = [
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

  if (loading) {
    return <Skeleton active />;
  }

  return projects.length === 0 ? (
    <Empty description="No Projects Available" />
  ) : (
    <ErrorBoundary>
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
