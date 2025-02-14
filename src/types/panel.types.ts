import { ROLE } from '@/common/constants/role';

export interface IDashboard {
  key: string;
  value: number;
  roles: ROLE[];
}

export interface IReport {
  sales: {
    label: string[];
    data: number[];
  };
  revenue: {
    label: string[];
    data: number[];
  };
}

export interface IProject {
  id: string;
  title: string;
  desc: string;
  created: string;
}
