import S, { Sequelize } from 'sequelize';

export default class DatabaseBuilder {
	public id;
	public name;
	private sequelize;
	private type;

	constructor(id: string, options: Options) {
		this.id = id;

		this.name = options.name;

		this.type = {
			string: S.STRING,
			number: S.NUMBER,
			bigint: S.BIGINT,
		};

		this.sequelize = new Sequelize(options.database, options.username, options.password, {
			host: options.host,
			dialect: 'sqlite',
			logging: options.logging || false,
			storage: options.storage + '/' + options.name + '.sqlite',
		});

		return this.sequelize.define(options.name, options.structure as any) as any;
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
