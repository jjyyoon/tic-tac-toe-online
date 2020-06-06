#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE tic_tac_toe_db;
    GRANT ALL PRIVILEGES ON DATABASE tic_tac_toe_db TO postgres;
EOSQL
