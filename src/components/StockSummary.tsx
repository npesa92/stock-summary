import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from './../store/reducers';
import { SummaryName, SummaryPrice, SectionTabs } from './';

const SummaryWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const StockSummaryComponent: React.FC<ConnectedProps<typeof StockSummary>> = ({
    isLoadingSummary,
    currentStock,
}) => {

    useEffect(() => {
        console.log(currentStock);
    }, [currentStock]);

    return (
        <SummaryWrapper>
            <Row>
                <SummaryName symbol={'AYX'} name={'Alteryx Inc.'} market={'NYSE'} currency={'USD'}/>
            </Row>
            <SummaryPrice />
            <SectionTabs />
        </SummaryWrapper>
    );
};

const mapStateToProps = (state: IAppState) => {
    return {
        isLoadingSummary: state.isLoadingSummary,
        currentStock: state.currentStock,
    };
};

const StockSummary = connect(mapStateToProps);

export default StockSummary(StockSummaryComponent);
