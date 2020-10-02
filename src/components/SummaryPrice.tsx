import React from 'react';
import styled from 'styled-components';
import { AppStateStockPrice } from './../models';

const SummaryPriceContainer = styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 20px;
`;

const SinglePriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`;

const BeforeCloseRow = styled.div`
    display: flex;
    align-items: flex-end;
`;

const PreClosePrice = styled.span`
    font-size: 42px;
    font-weight: bold;
    margin: 0 12px 8px 0;
`;

const PreCloseChange = styled.span`
    font-size: 28px;
    color: green;
    font-weight: bold;
    margin-bottom: 8px;

    &.positive {
        color: green;
    }
    &.negative {
        color: red;
    }
`;

const PostClosePrice = styled.span`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;
    margin-right: 12px;
`;

const PostCloseChange = styled.span`
    font-size: 28px;
    color: rgba(0,0,0,0.44);
    font-weight: bold;
    margin-bottom: 8px;
`;

const PriceTime = styled.div`
    font-size: 16px;
    color: rgba(0,0,0,0.44);
`;

interface SummaryPriceProps {
    price: AppStateStockPrice;
}

const SummaryPrice: React.FC<SummaryPriceProps> = ({ price }) => {

    const getFormattedTime = (time?: number) => {
        if (time) {
            const date = new Date(time * 1000);
            const hours = date.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const h = hours % 12 ?? 12;
            const m = date.getMinutes();
            return `${h}:${m < 10 ? `0${m}` : m} ${ampm}`;
        } else {
            return '--';
        }
    };

    return (
        <SummaryPriceContainer>
            <SinglePriceContainer>
                <BeforeCloseRow>
                    <PreClosePrice>{price.price}</PreClosePrice>
                    <PreCloseChange
                        className={price.priceChange.indexOf('-') > -1 ? 'negative' : 'positive'}
                    >
                        {price.priceChange} ({price.priceChangePercent})
                    </PreCloseChange>
                </BeforeCloseRow>
                <PriceTime>At close: {getFormattedTime(price.priceTime)}</PriceTime>
            </SinglePriceContainer>
            <SinglePriceContainer>
                <BeforeCloseRow>
                    <PostClosePrice>{price.postMarketPrice}</PostClosePrice>
                    <PostCloseChange>{price.postMarketPriceChange} ({price.postMarketPriceChangePercent})</PostCloseChange>
                </BeforeCloseRow>
                <PriceTime>After hours: {getFormattedTime(price.postMarketTime)}</PriceTime>
            </SinglePriceContainer>
        </SummaryPriceContainer>
    );
};

export { SummaryPrice };