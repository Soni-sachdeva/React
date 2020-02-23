import React, { useEffect } from "react";

import { userService } from "../../_services";
import { Form, Button, Row, Col, notification } from "antd";
import { FormInput } from "../../_components/partials/atoms/input";
import { Typography } from "antd";
import { HOMEPAGE } from "../../_components/config/urlMappings";
const { Title } = Typography;
const fields = {
  usename: "username",
  password: "password"
};

const rules = [{ required: true, message: "Please enter a correct value!" }];
const LoginPageImpl = props => {
  const { form } = props;

  useEffect(() => {
    userService.logout();
  }, []);

  const handleSubmit = () => {
    form.validateFields(err => {
      if (err) {
        return;
      } else {
        const values = form.getFieldsValue();
        userService
          .login(values.username, values.password)
          .then(user => {
            const { from } = props.location.state || {
              from: { pathname: HOMEPAGE }
            };
            props.history.push(from);
            notification.success({
              message: "Login successful",
              description: `Hi ${user.username}! Have a great time`
            });
          })
          .catch(
            err =>
              notification.error({
                message: err,
                description: "Please enter a valid credentials"
              }),
            form.resetFields()
          );
      }
    });
  };

  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      style={{ height: "100vh" }}
    >
      <Col style={{ width: "20rem" }}>
        <div>
          <Title level={3}>Hi welcome to my project !!!</Title>
          <p>
            <b>Username</b>: test
          </p>
          <p>
            <b>Password</b>: test
          </p>
        </div>
        <Form>
          <FormInput
            label="Username"
            form={form}
            field={fields.usename}
            rules={rules}
          />
          <FormInput
            label="Password"
            form={form}
            field={fields.password}
            type="password"
            rules={rules}
          />
          <br />
          <Button onClick={handleSubmit}> Submit </Button>
        </Form>
      </Col>
    </Row>
  );
};

export const LoginPage = Form.create({ name: "login" })(LoginPageImpl);
