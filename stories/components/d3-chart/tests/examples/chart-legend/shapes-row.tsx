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


            <Card w={"700px"}>
                <Card.Header pt={4}>
                    <Card.Title tag={"h4"} m={0} inline={true}>
                        Checkbox with rattern and trend
                    </Card.Title>
                </Card.Header>
                <Card.Body tag={Flex} direction="column">
                    <ChartLegend
                        items={legendItems}
                        onChangeVisibleItem={handleChangeVisible}
                        onMouseEnterItem={handleMouseEnter}
                        onMouseLeaveItem={handleMouseLeave}
                        dataHints={dataHints}
                        patterns
                        aria-label={"Checkboxes M with trend"}
                        pr={4}
                        trendIsVisible={trendIsVisible}
                        onTrendIsVisibleChange={setTrendIsVisible}
                        withTrend

                    />
                    <ChartLegend
                        items={legendItems}
                        onChangeVisibleItem={handleChangeVisible}
                        onMouseEnterItem={handleMouseEnter}
                        onMouseLeaveItem={handleMouseLeave}
                        dataHints={dataHints}
                        patterns
                        size='l'
                        aria-label={"Checkboxes L with trend"}
                        trendIsVisible={trendIsVisible}
                        onTrendIsVisibleChange={setTrendIsVisible}
                        withTrend
                    />
                </Card.Body>
            </Card>

            <Card w={"700px"}>
                <Card.Header pt={4}>
                    <Card.Title tag={"h4"} m={0} inline={true}>
                        Line
                    </Card.Title>
                </Card.Header>
                <Card.Body tag={Flex} direction="column">
                    <ChartLegend
                        items={legendItems}
                        dataHints={dataHints}
                        patterns
                        shape="Line"
                        aria-label={"Line M"}
                        pr={4}
                    />
                    <ChartLegend
                        items={legendItems}
                        dataHints={dataHints}
                        patterns
                        shape="Line"
                        size='l'
                        aria-label={"SLine M"}
                    />
                </Card.Body>
            </Card>

            <Card w={"700px"}>
                <Card.Header pt={4}>
                    <Card.Title tag={"h4"} m={0} inline={true}>
                        Circle
                    </Card.Title>
                </Card.Header>
                <Card.Body tag={Flex} direction="column">
                    <ChartLegend
                        items={legendItems}
                        dataHints={dataHints}
                        patterns
                        shape="Circle"
                        aria-label={"Circle M"}
                        pr={4}
                    />
                    <ChartLegend
                        items={legendItems}
                        dataHints={dataHints}
                        patterns
                        shape="Circle"
                        size='l'
                        aria-label={"Circle L"}
                    />
                </Card.Body>
            </Card>

            <Card w={"700px"}>
                <Card.Header pt={4}>
                    <Card.Title tag={"h4"} m={0} inline={true}>
                        Square
                    </Card.Title>
                </Card.Header>
                <Card.Body tag={Flex} direction="column">
                    <ChartLegend
                        items={legendItems}
                        dataHints={dataHints}
                        patterns
                        shape="Square"
                        aria-label={"Square M"}
                        pr={4}
                    />
                    <ChartLegend
                        items={legendItems}
                        dataHints={dataHints}
                        shape="Square"
                        size='l'
                        aria-label={"Square L"}
                    />
                </Card.Body>
            </Card>


            <Card w={"700px"}>
                <Card.Header pt={4}>
                    <Card.Title tag={"h4"} m={0} inline={true}>
                        Patterns only
                    </Card.Title>
                </Card.Header>
                <Card.Body tag={Flex} direction="column">
                    <ChartLegend
                        items={legendItems}
                        patterns
                        size='l'
                        aria-label={"Patterns only L"}
                        pr={4}
                    />
                    <ChartLegend
                        items={legendItems}
                        patterns
                        aria-label={"Patterns only M"}
                    />
                </Card.Body>

            </Card>
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
