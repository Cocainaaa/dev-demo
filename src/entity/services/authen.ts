import jwt from 'jsonwebtoken';
import { myDataSource } from '../../../app-data-source';
import { User } from '../user.entity';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export async function createUserAndGenerateToken(username: string, password: string) {
  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await myDataSource.getRepository(User).findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Générez le hash du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Créez un nouvel utilisateur
    const newUser = new User();
    newUser.username = username;
    newUser.password = hashedPassword;

    // Enregistrez l'utilisateur dans la base de données
    await myDataSource.getRepository(User).save(newUser);

    // Générez le token JWT
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, 'your_secret_key');

    return token;
  } catch (error: any) {
    throw new Error('Failed to create user');
  }
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'your_secret_key', (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}