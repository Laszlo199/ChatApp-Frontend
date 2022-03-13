import axios from "axios";

export class UserService {
    http = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
            "content-type": "application/json",
        },
    });

    getAllUsers(id: number) {
        return this.http.get("/users/userId");
    }
}