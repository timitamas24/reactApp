import dataStore from "nedb-promise";

export class ContractStore {
    constructor({ filename, autoload }) {
        this.store = dataStore({ filename, autoload });
    }

    async find(props) {
        return this.store.find(props);
    }

    async findOne(props) {
        return this.store.findOne(props);
    }

    async insert(contract) {
        if (!contract.team) {
            throw new Error('Missing contract team');
        }
        if (!contract.salary) {
            throw new Error('Missing contract salary');
        }
        if (!contract.dateFrom) {
            throw new Error('Missing contract start date');
        }
        if (!contract.dateTo) {
            throw new Error('Missing contract stop date');
        }
        console.log('store.insert passed');
        return this.store.insert(contract);
    };

    async update(props, task) {
        console.log(props, task);
        return this.store.update(props, task);
    }

    async remove(props) {
        return this.store.remove(props);
    }
}

export default new ContractStore({ filename: './db/contracts.json', autoload: true });