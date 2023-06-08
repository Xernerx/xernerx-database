import DatabaseBuilder from './build/DatabaseBuilder.js';

export interface Client {
    database: Record<string, DatabaseBuilder>;
    user: {
        username: string;
    };
}

export interface Options {
    directory: string;
}
