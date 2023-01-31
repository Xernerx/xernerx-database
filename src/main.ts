import XernerxExtensionBuilder from 'xernerx-extension-builder';
import Database from './models/Database.js';
import Sequelize from 'sequelize';

interface Client {
	database: { [index: string]: unknown };
}

interface Options {
	options: {
		directory: string;
	};
	databases: Array<any>;
}

export default class XernerxDatabase extends XernerxExtensionBuilder {
	client: Client;
	options: any;
	databases: Array<any>;

	constructor(client: Client, options: Options) {
		super('XernerxDatabase');

		this.client = client;

		this.options = options.options;

		this.databases = options.databases;

		this.#define();

		console.log(this.client.database.users);
	}

	#define() {
		this.client.database = {};

		Object.entries(this.databases).map(([name, database]) => {
			const structure = this.#typeCheck(database);

			this.client.database[name] = new Database({
				name,
				storage: this.options.directory,
				structure,
			});

			this.#sync(name);
		});
	}

	#sync(name: string) {
		(this.client.database[name] as Record<string, Function>).sync();
	}

	#typeCheck(structure: any): any {
		let struct: any = {};

		Object.entries(structure).map(([key, value]) => {
			if (Array.isArray(value)) return (struct[key] = Sequelize.STRING);
			else if (typeof value === 'object') return (struct[key] = Sequelize.STRING);
			else return (struct[key] = Sequelize[(value as string).toUpperCase() as Types]);
		});

		return struct;
	}
}

type Types = 'STRING' | 'NUMBER';
