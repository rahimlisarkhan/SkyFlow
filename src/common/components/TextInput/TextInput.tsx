import React, { memo } from 'react';
import styles from './TextInput.module.css';
import { Input, InputProps } from 'antd';

interface TextInputType extends InputProps {
  label?: string;
  error?: string;
  password?: boolean;
}

function TextInput({ label, error, password, ...props }: TextInputType) {
  const Component = password ? Input.Password : Input;

  return (
    <div className={styles.formGroup}>
      {label && <label>{label}</label>}

      <Component {...props} />

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default memo(TextInput);
