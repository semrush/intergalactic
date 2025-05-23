import React from "react";
import {
    ChartLegend,
    makeDataHintsContainer,
} from "@semcore/d3-chart";
import { scaleLinear, scaleBand } from "d3-scale";
import { Flex } from "@semcore/flex-box";
import Card from "@semcore/card";

const dataHints = makeDataHintsContainer();

const Demo = () => {
    const [trendIsVisible, setTrendIsVisible] = React.useState(true);
    const [legendItems, setLegendItems] = React.useState(
        Object.keys(data[0])
            .filter((name) => name !== "bar")
            .map((item, index) => {
                return {
                    id: item,
                    label: `Category ${item}`,
                    checked: true,
                    color: `chart-palette-order-${index + 1}`,
                    additionalInfo: { count: 15 },
                };
            })
    );


    const [highlightedLine, setHighlightedLine] = React.useState(-1);

    const handleChangeVisible = React.useCallback(
        (id: string, isVisible: boolean) => {
            console.log("Gg", { id, isVisible });

            setLegendItems((prevItems) => {
                return prevItems.map((item) => {
                    if (item.id === id) {
                        item.checked = isVisible;
                    }

                    return item;
                });
            });
        },
        []
    );

    const handleMouseEnter = React.useCallback((id: string) => {
        setHighlightedLine(legendItems.findIndex((line) => line.id === id));
    }, []);
    const handleMouseLeave = React.useCallback(() => {
        setHighlightedLine(-1);
    }, []);

    return (
        <>
            <Flex direction="row">
                <Card w={"550px"}>
                    <Card.Header >
                        <Card.Title tag={"h4"} m={0} inline={true}>
                            Checkbox with pattern
                        </Card.Title>
                    </Card.Header>
                    <Card.Body tag={Flex} direction="row">
                        <ChartLegend
                            items={legendItems}
                            onChangeVisibleItem={handleChangeVisible}
                            onMouseEnterItem={handleMouseEnter}
                            onMouseLeaveItem={handleMouseLeave}
                            dataHints={dataHints}
                            patterns
                            direction="column"
                            aria-label={"Stacked bar chart legend"}
                            pr={4}
                        />
                        <ChartLegend
                            items={legendItems}
                            onChangeVisibleItem={handleChangeVisible}
                            onMouseEnterItem={handleMouseEnter}
                            onMouseLeaveItem={handleMouseLeave}
                            dataHints={dataHints}
                            patterns
                            direction="column"
                            size='l'
                            aria-label={"Stacked bar chart legend"}
                        />
                    </Card.Body>


                </Card>

                <Card w={"550px"}>
                    <Card.Header >
                        <Card.Title tag={"h4"} m={0} inline={true}>
                            Line
                        </Card.Title>
                    </Card.Header>
                    <Card.Body tag={Flex} direction="row">
                        <ChartLegend
                            items={legendItems}
                            dataHints={dataHints}
                            patterns
                            direction="column"
                            shape="Line"
                            aria-label={"Stacked bar chart legend"}
                            pr={4}
                        />
                        <ChartLegend
                            items={legendItems}
                            dataHints={dataHints}
                            patterns
                            direction="column"
                            shape="Line"
                            size='l'
                            aria-label={"Stacked bar chart legend"}
                        />
                    </Card.Body>


                </Card>
            </Flex>
            <Flex direction="row">
                <Card w={"550px"}>
                    <Card.Header pt={2}>
                        <Card.Title tag={"h4"} m={0} inline={true}>
                            Circle
                        </Card.Title>
                    </Card.Header>
                    <Card.Body tag={Flex} direction="row">
                        <ChartLegend
                            items={legendItems}
                            dataHints={dataHints}
                            patterns
                            direction="column"
                            shape="Circle"
                            aria-label={"Stacked bar chart legend"}
                            pr={4}
                        />
                        <ChartLegend
                            items={legendItems}
                            dataHints={dataHints}
                            patterns
                            direction="column"
                            shape="Circle"
                            size='l'
                            aria-label={"Stacked bar chart legend"}
                        />
                    </Card.Body>


                </Card>

                <Card w={"550px"}>
                    <Card.Header >
                        <Card.Title tag={"h4"} m={0} inline={true}>
                            Square
                        </Card.Title>
                    </Card.Header>
                    <Card.Body tag={Flex} direction="row">
                        <ChartLegend
                            items={legendItems}
                            dataHints={dataHints}
                            patterns
                            direction="column"
                            shape="Square"
                            aria-label={"Stacked bar chart legend"}
                            pr={4}
                        />
                        <ChartLegend
                            items={legendItems}
                            dataHints={dataHints}
                            shape="Square"
                            direction="column"
                            size='l'
                            aria-label={"Stacked bar chart legend"}
                        />
                    </Card.Body>


                </Card>

            </Flex>

            <Flex direction="row">
                <Card w={"550px"}>
                    <Card.Header >
                        <Card.Title tag={"h4"} m={0} inline={true}>
                            Patterns only
                        </Card.Title>
                    </Card.Header>
                    <Card.Body tag={Flex} direction="row">
                        <ChartLegend
                            items={legendItems}
                            patterns
                            direction="column"
                            size='l'
                            aria-label={"Stacked bar chart legend"}
                            pr={4}
                        />
                        <ChartLegend
                            items={legendItems}
                            patterns
                            direction="column"
                            aria-label={"Stacked bar chart legend"}
                        />
                    </Card.Body>


                </Card>

                <Card w={"550px"}>
                    <Card.Header >
                        <Card.Title tag={"h4"} m={0} inline={true}>
                            Patterns only
                        </Card.Title>
                    </Card.Header>
                    <Card.Body tag={Flex} direction="row">
                        <ChartLegend
                            items={legendItems}
                            patterns
                            direction="column"
                            size='l'
                            aria-label={"Stacked bar chart legend"}
                            trendIsVisible={trendIsVisible}
                            onTrendIsVisibleChange={setTrendIsVisible}
                            withTrend
                            pr={4}
                        />
                        <ChartLegend
                            items={legendItems}
                            patterns
                            direction="column"
                            aria-label={"Stacked bar chart legend"}
                            trendIsVisible={trendIsVisible}
                            onTrendIsVisibleChange={setTrendIsVisible}
                            withTrend
                        />
                    </Card.Body>


                </Card>
            </Flex>
        </>
    );
};

const data = [...Array(5).keys()].map((d, i) => ({
    bar: `Bar ${i + 1}`,
    1: Math.random() * 5,
    2: Math.random() * 5,
    3: Math.random() * 5,
}));

export default Demo;
