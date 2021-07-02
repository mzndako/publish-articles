import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

const tailLayout = {
  wrapperCol: { offset: 12, span: 12 },
};

export interface IFormValues {
  email: string;
  password: string;
}

interface LoginViewProps {
  onSubmit: (value: IFormValues) => void;
}

const LoginView = ({ onSubmit }: LoginViewProps) => {
  return (
    <Row style={{ marginTop: "50px" }}>
      <Col lg={{ span: 8, offset: 8 }} md={{ span: 12, offset: 6 }}>
        <h2>USER LOGIN PAGE</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email address!",
              },
            ]}
          >
            <Input data-testid="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password data-testid="password" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button data-testid="login-button" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Link to="/signup">Create account</Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginView;
