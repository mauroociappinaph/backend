import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        // Extraer el mensaje de la excepción si es de tipo HttpException
        const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

        // Si el mensaje es un objeto, podemos manejarlo para extraer la información relevante
        const errorMessage = typeof message === 'object' && 'message' in message ? message['message'] : message;

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: errorMessage, // Incluir el mensaje directamente
        };

        response.status(status).json(errorResponse);
    }
}