import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';

// Commented out so it doesn't get auto-removed by text editors. You may uncomment if needed.
// import fetch from 'isomorphic-fetch';

// Used for reading incoming POST bodies. Commented out for same reason as above.
// See https://github.com/dlau/koa-body#usage-with-koa-router
// import koaBody from 'koa-body';

const app = new Koa();
const router = new Router();
const port = 3011;

app.use(cors({origin: '*'}));

router.get('/', (ctx) => {
	ctx.body = 'test1';
});

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
