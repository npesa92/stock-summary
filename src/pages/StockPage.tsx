import React from 'react';
import styled from 'styled-components';
import { StockSearch } from './../components';
import { StockSummary } from './../components';

const Root = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 72px;
`;

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    padding: 32px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow:
        0px 1px 5px 0px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

const StockPage = () => {
    return (
        <Root>
            <Container>
                <StockSearch />
            </Container>
            <Container>
                <StockSummary />
            </Container>

        </Root>
    );
};

export { StockPage };
