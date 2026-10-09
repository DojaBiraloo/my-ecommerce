// Login

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Signup

export interface SignupRequest {
  id: number;
  username: string;
  email: string;
  password: string;
}

// FakeStoreAPI responds to POST /users with just the new user's id
export interface SignupResponse {
  id: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}