import jwt from 'jsonwebtoken';

const max_age = 24 * 60 * 60;

const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: max_age });
};

export default createToken;
