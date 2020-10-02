import React, { useState } from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 24px;
`;

const Tab = styled.div`
    padding: 12px 12px;
    border-bottom: 3px solid rgba(0,0,0,0.24);
    text-align: center;
    flex: 1;

    span {
        color: blue;
        font-size: 16px;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
    }
    
    &.selected {
        border-bottom: 3px solid blue;
        span {
            color: black;
        }
    }
`;

const SectionTabs = () => {

    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [
        "Summary",
        "Company Outlook",
        "Chart",
        "Conversations",
        "Statistics",
        "Historical Data",
        "Profile",
        "Financials",
        "Analysis",
        "Options",
    ];

    return (
        <TabContainer>
        {
            tabs.map((tab: string, index: number) => {
                return (
                    <Tab
                        key={tab}
                        className={selectedTab === index ? 'selected' : 'unselected'}
                        onClick={() => setSelectedTab(index)}
                    >
                        <span>{tab}</span>
                    </Tab>
                );
            })
        }
        </TabContainer>
    );
};

export { SectionTabs };
