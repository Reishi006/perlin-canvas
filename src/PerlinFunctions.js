export function setPlotData() {
    let xPlot = [];
    let yPlot = [];

    let prev = Math.floor((Math.random()*20)-10);

    let plusMinus = [-1, 1];

    for (let i = 1; i < 1000; i++) {
        xPlot.push(i);

        yPlot.push(prev);

        let indexPM = Math.floor(Math.random()*2);
        let random = Math.random();

        prev += (plusMinus[indexPM] * random);
    }

    console.log(yPlot);

    return {xPlot, yPlot};
}
