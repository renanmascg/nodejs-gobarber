import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
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

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
