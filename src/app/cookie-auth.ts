// app/utils/cookie-auth.ts - Simple cookie auth separate from NextAuth
const HARDCODED_ADMIN = {
  email: "admin@khanagro.com",
  password: "monterwhite",
  name: "Admin"
};

const SIMPLE_AUTH_COOKIE = "khan_simple_auth";

export function simpleLogin(email: string, password: string): boolean {
  if (typeof document === 'undefined') return false;
  
  if (email === HARDCODED_ADMIN.email && password === HARDCODED_ADMIN.password) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `${SIMPLE_AUTH_COOKIE}=true; expires=${expires.toUTCString()}; path=/`;
    return true;
  }
  return false;
}

export function simpleLogout(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${SIMPLE_AUTH_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function isSimplyAuthenticated(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.includes(`${SIMPLE_AUTH_COOKIE}=true`);
}