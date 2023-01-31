import { Sequelize } from 'sequelize';

interface DatabaseOptions {
	name: string;
	storage: string;
	structure: any;
}

export default class Database {
	sequelize;

	constructor(options: DatabaseOptions) {
		this.sequelize = new Sequelize({
			dialect: 'sqlite',
			logging: false,
			storage: options.storage + '/' + options.name + '.sqlite',
		});

		return this.sequelize.define(options.name, options.structure) as any;
	}
}
