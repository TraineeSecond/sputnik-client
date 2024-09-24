import { Button, Card, Row, Typography } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

export const StyledCard = styled(Card)`
    width: 25rem;
    height: 40rem;
`;

export const StyledRow = styled(Row)`
    display: grid;
    grid-template-rows: max-content 3rem 6rem 1.5rem;
`

export const StyledTitle = styled(Title)``

export const StyledText = styled(Text)``

export const StyledDescriptionText = styled(Text)`
    height: 5.5rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`

export const StyeledButton = styled(Button)``