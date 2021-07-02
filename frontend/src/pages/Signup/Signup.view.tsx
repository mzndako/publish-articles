import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

const tailLayout = {
  wrapperCol: { offset: 12, span: 12 },
};

export interface IFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface SignupViewProps {
  onSubmit: (value: IFormValues) => void;
}

const SignupView = ({ onSubmit }: SignupViewProps) => {
  return (
    <Row style={{ marginTop: "50px" }}>
      <Col lg={{ span: 8, offset: 8 }} md={{ span: 12, offset: 6 }}>
        <h2>CREATE ACCOUNT</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Link to="/">Already have an account? Login</Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupView;
