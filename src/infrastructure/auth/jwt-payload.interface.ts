// auth/jwt-payload.interface.ts
export interface JwtPayload {
    sub: number; // Este sería el ID del usuario
    email: string; // El email del usuario
}