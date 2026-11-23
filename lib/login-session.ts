export const LOGIN_MOBILE_KEY = "finkuby-login-mobile";
export const USER_NAME_KEY = "finkuby-user-name";

export function saveLoginMobile(digits: string) {
  try {
    sessionStorage.setItem(LOGIN_MOBILE_KEY, digits);
  } catch {
    /* ignore */
  }
}

export function readLoginMobile() {
  try {
    return sessionStorage.getItem(LOGIN_MOBILE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function clearLoginMobile() {
  try {
    sessionStorage.removeItem(LOGIN_MOBILE_KEY);
  } catch {
    /* ignore */
  }
}

export function saveUserName(name: string) {
  try {
    sessionStorage.setItem(USER_NAME_KEY, name.trim());
  } catch {
    /* ignore */
  }
}

export function readUserName() {
  try {
    return sessionStorage.getItem(USER_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function clearUserName() {
  try {
    sessionStorage.removeItem(USER_NAME_KEY);
  } catch {
    /* ignore */
  }
}
