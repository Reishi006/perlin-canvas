export const setPlotData = () => {
    let xPlot = [];
    let yPlot = [];

    let prev = Math.floor((Math.random()*20)-10);

    let plusMinus = [-1, 1];

    for (let i = 1; i < 150; i++) {
        xPlot.push(i);

        yPlot.push(prev);

        let indexPM = Math.floor(Math.random()*2);
        let random = Math.random();

        prev += (plusMinus[indexPM] * random);
    }

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

    for (let i = 0; i <= width; i += size) {
        gradientArr[Math.floor(i/8)] = new Array(height/size);
        for (let j = 0; j <= height; j += size) {
            gradientVectorX = (a * gradientVectorX + j) % (mod + a);
            gradientVectorY = (b * gradientVectorY + j) % (mod + b);

            let normGradX = 2 * (gradientVectorX/mod) - 1;
            let normGradY = 2 * (gradientVectorY/mod) - 1;

            normGradX = Number(normGradX.toFixed(2));
            normGradY = Number(normGradY.toFixed(2));
            
            //gradientArr.push([gradientVectorX, gradientVectorY]);
            //gradientArr.push([normGradX, normGradY]);
            gradientArr[Math.floor(i/8)][Math.floor(j/8)] = [normGradX, normGradY];
        }
    }

    console.log(gradientArr);

    return gradientArr;
}

export const getDistanceVectors = (x, y, size) => {
    let distanceArr = [];

    let point = [(x%8)/size, (y%8)/size];

    //0 - topLeft, 1 - topRight ... (clockwise)
    distanceArr[0] = [0 - point[0], 0 - point[1]];
    distanceArr[1] = [1 - point[0], 0 - point[1]];
    distanceArr[2] = [1 - point[0], 1 - point[1]];
    distanceArr[3] = [0 - point[0], 1 - point[1]];

    return distanceArr;
}

export const getDotProduct = (x, y, gradientArr, distanceArr, size) => {
    let dotProducts = [];

    dotProducts[0] = (gradientArr[Math.floor(x/size)][Math.floor(y/size)][0] * distanceArr[0][0]) - (gradientArr[Math.floor(x/size)][Math.floor(y/size)][1] * distanceArr[0][1]);
    dotProducts[1] = (gradientArr[Math.floor(x/size)+1][Math.floor(y/size)][0] * distanceArr[1][0]) - (gradientArr[Math.floor(x/size)+1][Math.floor(y/size)][1] * distanceArr[1][1]);
    dotProducts[2] = (gradientArr[Math.floor(x/size)+1][Math.floor(y/size)+1][0] * distanceArr[2][0]) - (gradientArr[Math.floor(x/size)+1][Math.floor(y/size)+1][1] * distanceArr[2][1]);
    dotProducts[3] = (gradientArr[Math.floor(x/size)][Math.floor(y/size)+1][0] * distanceArr[3][0]) - (gradientArr[Math.floor(x/size)][Math.floor(y/size)+1][1] * distanceArr[3][1]);

    return dotProducts;
}

const doInterpolation = (a0, a1, w) => {
    return (a1 - a0) * ((w * (w * 6 - 15) + 10) * w * w * w) + a0;
}

export const interpolateDotProducts = (x, y, dotProducts, size) => {

    let point = [(x%size)/size, (y%size)/size];

    let interpolate_1 = doInterpolation(dotProducts[0], dotProducts[1], point[0]);
    let interpolate_2 = doInterpolation(dotProducts[3], dotProducts[2], point[0]);

    let result = doInterpolation(interpolate_1, interpolate_2, point[1]);

    /* let AB = dotProducts[0] + point[0] * (dotProducts[1] - dotProducts[0]);
    let CD = dotProducts[3] + point[0] * (dotProducts[2] - dotProducts[3]);

    let value = AB + point[1] * (CD - AB);

    let result = (6*value**5) - (15*value**4) + (10*value**3);

    result = (result + 2.5) / 5; */

    result = result + 0.5;
    
    return result;
}



export const perlinNoise = (seed, width, height, size) => {
    const gradientArr = generateGradientVectors(seed, width, height, size);

    let valuesArr = [];


    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let distanceArr = getDistanceVectors(j, i, size);

            let dotProducts = getDotProduct(j, i, gradientArr, distanceArr, size);

            let value = interpolateDotProducts(j, i, dotProducts, size);
            valuesArr.push(value);

            if (i === 1 && j === 1) {
                console.log(gradientArr[0][0].length);
                console.log(dotProducts);
                console.log(value);
            }
        }
    }

    return valuesArr;
}
