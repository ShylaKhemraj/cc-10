//U20026580

//Dimensions of the SVG container
const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 40, left: 50 };

//Create SVG container
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 'translate(${margin.left},${margin.top})');

//Load data
d3.csv("https://raw.githubusercontent.com/plotly/datasets/master.csv").then(data => {

    data.forEach(d => {
        d.Date = d3.timeParse("%Y=%m-%d")(d.APPL_x);
        d.Close = +d.APPL_y;
    });

    const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([0, width]);

    const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Close)])
    .nice()
    .range([height, 0]);

    svg.append("g")
    .attr("transform", 'translate(0,${height})')
    .call(d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat("%b %Y")));

    svg.append("g")
    .call(d3.axisLeft(y));

    svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
            .x(d => x(d.Date))
            .y(d => y(d.Close))
        );

    svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
}).catch(error => {
    console.error("Error Loading the Data: ", error);
});

function loadAndDisplayPurchaseOrders() {
    d3.csv("data/purchase_orders.csv").them(data => {
        const ul = d3.select("#purchase-orders");

        data.forEach(order => {
            ul.append("li")
            .text('${order.CustomerName} - Order ID: ${order.OrderID}: Purchase Amount ${order.PurchaseAmount}');
        });
    })
    }

    loadAndDisplayPurchaseOrders();