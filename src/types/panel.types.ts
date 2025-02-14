import { ROLE } from '@/common/constants/role';

export interface IDashboard {
  title: string;
  value: number;
  roles: ROLE[];
}

export interface IReport {
  label: string[];
  data: number[];
}

export interface IProject {
  id: string;
  title: string;
  desc: string;
  created: string;
}
