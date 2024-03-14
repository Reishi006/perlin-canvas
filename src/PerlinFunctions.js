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

export const generateGradientVectors = (seed, width, height, size) => {
    let gradientArr = [];

    let a = Math.ceil(seed/835);
    let b = Math.ceil(seed/2906);
    let mod = 10 ** (seed.toString().length);

    console.log(`${a}, ${b}, ${mod}`);

    let gradientVectorX = (a * seed) % (mod + a);
    let gradientVectorY = (b * seed) % (mod + b);

    console.log(gradientVectorX);
    console.log(gradientVectorY);

    for (let i = 0; i <= width; i += size) {
        for (let j = 0; j <= height; j += size) {
            gradientVectorX = (a * gradientVectorX + j) % (mod + a);
            gradientVectorY = (b * gradientVectorY + j) % (mod + b);

            let normGradX = 2 * (gradientVectorX/mod) - 1;
            let normGradY = 2 * (gradientVectorY/mod) - 1;

            normGradX = Number(normGradX.toFixed(2));
            normGradY = Number(normGradY.toFixed(2));
            
            //gradientArr.push([gradientVectorX, gradientVectorY]);
            gradientArr.push([normGradX, normGradY]);
        }
        console.log(i);
    }

    console.log(gradientArr);

    return gradientArr;
}

export const generateDistanceVectors = (size) => {
    let distanceArr = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let x = j/size;
            let y = i/size;

            distanceArr.push([x, y]);
        }
    }
    console.log(distanceArr);

}

export const getDotProduct = (gradientArr, distanceArr, size) => {

}



export const perlinNoise = (seed, width, height, size) => {
    const gradientArr = generateGradientVectors(seed, width, height, size);
    const distanceArr = generateDistanceVectors(size);


}
