export interface ApiError {
  name: string;
  message: string;
  statusCode: number;
  errors?: any;
  stack?: string;
}
