import { put, takeEvery, takeLatest, delay, all } from 'redux-saga/effects';
import {
    IStock,
    AppStateStockName,
    AppStateStockPrice,
    AppStateSummaryListRow,
    AppStateStock,
} from '../models';
import YahooFinanceService from './../services/YahooFinanceService';
import {
    ACTION_TYPE,
    setStockResultsLoading,
    setStockSearchResults,
    setStockSummaryLoading,
    setCurrentStock,
    setChartData,
} from './actions';

const getNameData = (stock: IStock): AppStateStockName  => {
    const name = stock.quoteType.shortName ?? stock.quoteType.longName ?? '--';
    const symbol = stock.quoteType?.symbol ?? '--';
    const market = stock.quoteType?.exchange ?? '--';
    const currency = stock.price?.currency ?? '--';
    return {
        name,
        symbol,
        market,
        currency,
    };
};

const getPriceData = (stock: IStock): AppStateStockPrice => {
    const price = stock.price.regularMarketPrice.fmt ?? '--';
    const priceChange = stock.price.regularMarketChange.fmt ?? '--';
    const priceChangePercent = stock.price.regularMarketChangePercent.fmt ?? '--';
    const priceTime = stock.price.preMarketTime ?? undefined;
    const postMarketPrice = stock.price.postMarketPrice.fmt ?? '--';
    const postMarketPriceChange = stock.price.postMarketChange?.fmt ?? '--';
    const postMarketPriceChangePercent = stock.price.postMarketChangePercent?.fmt ?? '--';
    const postMarketTime = stock.price.postMarketTime ?? undefined;
    return {
        price,
        priceChange,
        priceChangePercent,
        priceTime,
        postMarketPrice,
        postMarketPriceChange,
        postMarketPriceChangePercent,
        postMarketTime,
    }
}

const getSummaryItem = (label: string, value: string) => {
    return {
        label,
        value: value ?? '--',
    };
}

const getSummaryListData = (stock: IStock): AppStateSummaryListRow[] => {
    const { summaryDetail, defaultKeyStatistics, earnings } = stock;
    let earningsDisplay = '--';
    if (earnings && earnings.earningsChart?.earningsDate?.length === 2) {
        const { earningsDate } = earnings.earningsChart;
        earningsDisplay = `${earningsDate[0].fmt} - ${earningsDate[1].fmt}`;
    }
    return [
        {
            left: getSummaryItem('Previous Close', summaryDetail.previousClose?.fmt),
            right: getSummaryItem('Market Cap', summaryDetail.marketCap?.fmt),
        },
        {
            left: getSummaryItem('Open', summaryDetail.open?.fmt),
            right: getSummaryItem('Beta', summaryDetail.beta?.fmt),
        },
        {
            left: getSummaryItem('Bid', `${summaryDetail.bid?.fmt} x ${summaryDetail.bidSize?.fmt}`),
            right: getSummaryItem('PE Ratio (TTM)', '--'),
        },
        {
            left: getSummaryItem('Ask', `${summaryDetail.ask?.fmt ?? '--'} x ${summaryDetail.askSize?.fmt ?? '--'}`),
            right: getSummaryItem('EPS (TTM)', defaultKeyStatistics.forwardEps?.fmt),
        },
        {
            left: getSummaryItem('Day\'s Range', `${summaryDetail.dayLow?.fmt ?? '--'} - ${summaryDetail.dayHigh?.fmt ?? '--'}`),
            right: getSummaryItem('Earnings Date', earningsDisplay),
        },
        {
            left: getSummaryItem('52 Week Range', `${summaryDetail.fiftyTwoWeekLow?.fmt ?? '--'} - ${summaryDetail.fiftyTwoWeekHigh?.fmt ?? '--'}`),
            right: getSummaryItem('Forward Dividend & Yield', '-- (--)'),
        },
        {
            left: getSummaryItem('Volume', summaryDetail.volume?.fmt),
            right: getSummaryItem('Ex-Dividend Date', '--'),
        },
        {
            left: getSummaryItem('Avg. Volume', summaryDetail.averageVolume?.fmt),
            right: getSummaryItem('1y Target Est', '--'),
        },
    ];
}

export function* fetchStocks(action: any) {
    yield put(setStockResultsLoading(true));
    yield delay(500);
    const res = yield YahooFinanceService.searchStocks(action.query);
    yield put(setStockSearchResults(res.data.quotes));
    yield put(setStockResultsLoading(false));
};

export function* fetchStockSummary(action: any) {
    yield put(setStockSummaryLoading(true));
    const { data } = yield YahooFinanceService.fetchStockSumamry(action.symbol);
    const stock = data as IStock;
    console.log(stock);
    const appStock: AppStateStock = {
        name: getNameData(stock),
        price: getPriceData(stock),
        summaryList: getSummaryListData(stock),
    }
    yield put(setCurrentStock(appStock));
    yield put(setStockSummaryLoading(false));
};

interface IntervalMap {
    [key: string]: string;
}

const intervalMap: IntervalMap = {
    '1d': '60m',
    '5d': '60m',
    '1mo': '1d',
    '6mo': '1d',
    '1y': '1d',
    '5y': '1d'
};

export function* loadChart(action: any) {
    const { data } = yield YahooFinanceService.loadChartData(action.symbol, action.period, intervalMap[action.period]);
    console.log(data);
    yield put(setChartData(data));
}

export function* rootSaga() {
    yield all([
        takeLatest(ACTION_TYPE.REQUEST_STOCKS, fetchStocks),
        takeEvery(ACTION_TYPE.FETCH_STOCK_SUMMARY, fetchStockSummary),
        takeLatest(ACTION_TYPE.LOAD_CHART_DATA, loadChart),
    ]);
};
