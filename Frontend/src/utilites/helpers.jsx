export const formatUserName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  
  export const isAuthenticated = (user) => {
    return user && user.isLoggedIn;
  };
  