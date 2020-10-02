import {
    Action,
    ACTION_TYPE,
} from './actions';
import { AppStateStock, ChartData } from './../models';

export interface IAppState {
    stocks: any[];
    currentStock?: AppStateStock;
    stockChart?: ChartData;
    query: string;
    isLoadingResults: boolean;
    isLoadingSummary: boolean;
}

export const initialAppState: IAppState = {
    stocks: [],
    query: '',
    isLoadingResults: false,
    isLoadingSummary: false,
};

export const rootReducer = (state: IAppState = initialAppState, action: Action) => {
    switch (action.type) {
        case ACTION_TYPE.SET_STOCK_RESULTS_LOADING:
            return {
                ...state,
                isLoadingResults: action.isLoading,
            };
        case ACTION_TYPE.SET_STOCK_SEARCH_RESULTS:
            return {
                ...state,
                stocks: action.stocks,
            };
        case ACTION_TYPE.SET_STOCK_SUMMARY_LOADING:
            return {
                ...state,
                isLoadingSummary: action.isLoading,
            };
        case ACTION_TYPE.SET_CURRENT_STOCK:
            return {
                ...state,
                currentStock: action.stock,
            };
        case ACTION_TYPE.SET_CHART_DATA:
            return {
                ...state,
                stockChart: action.data,
            };
        default:
            return state;
    }
}