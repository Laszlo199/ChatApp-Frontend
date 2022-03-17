import { io } from "socket.io-client";
import type { FriendRequestDto } from "@/dtos/FriendRequestDto";
import type { GetUsersDto } from "@/dtos/GetUsersDto";

export class FriendRequestService {
  socket = io("localhost:3001");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  }

  createFriendRequest(friendDto: FriendRequestDto) {
    this.socket.emit("createFriendRequest", friendDto);
  }
  
  // maybe not like that.
  listenFriendRequest(status: string, statusListener: (user: GetUsersDto) => void){
    this.socket.on(status, (user: GetUsersDto) =>{
      statusListener(user);
    })

  }

  getFriendRequest(receiverId: number){
    this.socket.emit("getFriendRequest", receiverId);
  }

   deleteFriendRequest(id: number) {
    this.socket.emit("removeFriendRequest" + id);
  }
}