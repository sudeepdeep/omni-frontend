import { Store } from "pullstate";

interface IUIStore {
  message: string;
  userLoggedIn: boolean;
  username: any;
  userId: any;
  profileUrl: any;
}

interface IUserDetails {
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  dateOfJoin: string;
  email: string;
  address: string;
  bio: string;
  licenseNo: string;
  profileUrl: string;
}

const UIStore = new Store<IUIStore>({
  message: "Hi, from store",
  userLoggedIn: false,
  username: "",
  profileUrl: "",
  userId: 0,
});

export const UserDetailsStore = new Store<IUserDetails>({
  firstName: "",
  lastName: "",
  username: "",
  role: "",
  address: "",
  email: "",
  licenseNo: "",
  dateOfJoin: "",
  bio: "",
  profileUrl: "",
});

export const FeedStore = new Store<any>({
  posts: [],
});

export default UIStore;
