import { FriendRequestService } from "@/services/FriendRequestService";
import { defineStore } from "pinia";
import type { FriendRequestDto } from "@/dtos/FriendRequestDto";

const friendRequestService: FriendRequestService = new FriendRequestService();

export const FriendRequestStore = defineStore({
  id: "friendRequestStore",
  state: () => ({
    friendRequests: {} as FriendRequestDto[],
  }),
  getters: {
    friendRequestsFromUser: (state) => {
      if (state.friendRequests != undefined) return state.friendRequests;
      else return null;
    },
  },
  actions: {
    getFriendRequests(receiverId: number) {
      friendRequestService
        .getFriendRequest(receiverId);
    },
  },
});