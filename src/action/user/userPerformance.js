const { models } = require('../../models');

const userPerformance = async (userId, days) => {
    let portfolios = await models.Portfolio.find()
    let uPortfolios = portfolios.filter(p => p.userId.toString() == userId.toString())
    // grab all the history array from each portfolio of this user
    let histories = uPortfolios.map(p => p.history)
    // reverse each of the arrays
    histories.forEach(arr => arr.reverse())
    // identify the longest by length,
    let maxVal = Number.MIN_VALUE
    for (let k = 0; k < histories.length; k++) {
        if (histories[k].length > maxVal) {
            maxVal = histories[k].length
            longestH = histories[k]
        }
    }
    // move it to the front of the histories array
    histories = [longestH, ...histories.filter(history => history != longestH)]
    performanceValues = h1.map(history => history.value) // map its values
    dates = h1.map(history => history.date) // map its dates

    // loop through all the subsequent histories and add their values to the already created values array
    for (let i = 0; i < performanceValues.length; i++) {
        for (let j=1; j < histories.length; j++) {
            if (histories[j].length > i) 
                {performanceValues[i] += histories[j][i].value}
        }
    }
    let interval = Math.min(performanceValues.length, days)
    let rv = performanceValues.slice(0, interval)
    return rv
}



const test = (days) => {
    // assume that each object represents day. Write code so that it's flexible for num of arrs
    // combine these arrays into one
    // first pass: take longest arr. grab all its dates, save them into arr.
    // first object is first collection. last is last

    h1 = [{"_id":"5f641a192b104ff87f88e043","date":"2016-05-18T16:00:00.000Z","value":1500},
    {"_id":"5f641a192b104ff87f88e044","date":"2016-05-19T16:00:00.000Z","value":3179.99},
    {"_id":"5f641a222b104ff87f88e049","date":"2020-09-18T02:23:30.139Z","value":2994.405},
    {"_id":"5f641a5e2b104ff87f88e055","date":"2020-09-18T02:24:30.114Z","value":2994.4049999999997},
    {"_id":"5f641a9a2b104ff87f88e062","date":"2020-09-18T02:25:30.121Z","value":2994.4049999999997}]

    h2 = [{"_id":"5f641a192b104ff87f88e044","date":"2016-05-19T16:00:00.000Z","value":379.99},
    {"_id":"5f641a222b104ff87f88e049","date":"2020-09-18T02:23:30.139Z","value":200.405},
    {"_id":"5f641a5e2b104ff87f88e055","date":"2020-09-18T02:24:30.114Z","value":908.4049999999997},
    {"_id":"5f641a9a2b104ff87f88e062","date":"2020-09-18T02:25:30.121Z","value":232.4049999999997}]

    h3 = [{"_id":"5f641a192b104ff87f88e044","date":"2016-05-19T16:00:00.000Z","value":379.99},
    {"_id":"5f641a222b104ff87f88e049","date":"2020-09-18T02:23:30.139Z","value":200.405}]

    // grab all the history arrays and put into one big array
    histories = [h1, h2, h3]
    // reverse each of the arrays
    histories.forEach(arr => arr.reverse())
    // identify the longest by length,
    let maxVal = Number.MIN_VALUE
    for (let k = 0; k < histories.length; k++) {
        if (histories[k].length > maxVal) {
            maxVal = histories[k].length
            longestH = histories[k]
        }
    }
    // move it to the front of the histories array
    histories = [longestH, ...histories.filter(history => history != longestH)]
    
    performanceValues = h1.map(history => history.value) // map its values
    dates = h1.map(history => history.date) // map its dates

    // loop through all the subsequent histories and add their values to the already created values array
    for (let i = 0; i < performanceValues.length; i++) {
        for (let j=1; j < histories.length; j++) {
            if (histories[j].length > i) 
                {performanceValues[i] += histories[j][i].value}
        }
    }
    // output will be array of performance value. 
    let interval = Math.min(performanceValues.length, days)
    let rv = performanceValues.slice(0, interval)
    console.log(rv)
    // console.log(performanceValues.length)
    // console.log(dates)
}


module.exports = userPerformance