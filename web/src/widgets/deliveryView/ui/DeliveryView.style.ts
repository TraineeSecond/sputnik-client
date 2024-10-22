import { Button, DatePicker, Form, Select } from 'antd';
import styled from 'styled-components';

export const StyledDeliveryViewContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const StyledMapContainer = styled.div`
  flex: 1;
`;

export const StyledFormContainer = styled.div`
  width: 400px;
  padding-left: 20px;
`;

export const StyledForm = styled(Form)``;

export const StyledFormItem = styled(Form.Item)``;

export const StyledSelect = styled(Select<number>)`
  width: 100%;
`;

export const StyledSelectOption = styled(Select.Option)``;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const StyledButton = styled(Button)``;
