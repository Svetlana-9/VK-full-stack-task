import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { createHash, randomBytes } from 'node:crypto';

@Injectable()
export class AuthService {
    private tokens: Record<string, number> = {};

    constructor() { }

    genToken(user: number): string {
        let token = createHash('sha256').update(user.toString() + randomBytes(16).toString()).digest('hex');
        this.tokens[token] = user;
        return token;
    }

    checkAuth(request: Request) {
        const token = this.extractTokenFromHeader(request);

        if (!token || !this.tokens.hasOwnProperty(token)) {
            throw new UnauthorizedException();
        }

        request['user'] = this.tokens[token];
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
