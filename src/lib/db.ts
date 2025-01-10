import Dexie, { type EntityTable } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';

interface Friend {
	id: number;
	name: string;
	age: number;
}

const db = new Dexie('FriendsDatabase', { addons: [dexieCloud] }) as Dexie & {
	friends: EntityTable<
		Friend,
		'id' // primary key "id" (for the typings only)
	>;
};

// Schema declaration:
db.version(1).stores({
	friends: '++id, name, age' // primary key "id" (for the runtime!)
});

export type { Friend };
export { db };
