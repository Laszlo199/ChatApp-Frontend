import { io } from "socket.io-client";
import type { FriendRequestDto } from "@/dtos/FriendRequestDto";

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

  getFriendRequest(friendDto: FriendRequestDto){
    this.socket.emit("getFriendRequest", friendDto);
  }
}