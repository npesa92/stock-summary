import React from 'react';
import styled from 'styled-components';

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
    font-size: 24px;
    font-weight: bold;
    margin: 0 6px 8px 0;
`;

const PreCloseChange = styled.span`
    font-size: 20px;
    color: green;
    font-weight: bold;
    margin-bottom: 8px;
`;

const PostClosePrice = styled.span`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const PriceTime = styled.div`
    font-size: 16px;
    color: rgba(0,0,0,0.44);
`;

const SummaryPrice = () => {
    return (
        <SummaryPriceContainer>
            <SinglePriceContainer>
                <BeforeCloseRow>
                    <PreClosePrice>113.80</PreClosePrice>
                    <PreCloseChange>+0.11 (+0.10%)</PreCloseChange>
                </BeforeCloseRow>
                <PriceTime>At close: 4:00PM EDT</PriceTime>
            </SinglePriceContainer>
            <SinglePriceContainer>
                <PostClosePrice>113.80 0.00 (0.00%)</PostClosePrice>
                <PriceTime>After hours 4:17PM EDT</PriceTime>
            </SinglePriceContainer>
        </SummaryPriceContainer>
    );
};

export { SummaryPrice };