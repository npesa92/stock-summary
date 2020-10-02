export enum ACTION_TYPE {
    SET_STOCK_RESULTS_LOADING = 'SET_STOCK_RESULTS_LOADING',
    REQUEST_STOCKS = 'REQUEST_STOCKS',
    SET_STOCK_SEARCH_RESULTS = 'SET_STOCK_SEARCH_RESULTS',
    SET_STOCK_SUMMARY_LOADING = 'SET_STOCK_SUMMARY_LOADING',
    FETCH_STOCK_SUMMARY = 'FETCH_STOCK_SUMMARY',
    SET_CURRENT_STOCK = 'SET_CURRENT_STOCK',
}

export const setStockResultsLoading = (isLoading: boolean) => {
    return { type: ACTION_TYPE.SET_STOCK_RESULTS_LOADING, isLoading };
}

export const requestStocks = (query: string) => {
    return { type: ACTION_TYPE.REQUEST_STOCKS, query };
};

export const setStockSearchResults = (stocks: any[]) => {
    return { type: ACTION_TYPE.SET_STOCK_SEARCH_RESULTS, stocks };
};

export const setStockSummaryLoading = (isLoading: boolean) => {
    return { type: ACTION_TYPE.SET_STOCK_SUMMARY_LOADING, isLoading };
};

export const fetchStockSummary = (symbol: string) => {
    return { type: ACTION_TYPE.FETCH_STOCK_SUMMARY, symbol };
};

export const setCurrentStock = (stock: any) => {
    return { type: ACTION_TYPE.SET_CURRENT_STOCK, stock };
};

export type Action = 
    { type: ACTION_TYPE.SET_STOCK_RESULTS_LOADING, isLoading: boolean } |
    { type: ACTION_TYPE.REQUEST_STOCKS, query: string } |
    { type: ACTION_TYPE.SET_CURRENT_STOCK, stock: any } |
    { type: ACTION_TYPE.SET_STOCK_SEARCH_RESULTS, stocks: any[] } |
    { type: ACTION_TYPE.SET_STOCK_SUMMARY_LOADING, isLoading: boolean } |
    { type: ACTION_TYPE.FETCH_STOCK_SUMMARY, symbol: string };