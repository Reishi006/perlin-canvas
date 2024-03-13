export const setPlotData = () => {
    let xPlot = [];
    let yPlot = [];

    let prev = Math.floor((Math.random()*20)-10);

    let plusMinus = [-1, 1];

    for (let i = 1; i < 1000; i++) {
        xPlot.push(i);

        yPlot.push(prev);

        let indexPM = Math.floor(Math.random()*2);
        let random = Math.random();

        console.log(random);

        prev += (plusMinus[indexPM] * random);
    }

    console.log(yPlot);

    return {xPlot, yPlot};
}

export const generateGradientVectors = (seed, width, height) => {
    let gradientArr = [];

    let a = Math.ceil(seed/835);
    let b = Math.ceil(seed/2906);
    let mod = 10 ** (seed.toString().length);

    console.log(`${a}, ${b}, ${mod}`);

    let gradientVectorX = (a * seed) % (mod);
    let gradientVectorY = (b * seed) % (mod);

    console.log(gradientVectorX);
    console.log(gradientVectorY);

    for (let i = 0; i <= width; i += 8) {
        for (let j = 0; j <= height; j += 8) {
            gradientVectorX = (a * gradientVectorX + j) % (mod);
            gradientVectorY = (b * gradientVectorY + j) % (mod);
            
            gradientArr.push([gradientVectorX, gradientVectorY]);
        }
        console.log(i)
    }

    console.log(gradientArr);
}
