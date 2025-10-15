import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const DEV_USER = {
  id: 1,
  email: 'demo@demo.com',
  // hash for 'demo123'
  passwordHash: bcrypt.hashSync('demo123', 8),
};

@Injectable()
export class AuthService {
  async validateAndIssue(email: string, password: string): Promise<string | null> {
    const user = email.toLowerCase() === DEV_USER.email ? DEV_USER : null;
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return null;

    // sign a short-lived JWT
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '1h' }
    );
    return token;
  }
}

