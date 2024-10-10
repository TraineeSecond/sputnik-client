import { Form, Modal, Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

export const StyledForm = styled(Form)``;

export const StyledFormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255);
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 300px;
`;
export const StyledSelect = styled(Select<string>)``;

export const StyledOption = styled(Option)``;

export const StyledModal = styled(Modal)``;
