import { Button, Checkbox, Form, Input, Typography } from 'antd';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  width: 30rem;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const StyledTitle = styled(Typography.Title)`
  text-align: center;
`;

export const StyledFormItem = styled(Form.Item)``;

export const StyledButton = styled(Button)`
  height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
`;

export const StyledInput = styled(Input)`
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
`;

export const StyledPasswordInput = styled(Input.Password)`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
`;

export const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox + span {
    font-size: 1rem;
  }
`;

export const StyledParagraph = styled.p`
  text-align: center;
  font-size: 1rem;
`;
