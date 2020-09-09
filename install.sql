CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    email VARCHAR UNIQUE,
    password VARCHAR,
    leader BOOLEAN,
    followers INT
);

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    stock VARCHAR,
    avg_price INT,
    volume INT,
    current_value INT,
    allocation FLOAT,
    user_id INTEGER REFERENCES users (id),
    portfolio_id INTEGER REFERENCES portfolios (id),
);

CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    funds FLOAT,
    percent_allocated FLOAT,
    active BOOLEAN,
    asset_num INT,
    user_id INTEGER REFERENCES users (id),
);

