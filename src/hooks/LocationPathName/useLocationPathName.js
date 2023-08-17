export const useLocationPathName = (location, productTitle) => {
  if (location.pathname === "/profile") return "Profile";
  else if (location.pathname === "/purchases") return "Purchases";
  else return productTitle;
};
