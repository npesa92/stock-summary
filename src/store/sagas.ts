import { put, takeEvery, takeLatest, delay, all } from 'redux-saga/effects';
import YahooFinanceService from './../services/YahooFinanceService';
import {
    ACTION_TYPE,
    setStockResultsLoading,
    setStockSearchResults,
    setStockSummaryLoading,
    setCurrentStock,
} from './actions';

export function* fetchStocks(action: any) {
    yield put(setStockResultsLoading(true));
    yield delay(500);
    const res = yield YahooFinanceService.searchStocks(action.query);
    yield put(setStockSearchResults(res.data.quotes));
    yield put(setStockResultsLoading(false));
};

export function* fetchStockSummary(action: any) {
    yield put(setStockSummaryLoading(true));
    const res = yield YahooFinanceService.fetchStockSumamry(action.symbol);
    yield put(setCurrentStock(res.data));
    yield put(setStockSummaryLoading(false));
};

export function* rootSaga() {
    yield all([
        takeLatest(ACTION_TYPE.REQUEST_STOCKS, fetchStocks),
        takeEvery(ACTION_TYPE.FETCH_STOCK_SUMMARY, fetchStockSummary),
    ]);
};
