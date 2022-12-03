export interface AuthInitialState {
  loading: boolean;
  isLoggedin: boolean;
  permissions: string[];
}

export interface LoginAPIBody {
  email: string;
  password: string;
}

export interface LoginAPIResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
}
