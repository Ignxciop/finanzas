export interface AuthResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}
