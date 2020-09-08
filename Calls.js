import React from 'react';
import finnhub from 'finnhub'


function Calls(props) {
    const stock = props.stock
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "btbtq6748v6p15lfk9o0"
    const finnhubClient = new finnhub.DefaultApi()

    // Stock candles
    finnhubClient.stockCandles(stock, "D", 1590988249, 1591852249, {}, (error, data, response) => {
        console.log(data)
    });

    //Company News
    finnhubClient.companyNews(stock, "2020-01-01", "2020-09-01", (error, data, response) => {
        if (error) {
            console.error(error);
        } else {
            console.log(data)
        }
    });

    // Investor Ownership
    let optsLimit = { 'limit': 10 };
    finnhubClient.investorsOwnership(stock, optsLimit, (error, data, response) => {
        console.log(data)
    });

    //Aggregate Indicator
    finnhubClient.aggregateIndicator(stock, "D", (error, data, response) => {
        console.log(data)
    });

    // Basic financials
    finnhubClient.companyBasicFinancials(stock, "margin", (error, data, response) => {
        console.log(data)
    });

    // Company earnings
    finnhubClient.companyEarnings(stock, { 'limit': 10 }, (error, data, response) => {
        console.log(data)
    });

    // Company EPS estimates
    finnhubClient.companyEpsEstimates(stock, {}, (error, data, response) => {
        console.log(data)
    });

    // Company executive
    finnhubClient.companyExecutive(stock, (error, data, response) => {
        console.log(data)
    });

    // Company peers
    finnhubClient.companyPeers(stock, (error, data, response) => {
        console.log(data)
    });

    // Company profile
    finnhubClient.companyProfile({ 'symbol': stock }, (error, data, response) => {
        console.log(data)
    });
    finnhubClient.companyProfile({ 'isin': 'US0378331005' }, (error, data, response) => {
        console.log(data)
    });
    finnhubClient.companyProfile({ 'cusip': '037833100' }, (error, data, response) => {
        console.log(data)
    });

    //Company profile2
    finnhubClient.companyProfile2({ 'symbol': stock }, (error, data, response) => {
        console.log(data)
    });

    // Revenue Estimates
    finnhubClient.companyRevenueEstimates(stock, {}, (error, data, response) => {
        console.log(data)
    });

    // List country
    finnhubClient.country((error, data, response) => {
        console.log(data)
    });

    // Covid-19
    finnhubClient.covid19((error, data, response) => {
        console.log(data)
    });

    // Crypto candles
    finnhubClient.cryptoCandles("BINANCE:BTCUSDT", "D", 1590988249, 1591852249, (error, data, response) => {
        console.log(data)
    });

    // Crypto exchanges
    finnhubClient.cryptoExchanges((error, data, response) => {
        console.log(data)
    });

    //Crypto symbols
    finnhubClient.cryptoSymbols("BINANCE", (error, data, response) => {
        console.log(data)
    });

    // Earnings calendar
    finnhubClient.earningsCalendar({ "from": "2020-06-01", "to": "2020-06-30" }, (error, data, response) => {
        console.log(data)
    });

    // Economic code
    finnhubClient.economicCode((error, data, response) => {
        console.log(data)
    });

    // Economic data
    finnhubClient.economicData("MA-USA-656880", (error, data, response) => {
        console.log(data)
    });

    // Filings
    finnhubClient.filings({ "symbol": stock }, (error, data, response) => {
        console.log(data)
    });

    //Financials
    finnhubClient.financials(stock, "ic", "annual", (error, data, response) => {
        console.log(data)
    });

    // Financials Reported
    finnhubClient.financialsReported({ "symbol": stock }, (error, data, response) => {
        console.log(data)
    });

    // Forex candles
    finnhubClient.forexCandles("OANDA:EUR_USD", "D", 1590988249, 1591852249, (error, data, response) => {
        console.log(data)
    });

    // Forex exchanges
    finnhubClient.forexExchanges((error, data, response) => {
        console.log(data)
    });

    // Forex rates
    finnhubClient.forexRates({ "base": "USD" }, (error, data, response) => {
        console.log(data)
    });

    // Forex symbols
    finnhubClient.forexSymbols("OANDA", (error, data, response) => {
        console.log(data)
    });

    //Fund ownership
    finnhubClient.fundOwnership(stock, { 'limit': 10 }, (error, data, response) => {
        console.log(data)
    });

    // General news
    finnhubClient.generalNews("general", {}, (error, data, response) => {
        console.log(data)
    });

    // Ipo calendar
    finnhubClient.ipoCalendar("2020-01-01", "2020-06-15", (error, data, response) => {
        console.log(data)
    });

    //Major development
    finnhubClient.majorDevelopments(stock, {}, (error, data, response) => {
        console.log(data)
    });

    // News sentiment
    finnhubClient.newsSentiment(stock, (error, data, response) => {
        console.log(data)
    });

    // Pattern recognition
    finnhubClient.patternRecognition(stock, "D", (error, data, response) => {
        console.log(data)
    });

    // Price target
    finnhubClient.priceTarget(stock, (error, data, response) => {
        console.log(data)
    });

    //Quote
    finnhubClient.quote(stock, (error, data, response) => {
        console.log(data)
    });

    // Recommendation trends
    finnhubClient.recommendationTrends(stock, (error, data, response) => {
        console.log(data)
    });

    // Stock dividends
    finnhubClient.stockDividends("KO", "2019-01-01", "2020-06-30", (error, data, response) => {
        console.log(data)
    });

    // Splits
    finnhubClient.stockSplits(stock, "2000-01-01", "2020-06-15", (error, data, response) => {
        console.log(data)
    });

    // Stock symbols
    finnhubClient.stockSymbols("US", (error, data, response) => {
        console.log(data)
    });

    // Support resistance
    finnhubClient.supportResistance(stock, "D", (error, data, response) => {
        console.log(data)
    });

    // Technical indicator
    finnhubClient.technicalIndicator(stock, "D", 1580988249, 1591852249, "macd", {}, (error, data, response) => {
        console.log(data)
    });

    // Transcripts
    finnhubClient.transcripts("AAPL_162777", (error, data, response) => {
        console.log(data)
    });

    // Transcripts list
    finnhubClient.transcriptsList(stock, (error, data, response) => {
        console.log(data)
    });

    // Upgrade/downgrade
    finnhubClient.upgradeDowngrade({ "symbol": stock }, (error, data, response) => {
        console.log(data)
    });

    // Tick Data
    api.stockTick(stock, "2020-03-25", 500, 0, (error, data, response) => {
        console.error(data);
    });

    // Indices Constituents
    api.indicesConstituents("^GSPC", (error, data, response) => {
        console.error(data);
    });

    // Indices Historical Constituents
    api.indicesHistoricalConstituents("^GSPC", (error, data, response) => {
        console.error(data);
    });

    // ETFs Profile
    api.etfsProfile('SPY', (error, data, response) => {
        console.error(data);
    });

    // ETFs Holdings
    api.etfsHoldings('SPY', (error, data, response) => {
        console.error(data);
    });

    // ETFs Industry Exposure
    api.etfsIndustryExposure('SPY', (error, data, response) => {
        console.error(data);
    });

    // ETFs Country Exposure
    api.etfsCountryExposure('SPY', (error, data, response) => {
        console.error(data);
    });


};


export default Calls;