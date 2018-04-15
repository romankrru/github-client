const load = (itemName) => {
    try {
        const serailizedItem = localStorage.getItem(itemName);

        if (serailizedItem === null) {
        return undefined;
        }

        return JSON.parse(serailizedItem);
    } catch (err) {
        return undefined;
    }
};

const save = (itemName, item) => {
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

const remove = itemName => localStorage.removeItem(itemName);

export default {
    save,
    load,
    remove,
};