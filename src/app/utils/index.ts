export const isUserAdmin = (): boolean => {
  let user = localStorage.getItem('loggedUser');

  if (!user)
    return false;

  return JSON.parse(user).isAdmin;
}

export const saveInLocal = (user: any) => {
  delete user.passwd;
  delete user.repeatedPass;

  localStorage.setItem('loggedUser', JSON.stringify(user));
}

export const getUserLogged = () => {
  return JSON.parse(localStorage.getItem('loggedUser') as string);
}

export const alert = (ctx: any, message: string) => {
  ctx.alert.open(message, 'Close', {
    duration: 3000
  })
}