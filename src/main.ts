import Sequelize from 'sequelize';
import XernerxExtensionBuilder from 'xernerx-extension-builder';

import { Client, Options } from './interfaces.js';
import DatabaseBuilder from './build/DatabaseBuilder.js';
import * as fs from 'fs';
import * as path from 'path';
export default class XernerxDatabase extends XernerxExtensionBuilder {
	private client;
	public options;

	constructor(client: Client, options: Options) {
		super('XernerxDatabase');

		this.client = client;

		this.client.database = {};

		this.options = options;

		this.load();
	}

	private async load() {
		const directory = path.resolve(this.options.builder);
		const files = fs.readdirSync(directory);

		for (const file of files) {
			try {
				let database = await import('file://' + directory + '/' + file);

				database = new (database.default || database)(this.client);

				const data = await database.sync();

				this.client.database[database.name] = data;
			} catch (error) {
				console.error(error);
			}
		}
	}
}

export { DatabaseBuilder, Sequelize };
