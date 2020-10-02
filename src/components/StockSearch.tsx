import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Dispatch, Action } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from './../store/reducers';
import { requestStocks, fetchStockSummary, setStockSearchResults } from './../store/actions';

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    transition: 250ms ease;

    &.open {
        height: 300px;
    }

    &.closed {
        height: 30px;
    }
`;

const SearchInput = styled.input`
    outline: none;
    border-style: none;
    border: none;
    border-bottom: 1px solid black;
    width: 100%;
    padding: 0 0 8px 0;
    margin-bottom: 8px;
`;

const ListItem = styled.div`
    display: flex;
    width: 100%;
    border-radius: 4px;
    padding: 12px 8px;
    margin-bottom: 8px;
    cursor: pointer;
    
    &:hover {
        background: rgba(0,0,0,0.24);
    }
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
`;

interface NameSymbolPair {
    symbol: string;
    name: string;
}

const StockSearchComponent: React.FC<ConnectedProps<typeof StockSearch>> = ({
    stocks,
    isLoadingResults,
    query,
    fetchStockSummary,
    reset,
}) => {

    const [stockQuotes, setStockQuotes] = useState<any[]>([]);
    const [focused, setFocusState] = useState(false);

    useEffect(() => {
        const symbolNamePair = stocks.map((stock) => {
            const name = stock.shortname ?? stock.longname;
            return {symbol: stock.symbol, name};
        });
        const filtered = symbolNamePair.reduce((acc: NameSymbolPair[], cur: NameSymbolPair) => {
            const x = acc.find((item) => item.symbol === cur.symbol);
            return !x ? [...acc, cur] : acc;
        }, []);
        setStockQuotes(filtered);
    }, [stocks]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            query(event.target.value);
        } else {
            reset();
        }
    };

    const onChoice = (symbol: string) => {
        fetchStockSummary(symbol);
    };

    return (
        <SearchWrapper className={focused ? 'open' : 'closed'}>
            <SearchInput onFocus={() => setFocusState(true)} onBlur={() => setFocusState(false)} placeholder={'Search Stocks'} onChange={onChange} />
            {
                isLoadingResults &&
                <p>Loading results...</p>
            }
            <ListWrapper>
            {
                (!isLoadingResults && stockQuotes.length > 0) &&
                stockQuotes.map((stock: any) => {
                    return (
                        <ListItem
                            key={stock.symbol}
                            onClick={() => onChoice(stock.symbol)}
                        >
                            {`${stock.name} (${stock.symbol})`}
                        </ListItem>
                    );
                })
            }
            </ListWrapper>
        </SearchWrapper>
    );
};

const mapStateToProps = (state: IAppState) => {
    return {
        stocks: state.stocks,
        isLoadingResults: state.isLoadingResults,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        query: (query: string) => dispatch(requestStocks(query)),
        fetchStockSummary: (symbol: string) => dispatch(fetchStockSummary(symbol)),
        reset: () => dispatch(setStockSearchResults([])),
    };
};

const StockSearch = connect(mapStateToProps, mapDispatchToProps);

export default StockSearch(StockSearchComponent);
