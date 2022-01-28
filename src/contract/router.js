import Router from 'koa-router';
import ContractStore from './store';
import { broadcast } from '../utils';

export const router = new Router();

router.get('/', async (ctx) => {
    const response = ctx.response;
    const userId = ctx.state.user._id;
    response.body = await ContractStore.find({ userId });
    response.status = 200;
})

router.get('/:page', async (ctx) => {
    const response = ctx.response;
    const userId = ctx.state.user._id;
    const tasks = await ContractStore.find({ userId });
    response.body = tasks.splice(ctx.params.page*5, ctx.params.page*5+5);
    response.status = 200;
})

router.get('/:id', async (ctx) => {
    const userId = ctx.state.user._id;
    const task = await ContractStore.findOne({ _id: ctx.params.id });
    const response = ctx.response;
    if (task) {
        if (task.userId === userId) {
            response.body = task;
            response.status = 200;
        } else {
            response.status = 403;
        }
    } else {
        response.status = 404;
    }
});

const createContract = async (ctx, contract, response) => {
    try {
        const userId = ctx.state.user._id;
        contract.userId = userId;
        console.log('ma');
        response.body = await ContractStore.insert(contract);
        console.log('am');
        response.status = 201;
        console.log('created and works');
        broadcast(userId, { type: 'created', payload: contract });
    } catch (e) {
        response.body = { message: e.message };
        response.status = 400;
    }
};

router.post('/', async ctx => await createContract(ctx, ctx.request.body, ctx.response));

router.put('/:id', async (ctx) => {
    const contract = ctx.request.body;
    const id = ctx.params.id;
    const contractId = contract._id;
    const response = ctx.response;
    if (contractId && contractId !== id) {
        response.body = { message: 'Parameter id and body _id should be the same' };
        response.status = 400;
        return;
    }
    if (!contractId) {
        console.log("test");
        await createTask(ctx, contract, response);
    } else {
        const userId = ctx.state.user._id;
        contract.userId = userId;
        const updatedCount = await ContractStore.update({ _id: id }, contract);
        if (updatedCount === 1) {
            response.body = contract;
            response.status = 200;
            broadcast(userId, { type: 'updated', payload: contract });
        } else {
            response.body = { message: 'Resource no longer exists' };
            response.status = 405;
        }
    }
});

router.del('/:id', async (ctx) => {
    const userId = ctx.state.user._id;
    const contract = await ContractStore.findOne({ _id: ctx.params.id });
    if (contract && userId !== contract.userId) {
        ctx.response.status = 403;
    } else {
        await ContractStore.remove({ _id: ctx.params.id });
        ctx.response.status = 204;
    }
});