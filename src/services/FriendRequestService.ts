import { io } from "socket.io-client";
import type { FriendRequestDto } from "@/dtos/FriendRequestDto";
import type { GetUsersDto } from "@/dtos/GetUsersDto";
import type { UpdateFriendRequestDto } from "@/dtos/UpdateFriendRequestDto";
import axios from "axios";

export class FriendRequestService {
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  }

  http = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "content-type": "application/json",
    },
  });

  createFriendRequest(friendDto: FriendRequestDto) {
    this.socket.emit("createFriendRequest", friendDto);
  }
  
  listenFriendRequest(requestListener: (request: FriendRequestDto)=> void){
    const userId = 1;
    this.socket.on('request-'+userId, (request: FriendRequestDto) =>{
      requestListener(request);
    })

  }

   async deleteFriendRequest(id: number) {
    return this.http.delete("/deleteRequest"+id)
  }

  updateFriendRequest(id: number, updateFriendDto: UpdateFriendRequestDto){
    return this.http.patch("/updateRequest"+id,updateFriendDto)
  }
}