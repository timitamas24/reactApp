import Router from 'koa-router';
import userStore from './store';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../utils';

export const router = new Router();

const createToken = (user) => {
    return jwt.sign({ username: user.username, _id: user._id }, jwtConfig.secret, { expiresIn: 60 * 60 * 60 });
};

const createUser = async (user, response) => {
    try {
        console.log(user);
        await userStore.insert(user);
        response.body = { token: createToken(user) };
        response.status = 201;
    } catch (e) {
        response.body = { issue: [{ error: e.message }] };
        response.status = 400;
    }
};

router.post('/register', async (ctx) => await createUser(ctx.request.body, ctx.response));

router.post('/login', async (ctx) => {
    console.log('1');
    const credentials = ctx.request.body;
    console.log('2');
    const response = ctx.response;
    console.log('myUser: ', credentials, '  the user: ');
    const user = await userStore.findOne({ username: credentials.username });
    console.log('myUser: ', credentials, '  the user: ', user);
    if (user && credentials.password === user.password) {
        response.body = { token: createToken(user) };
        response.status = 201;
    } else {
        response.body = { issue: [{ error: 'Invalid credentials' }] };
        response.status = 400;
    }
});