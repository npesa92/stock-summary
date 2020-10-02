export interface SummaryListItem {
    label: string;
    value: string;
}

export interface IGlobalPriceObject {
    raw: number;
    fmt: string;
    longFmt?: string;
}

export interface IPrice {
    currency: string;
    currencySymbol: string;
    exchange: string;
    exchangeName: string;
    longName: string;
    marketCap: IGlobalPriceObject;
    postMarketChange: IGlobalPriceObject;
    postMarketChangePercent: IGlobalPriceObject;
    postMarketPrice: IGlobalPriceObject;
    postMarketTime: number;
    preMarketChange: IGlobalPriceObject;
    preMarketChangePercent: IGlobalPriceObject;
    preMarketPrice: IGlobalPriceObject;
    preMarketTime: number;
    quoteSourceName: string;
    regularMarketChange: IGlobalPriceObject;
    regularMarketChangePercent: IGlobalPriceObject;
    regularMarketDayHigh: IGlobalPriceObject;
    regularMarketOpen: IGlobalPriceObject;
    regularMarketPreviousClose: IGlobalPriceObject;
    regularMarketPrice: IGlobalPriceObject;
    regularMarketVolume: IGlobalPriceObject;
    shortName: string;
}

export interface IQuoteType {
    exchange: string;
    shortName: string;
    longName: string;
    exchangeTimezoneShortName: string;
    symbol: string;
}

export interface IKeyStatistics {
    forwardEps: IGlobalPriceObject;
}

export interface IEarningsChart {
    earningsDate: IGlobalPriceObject[];
}

export interface IEarnings {
    earningsChart: IEarningsChart;
}

export interface ISummaryDetail {
    ask: IGlobalPriceObject;
    askSize: IGlobalPriceObject;
    averageVolume: IGlobalPriceObject;
    beta: IGlobalPriceObject;
    bid: IGlobalPriceObject;
    bidSize: IGlobalPriceObject;
    dayHigh: IGlobalPriceObject;
    dayLow: IGlobalPriceObject;
    fiftyTwoWeekHigh: IGlobalPriceObject;
    fiftyTwoWeekLow: IGlobalPriceObject;
    marketCap: IGlobalPriceObject;
    open: IGlobalPriceObject;
    payoutRatio: IGlobalPriceObject;
    previousClose: IGlobalPriceObject;
    regularMarketDayHigh: IGlobalPriceObject;
    regularMarketDayLow: IGlobalPriceObject;
    regularMarketOpen: IGlobalPriceObject;
    regularMarketPreviousClose: IGlobalPriceObject;
    regularMarketVolume: IGlobalPriceObject;
    twoHundredDayAverage: IGlobalPriceObject;
    volume: IGlobalPriceObject;
}

export interface IStock {
    defaultKeyStatistics: IKeyStatistics;
    earnings: IEarnings;
    price: IPrice;
    quoteType: IQuoteType;
    summaryDetail: ISummaryDetail;
}

export interface AppStateStockName {
    currency: string;
    market: string;
    name: string;
    symbol: string;
}

export interface AppStateStockPrice {
    postMarketPrice: string;
    postMarketPriceChange: string;
    postMarketPriceChangePercent: string;
    postMarketTime?: number;
    price: string;
    priceChange: string;
    priceChangePercent: string;
    priceTime?: number;
}

export interface AppStateSummaryListRow {
    left: SummaryListItem;
    right: SummaryListItem;
}

export interface AppStateStock {
    name: AppStateStockName;
    price: AppStateStockPrice;
    summaryList: AppStateSummaryListRow[];
}

export interface ChartQuote {
    close: number[];
    high: number[];
    low: number[];
    open: number[];
}

export interface ChartResults {
    indicators: {
        quote: ChartQuote[];
    };
    meta: any;
    timestamp: number[];
}

export interface ChartData {
    chart: {
        result: ChartResults[];
        error: null | any;
    };
}