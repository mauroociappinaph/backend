import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            return false;
        }
        return true;
    }
}
