import { Form, Input, Button, Typography, Card } from 'antd';
import { useRouter } from 'next/router';
import styles from '@/styles/login.module.css';

const { Title, Text } = Typography;

export default function Login() {
  const router = useRouter();

  interface LoginFormValues {
    email: string;
    password: string;
  }

  const onFinish = (values: LoginFormValues) => {
    console.log('Login Data:', values);
    // Simulate login success
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Login to SkyFlow
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Invalid email format!' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.button}
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {/* Google Login Button */}
        <Button type="default" className={styles.googleButton} block>
          Login with Google
        </Button>

        {/* Signup Redirect */}
        <Text>
          Don&apos;t have an account?{' '}
          <a onClick={() => router.push('/signup')} className={styles.link}>
            Sign Up
          </a>
        </Text>
      </Card>
    </div>
  );
}
