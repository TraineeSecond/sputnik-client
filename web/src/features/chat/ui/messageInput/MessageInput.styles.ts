import { Button, Input } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  && {
    textarea.ant-input {
      transition: height 100ms ease;
    }
  }
  && textarea.ant-input:focus {
    border-color: #d9d9d9;
    box-shadow: none;
  }
  && textarea.ant-input:hover {
    border-color: #d9d9d9;
    box-shadow: none;
  }
`;

export const StyledTextArea = styled(TextArea)`
  flex: 1;
  border-bottom-right-radius: 0rem;
  scrollbar-width: thin;
`;

export const StyledSendButton = styled(Button)`
  margin-left: 1rem;
  align-self: flex-end;

  font-size: 1rem;
  color: #4096ff;
  border-color: #d9d9d9;
  &.ant-btn[disabled] {
    cursor: default;
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
    background: none;
    box-shadow: none;
  }
`;
