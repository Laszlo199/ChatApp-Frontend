
import type { GetUsersDto } from "@/dtos/user/GetUsersDto";
import { UserService } from "@/services/UserService";
import { defineStore } from "pinia";
import type { User } from "@/model/User";

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: { username: "", id: 0 } as User,
  }),
  getters: {
    userName: (state) => {
      if (state.loggedInUser.username != undefined) return state.loggedInUser.username;
      else return "";
    },
    id: (state) => {
      if (state.loggedInUser.id != undefined) return state.loggedInUser.id;
      else return 0;
    }
  },
  actions: {
    signInUser(signedInUser: User){
        this.loggedInUser = signedInUser;
    },
    signOut(){
      this.$reset();
    }
  },
});