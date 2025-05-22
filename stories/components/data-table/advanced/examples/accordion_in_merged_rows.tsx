import React from 'react';
import { DataTable, ROW_GROUP, ACCORDION } from "@semcore/ui/data-table";

const data = [
    {
        [ACCORDION]: <div>Accordeon component</div>,
        keyword: "ebay buy",
        [ROW_GROUP]: [
            {
                kd: "77.8",
                cpc: "$1.25",
                vol: "32,500,000",
            },
            {
                kd: "-",
                cpc: "$0",
                vol: "n/a",
            },
            {
                kd: "75.89",
                cpc: "$0",
                vol: "21,644,290",
            },
        ],
    },
    {
        keyword: "www.ebay.com",
        [ROW_GROUP]: [
            {
                kd: "11.2",
                cpc: "$3.4",
                vol: "65,457,920",
            },
            {
                kd: "10",
                cpc: "$0.65",
                vol: "47,354,640",
            },
        ],
    },
    {
        keyword: "www.ebay.com",
        kd: "11.2",
        cpc: "$3.4",
        vol: "65,457,920",
        [ACCORDION]: <div>Accordeon component</div>,
    },
];

export default function App() {
    return (
        <DataTable
            data={data}
            aria-label={"Rows grouping"}
            columns={[
                { name: "keyword", children: "Keyword" },
                { name: "kd", children: "KD %" },
                { name: "cpc", children: "CPC" },
                { name: "vol", children: "Vol." },
            ]}
        />
    );
}
