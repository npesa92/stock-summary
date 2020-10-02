import axios from 'axios';

class YahooFinanceService {

    private host = 'apidojo-yahoo-finance-v1.p.rapidapi.com';
    private key = '4d8e29ce47msh5ef067664df289dp188db9jsn1986c7fbc41e';
    private baseUrl = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com';

    private get headers() {
        return {
            'x-rapidapi-host': this.host,
            'x-rapidapi-key': this.key,
        };
    }

    public searchStocks(query: string) {
        const params = new URLSearchParams();
        params.append('region', 'US');
        params.append('q', query);
        return axios({
            url: `${this.baseUrl}/auto-complete`,
            method: 'GET',
            headers: this.headers,
            params: params,
        });
    }

    public fetchStockSumamry(symbol: string) {
        const params = new URLSearchParams();
        params.append('region', 'US');
        params.append('symbol', symbol);
        return axios({
            url: `${this.baseUrl}/stock/v2/get-summary`,
            method: 'GET',
            headers: this.headers,
            params: params,
        });
    }
}

export default new YahooFinanceService();