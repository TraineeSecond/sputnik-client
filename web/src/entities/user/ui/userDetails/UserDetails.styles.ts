import { Button, Descriptions, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const StyledProfileSection = styled.section`
  width: 100%;
`;

export const StyledTitle = styled(Title)`
  font-size: 1.5rem !important;
`;

export const StyledDescriptions = styled(Descriptions)`
  margin-bottom: 2rem;

  .ant-descriptions-title {
    font-size: 1.5rem;
  }

  .ant-descriptions-item-label {
    font-size: 1rem;
    font-weight: bold;
  }

  .ant-descriptions-item-content {
    font-size: 1rem;
  }
`;

export const StyledButton = styled(Button)`
  height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
`;
