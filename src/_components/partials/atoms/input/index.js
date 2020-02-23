import React from "react";
import { Tooltip, Icon, Input, Form } from "antd";

export const FormInput = props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form.Item label={props.label} style={{ padding: 0, margin: 0 }}>
      {getFieldDecorator(props.field, {
        initialValue: props.value,
        rules: props.rules
      })(
        <Input
          placeholder={props.placeholder}
          type={props.type}
          style={props.untouchable ? { pointerEvents: "none" } : props.style}
          disabled={props.disabled}
          autoComplete="off"
          size={props.size}
          suffix={props.suffix}
          addonAfter={
            props.tooltipInfo ? (
              <Tooltip title={props.tooltipContent}>
                <Icon type="info-circle" />
              </Tooltip>
            ) : null
          }
        />
      )}
    </Form.Item>
  );
};
