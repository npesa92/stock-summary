import { AppStateStock, ChartData } from './../models';

export enum ACTION_TYPE {
    SET_STOCK_RESULTS_LOADING = 'SET_STOCK_RESULTS_LOADING',
    REQUEST_STOCKS = 'REQUEST_STOCKS',
    SET_STOCK_SEARCH_RESULTS = 'SET_STOCK_SEARCH_RESULTS',
    SET_STOCK_SUMMARY_LOADING = 'SET_STOCK_SUMMARY_LOADING',
    FETCH_STOCK_SUMMARY = 'FETCH_STOCK_SUMMARY',
    SET_CURRENT_STOCK = 'SET_CURRENT_STOCK',
    LOAD_CHART_DATA = 'LOAD_CHART_DATA',
    SET_CHART_DATA = 'SET_CHART_DATA',
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

export const setCurrentStock = (stock: AppStateStock) => {
    return { type: ACTION_TYPE.SET_CURRENT_STOCK, stock };
};

export const loadChartData = (symbol: string, period: string) => {
    return { type: ACTION_TYPE.LOAD_CHART_DATA, symbol, period };
}

export const setChartData = (data: ChartData) => {
    return { type: ACTION_TYPE.SET_CHART_DATA, data };
}

export type Action = 
    { type: ACTION_TYPE.SET_STOCK_RESULTS_LOADING, isLoading: boolean } |
    { type: ACTION_TYPE.REQUEST_STOCKS, query: string } |
    { type: ACTION_TYPE.SET_CURRENT_STOCK, stock: AppStateStock } |
    { type: ACTION_TYPE.SET_STOCK_SEARCH_RESULTS, stocks: any[] } |
    { type: ACTION_TYPE.SET_STOCK_SUMMARY_LOADING, isLoading: boolean } |
    { type: ACTION_TYPE.FETCH_STOCK_SUMMARY, symbol: string } |
    { type: ACTION_TYPE.LOAD_CHART_DATA, symbol: string, period: string } |
    { type: ACTION_TYPE.SET_CHART_DATA, data: ChartData };