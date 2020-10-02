import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from './../store/reducers';
import {
    SummaryName,
    SummaryPrice,
    SectionTabs,
    SummaryList,
    SummaryChart,
} from './';

const SummaryWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const NameRow = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const DetailsRow = styled.div`
    display: flex;
    flex: 1;
`;

const AddButton = styled.div`
    border: 1px solid blue;
    padding: 2px 6px;
    outline: none;
    margin-left: 48px;
    border-radius: 2em;
    display: flex;
    align-items: center;
`;

const AddIcon = styled.i`
    color: blue;
    font-size: 16px;
`;

const AddText = styled.div`
    font-size: 10px;
    color: rgba(0,0,0,0.84);
`;

const StockSummaryComponent: React.FC<ConnectedProps<typeof StockSummary>> = ({
    isLoadingSummary,
    currentStock,
}) => {

    useEffect(() => {
        console.log(currentStock);
    }, [currentStock]);

    if (isLoadingSummary) return <p>Loading Stock...</p>;
    else if (!isLoadingSummary && !currentStock) return <p>Search for stocks</p>;
    else if (!isLoadingSummary && currentStock) {
        return (
            <SummaryWrapper>
                <NameRow>
                    <SummaryName
                        symbol={currentStock.name.symbol}
                        name={currentStock.name.name}
                        market={currentStock.name.market}
                        currency={currentStock.name.currency}
                    />
                    <AddButton>
                        <AddIcon className={'material-icons'}>star_outline</AddIcon>
                        <AddText>Add to Watchlist</AddText>
                    </AddButton>
                </NameRow>
                <SummaryPrice price={currentStock.price} />
                <SectionTabs />
                <DetailsRow>
                    <DetailsRow>
                        <SummaryList items={currentStock.summaryList} />
                    </DetailsRow>
                    <DetailsRow>
                        <SummaryChart />
                    </DetailsRow>
                </DetailsRow>
            </SummaryWrapper>
        );
    } else return <div />;
};

const mapStateToProps = (state: IAppState) => {
    return {
        isLoadingSummary: state.isLoadingSummary,
        currentStock: state.currentStock,
    };
};

const StockSummary = connect(mapStateToProps);

export default StockSummary(StockSummaryComponent);
