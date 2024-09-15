import { Drivers, Storage } from '@ionic/storage';

export const storage = new Storage({
    name: 'apiplatzi',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});
await storage.create();

export const getJsonObject = async (key: string) => {
    let data = await storage.get(key);
    return JSON.parse(data);
}
