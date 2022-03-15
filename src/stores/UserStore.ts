
import type { GetUsersDto } from "@/dtos/GetUsersDto";
import { UserService } from "@/services/UserService";
import { defineStore } from "pinia";

const userService: UserService = new UserService();

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: { username: "" } as GetUsersDto,
  }),
  getters: {
    userName: (state) => {
      if (state.loggedInUser.username != undefined) return state.loggedInUser.username;
      else return "";
    },
  },
  actions: {
  /*  createUserandSignUp(username: string, password: string) {
      userService
        .createUserandSignUp(username, password)
        .then((user) => (this.loggedInUser = user))
        .catch((err) => console.log(err));
    }, */
    signInUser(signedInUser: GetUsersDto){
        this.loggedInUser =signedInUser;
    }

  },
});