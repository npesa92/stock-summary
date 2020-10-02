import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { Chart } from 'react-google-charts';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from './../store/reducers';
import { loadChartData } from './../store/actions';

const ChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 24px;
`;

const SelectionRow = styled.div`
    display: flex;
    width: 100%;
`;

const ViewItem = styled.div`
    font-weight: bold;
    color: rgba(0,0,0,0.74);
    padding: 8px 24px;

    &.selected {
        color: blue;
    }
`;

const ChartWrapper = styled.div`
    border: 1px solid rgba(0,0,0,0.24);
    height: 100%;
    width: 100%;
`;

const LoadingChart = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SummaryChartComponent: React.FC<ConnectedProps<typeof SummaryChart>> = ({
    currentStock,
    chartData,
    loadChart,
}) => {

    const [view, setView] = useState('1d');
    const [isChartShowing, setChartVisibilityState] = useState(false);
    const [isChartLoading, setChartLoadingState] = useState(false);

    const [chart, setChart] = useState<any[][]>([]);

    const viewSelection = ['1d', '5d', '1mo', '6mo', '1y', '5y'];

    useEffect(() => {
        if (currentStock) {
            loadChart(currentStock.name.symbol, view);
        }
    }, [currentStock]);

    useEffect(() => {
        if (currentStock) {
            setChartLoadingState(true);
            loadChart(currentStock.name.symbol, view);
        }
    }, [view]);

    useEffect(() => {
        if (chartData) {
            let time: number[] = [];
            let open: number[] = [];
            let closed: number[] = [];
            const charts: any[][] = [
                ['Date', 'Open', 'Close'],
            ];
            if (chartData.chart && chartData.chart.result && chartData.chart.result.length > 0) {
                const result = chartData.chart.result[0];
                if (result.indicators.quote && result.indicators.quote.length > 0) {
                    open = result.indicators.quote[0].open;
                    closed = result.indicators.quote[0].close;
                }
                if (result.timestamp && result.timestamp.length > 0) {
                    time = result.timestamp;
                }
                if (open.length > 0 && time.length > 0) {
                    open.forEach((value, index) => {
                        let dateDisplay = '';
                        if (time[index]) {
                            const t = new Date(time[index] * 1000);
                            dateDisplay = `${t.getMonth() + 1}/${t.getDate()}`;
                        } else {
                            dateDisplay = `${index}`;
                        }
                        const open = value ?? 0;
                        const close = closed[index] ?? 0;
                        charts.push([dateDisplay, open, close]);
                    });
                }
            }
            setChart(charts);
            setChartVisibilityState(true);
            setChartLoadingState(false);
        } else {
            setChartVisibilityState(false);
        }
    }, [chartData]);

    return (
        <ChartContainer>
            <SelectionRow>
            {
                viewSelection.map((item) => {
                    return (
                        <ViewItem
                            key={item}
                            className={item === view ? 'selected' : 'unselected'}
                            onClick={() => setView(item)}
                        >
                            {item}
                        </ViewItem>
                    );
                })
            }
            </SelectionRow>
            {
                (isChartShowing && !isChartLoading) && (
                    <ChartWrapper>
                        <Chart
                            width={'520px'}
                            height={'500px'}
                            chartType={'AreaChart'}
                            loader={<div />}
                            data={chart}
                            options={{
                                chartArea: { width: '50%', height: '70%' }
                            }}
                        />
                    </ChartWrapper>
                )
            }
            {
                (isChartLoading) &&
                    <LoadingChart><span>Loading Chart...</span></LoadingChart>
            }
        </ChartContainer>
    );
};

const mapStateToProps = (state: IAppState) => {
    return {
        currentStock: state.currentStock,
        chartData: state.stockChart,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadChart: (symbol: string, period: string) => dispatch(loadChartData(symbol, period)),
    };
};

const SummaryChart = connect(mapStateToProps, mapDispatchToProps);

export default SummaryChart(SummaryChartComponent);
