export interface RegisterResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
  };
  message: string;
}
