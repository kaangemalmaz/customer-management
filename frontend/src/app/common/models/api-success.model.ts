export interface ApiSuccess<T = any> {
  success: true;
  message: string;
  data: T | null;
  statusCode: number;
  timestamp: string;
}