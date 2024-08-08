import { create } from "zustand";

interface AppPagesProp {
  dashboard: boolean;
  manage_routes: boolean;
  my_profile: boolean;
  new_user: boolean;
  roles: boolean;
  goTo: (
    // eslint-disable-next-line no-unused-vars
    page: "dashboard" | "my_profile" | "new_user" | "roles" | "manage_routes"
  ) => void;
}

const appPageStore = create<AppPagesProp>((set) => {
  const storedState = sessionStorage.getItem("appPageState");

  const initialState: AppPagesProp = storedState
    ? JSON.parse(storedState)
    : {
        dashboard: true,
        manage_routes: false,
        my_profile: false,
        new_user: false,
        roles: false,
      };

  return {
    ...initialState,
    goTo: (page) => {
      set({
        dashboard: page === "dashboard",
        manage_routes: page === "manage_routes",
        my_profile: page === "my_profile",
        new_user: page === "new_user",
        roles: page === "roles",
      });

      sessionStorage.setItem("appPageState", JSON.stringify(appPageStore.getState()));
    },
  };
});

export default appPageStore;
