import axios from "axios";

export class RoomService {
    http = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
            "content-type": "application/json",
        },
    });

    getAllRooms(id: number) {
        return this.http.get("/rooms/userId/"+id);
    }

    async createRoom(name: string, userId: number): Promise<any> {
        const result = await this.http.post<any>("/rooms", {name: name, authorId: userId});
        return result.data;
    }

}