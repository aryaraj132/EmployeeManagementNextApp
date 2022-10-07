export function getUserToken() {
    const currentUser = getUserFromLocalStorage();
    if (currentUser) {
        return currentUser.token;
    }
    else{
        return null;
    }
  }
  
  export function getUserFromLocalStorage() {
    const currentUser = JSON.parse(
      localStorage.getItem('User') || null,
    );
    return currentUser;
  }