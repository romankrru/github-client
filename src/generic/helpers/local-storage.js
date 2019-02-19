// @flow
const load = (itemName: string): any => {
    try {
        const serializedItem = localStorage.getItem(itemName);

        if (serializedItem) {
            return JSON.parse(serializedItem);
        }

        return undefined;
    } catch (err) {
        return undefined;
    }
};

const save = (itemName: string, item: any): void => {
    try {
        const serializedItem = JSON.stringify(item);

        localStorage.setItem(itemName, serializedItem);
    } catch (err) {
        /* eslint-disable no-console */
        console.error("Can't save item to localStorage:");
        console.error(err);
        /* eslint-enable no-console */
    }
};

const remove = (itemName: string): void => localStorage.removeItem(itemName);

export default {
    save,
    load,
    remove,
};
