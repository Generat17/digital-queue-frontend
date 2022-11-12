export interface IEmployee {
  employee_id: number;
  username: string;
  password: string;
  first_name: string;
  second_name: string;
  position: number;
  session_state: boolean;
  status: number;
  refresh_token: string;
  expires_at: number;
}
