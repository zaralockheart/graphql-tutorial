import "reflect-metadata";
import {createConnection} from "typeorm";
import { author } from "./entities/author";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new author();
    user.id = 1;
    
    console.log("Loading users from the database...");
    const users = await connection.manager.findOne(() => user)
    console.log("Loaded users: ", users);
     
    console.log("Here you can setup and run express/koa/any other framework.");
    
}).catch(error => console.log(error));
