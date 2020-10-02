import React from 'react';
import styled from 'styled-components';

const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.span`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
`;

const MarketCurrency = styled.div`
    font-size: 14px;
    color: rgba(0,0,0,0.44);
`;

interface SummaryNameProps {
    symbol: string;
    name: string;
    market: string;
    currency: string;
}

const SummaryName: React.FC<SummaryNameProps> = ({
    symbol,
    name,
    market,
    currency,
}) => {
    return (
        <NameContainer>
            <Name>{`${name} (${symbol})`}</Name>
            <MarketCurrency>{`${market}. Currency in ${currency}`}</MarketCurrency>
        </NameContainer>
    );
};

export { SummaryName };
