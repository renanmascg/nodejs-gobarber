import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../config/auth';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('Incorrect email/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
