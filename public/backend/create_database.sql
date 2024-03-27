CREATE TABLE game(
    game_code CHAR(5) PRIMARY KEY,
    datetime_created DATETIME NOT NULL,
    started CHAR(1) DEFAULT 'n' NOT NULL,
    num_players SMALLINT DEFAULT 0 NOT NULL,
    CHECK (started in ('n', 'y'))
);

CREATE TABLE player(
    game_code CHAR(5),
    player_name VARCHAR(25),
    role VARCHAR(10),
    PRIMARY KEY (game_code, player_name)
);