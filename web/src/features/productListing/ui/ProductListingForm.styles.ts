import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
} from 'antd';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  max-width: 40rem;
  width: 100%;
`;

export const StyledTitle = styled(Typography.Title)``;

export const StyledFormItem = styled(Form.Item)``;

export const StyledInput = styled(Input)`
  font-size: 1rem;
`;

export const StyledTextArea = styled(Input.TextArea)`
  font-size: 1rem;
`;

export const StyledContainer = styled.div`
  display: flex;
  gap: 1rem;

  & > *:nth-child(1) {
    flex: 2;
  }

  & > *:nth-child(2) {
    flex: 3;
  }
`;

export const StyledSelect = styled(Select)`
  font-size: 1rem;
`;

export const StyledOption = styled(Select.Option)`
  font-size: 1rem;
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  }
`;

export const StyledButton = styled(Button)`
  font-size: 1rem;
`;

export const StyledSpace = styled(Space)`
  gap: 1rem;
`;
