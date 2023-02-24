import { DatabaseBuilder } from './main.js';

export interface Client {
    database: Record<string, DatabaseBuilder>;
    user: {
        username: string;
    };
}

export interface Options {
    builder: string;
}
