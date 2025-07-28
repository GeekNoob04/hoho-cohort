import { Hono } from "hono";

const app = new Hono();
// auth middleware
/* app.use(async (c: any, next: any) => {
    if (c.req.header("Authorization")) {
        await next();
    } else {
        return c.json({
            msg: "You dont have access",
        });
    }
});
*/
// or
async function authMiddleware(c: any, next: any) {
    if (c.req.header("Authorization")) {
        await next();
    } else {
        return c.json({
            msg: "You don't have access",
        });
    }
}
app.get("/", authMiddleware, async (c) => {
    const body = await c.req.json();
    console.log(body);
    console.log(c.req.header("Authorization"));
    console.log(c.req.query("param"));
    return c.json({
        message: "Hello Hono!",
    });
});

export default app;
