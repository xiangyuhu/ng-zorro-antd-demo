export class HttpResponse<T> {
  message: string;
  statusCode: string;
  success: boolean;
  data: T;
}
