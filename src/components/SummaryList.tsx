import React from 'react';
import styled from 'styled-components';
import { AppStateSummaryListRow } from './../models';

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SummaryRow = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 16px 0;
    border-bottom: 2px solid rgba(0,0,0,0.14);
`;

const SummaryItem = styled.div`
    display: flex;
    align-items: center;
`;

const ItemLabel = styled.div`
    font-size: 12px;
    color: rgba(0,0,0,0.64);
    flex: 4;
    margin-bottom: 4px;
`;

const ItemValue = styled.div`
    font-size: 16px;
    font-weight: bold;
    flex: 3;
    display: flex;
`;

const Gap = styled.div`
    width: 56px;
`;

interface SummaryListProps {
    items: AppStateSummaryListRow[];
}

const SummaryList: React.FC<SummaryListProps> = ({ items }) => {

    return (
        <ListContainer>
            {
                items.map((item: AppStateSummaryListRow, index: number) => {
                    return (
                        <SummaryItem key={index}>
                            <SummaryRow>
                                <ItemLabel>{item.left.label}</ItemLabel>
                                <ItemValue>{item.left.value}</ItemValue>
                            </SummaryRow>
                            <Gap />
                            <SummaryRow>
                                <ItemLabel>{item.right.label}</ItemLabel>
                                <ItemValue>{item.right.value}</ItemValue>
                            </SummaryRow>
                        </SummaryItem>
                    );
                })
            }
        </ListContainer>
    );
};

export { SummaryList };
