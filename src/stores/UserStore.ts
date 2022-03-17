
import type { GetUsersDto } from "@/dtos/GetUsersDto";
import { UserService } from "@/services/UserService";
import { defineStore } from "pinia";
import type { User } from "@/model/User";

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: { username: "" } as User,
  }),
  getters: {
    userName: (state) => {
      if (state.loggedInUser.username != undefined) return state.loggedInUser.username;
      else return "";
    },
  },
  actions: {
    signInUser(signedInUser: User){
        this.loggedInUser =signedInUser;
    }

  },
});