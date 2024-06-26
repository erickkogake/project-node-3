import { app } from "../app";
import { authenticate } from "./controllers/authenticate";
import { register } from "./controllers/register";

 export async function appRoutes() {
    app.post('/users', register)
    app.post('/sessions', authenticate)
 }