import api from '../axios' // Adjust path if this is not correct

// Login
export function loginUser(credentials: { username: string; password: string }) {
  return api.post('/login', credentials)
}

// Signup
export function signupUser(data: { username: string; password: string; passwordConfirm: string }) {
  return api.post('/signup', data)
}