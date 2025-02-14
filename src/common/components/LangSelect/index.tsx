import React from 'react';
import { Select } from 'antd';
import { useChangeLang } from '@/common/hooks/useChangeLang';

const { Option } = Select;

const LanguageDropdown = () => {
  const { locale = 'az', onLocaleChange } = useChangeLang();

  const handleLocaleChange = (value: string) => {
    onLocaleChange(value);
  };

  return (
    <Select value={locale} onChange={handleLocaleChange}>
      <Option value="az">AZ</Option>
      <Option value="en">EN</Option>
    </Select>
  );
};

export default LanguageDropdown;
