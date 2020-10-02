export interface IGlobalPriceObject {
    raw: number;
    fmt: string;
    longFmt?: string;
}

export interface IPrice {
    quoteSourceName: string;
    regularMarketOpen: IGlobalPriceObject;
    exchange: string;
    regularMarketDayHigh: IGlobalPriceObject;
    shortName: string;
    longName: string;
    currencySymbol: string;

}

export interface IStock {
    price: IPrice;
}