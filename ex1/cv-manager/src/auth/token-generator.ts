import { sign } from 'jsonwebtoken';

const secret = 'votre_secret_jwt'; // Doit correspondre au secret dans AuthModule
const token = sign(
  { userId: 123 }, // ID numérique comme dans vos services
  secret,
  { expiresIn: '1h' }
);

console.log('Token pour tests:');
console.log(token);
console.log('\nHeader à utiliser:');
console.log({ 'auth-user': token });