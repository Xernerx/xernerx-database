import { Sequelize } from 'sequelize';

export default class DatabaseBuilder {
    id;
    name;
    sequelize: any;

    constructor(id: string, options: Options) {
        this.id = id;

        this.name = options.name;

        this.sequelize = new Sequelize(options.database, options.username, options.password, {
            host: options.host,
            dialect: 'sqlite',
            logging: options.logging || false,
            storage: options.storage + '/' + options.name + '.sqlite',
        });

        this.sequelize = this.sequelize.define(options.name, options.structure);

        return this.sequelize;
    }
}

interface Options {
    name: string;
    database: string;
    username: string;
    password: string;
    host: string;
    logging: boolean;
    storage: string;
    structure: unknown;
}
