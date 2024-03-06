export const selectUser = (state: any) => state.auth.user;
export const selectAllUsers = (state: any) => state.auth.allUsers;

export const selectIsRefreshing = (state: any) => state.auth.isRefreshing;
export const selectAuthIsLoading = (state: any) => state.auth.isLoading;
export const selectAuthError = (state: any) => state.auth.error;
