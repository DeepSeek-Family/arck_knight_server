import crypto from 'crypto';

const cryptoToken = () => {
  return crypto.randomBytes(64).toString('hex');
};
export default cryptoToken;