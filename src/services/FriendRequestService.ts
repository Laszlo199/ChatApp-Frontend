import axios from "axios";

export class FriendRequestService {
  http = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "content-type": "application/json",
    },
  });

  create(){
    return this.http.get("/createFriendRequest");
  }
}