/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Lấy message an toàn
    const message =
      exception?.response?.message ||
      exception?.message ||
      'Internal server error';

    // 🔴 CHỖ NÀY GÂY LỖI: Cần thêm ?. để không bị crash khi errors không tồn tại
    const errors = exception?.response?.errors || null;

    response.status(status).json({
      success: false,
      statusCode: status,
      message: message,
      errors: errors, // Nếu null thì trả về null, không bị crash code nữa
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
