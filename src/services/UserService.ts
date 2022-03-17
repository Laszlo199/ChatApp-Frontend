import axios from "axios";
import type { UserCredentialsDto } from "@/dtos/userCredentialsDto";
import type { GetUsersDto } from "@/dtos/GetUsersDto";

export class UserService {
    
    http = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
            "content-type": "application/json"
        },
    });

    getAllUsers(id: number) {
        return this.http.get("/users/userId/"+id);
    }


    async signIn(credentials: UserCredentialsDto){
     return  await this.http.post("/users", credentials);
    }

    async signUp(credentials: UserCredentialsDto){
        return  await this.http.post("/users/signup", credentials);
       }

}
export default new UserService();
