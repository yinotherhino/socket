import { JSONDatabase } from "./JSONdb";
import path from "path";

const userdbPath = path.join("user.json");

export const UserRepository = new JSONDatabase(userdbPath)

export const addUser = ()=>{UserRepository.createUser(
    // {"email": "muha@gmail.com", "id":1, "name":"yino"},
    // {"email": "muha@gmail.com", "id":2, "name":"yino"},
    {"email": "muha@gmail.com", "id":3, "name":"yino"}
    
    )
.then((user)=>{
    console.log(user)
})}
