import dotenv from 'dotenv';
import utils from '../../utils';

dotenv.config();
let seedersQuery;

if (process.env.NODE_ENV === 'production') {
//   seed default root admin and halls
  seedersQuery = `
    INSERT INTO users ( "email", "firstName", "lastName", "hashedPassword", "role")
      VALUES ('clifford@abdcenter.com.ng', 'clifford', 'chibuike', '${utils.hashPassword('password')}', 'superAdmin'),       
        ('facilitymanager@abdcenter.com.ng', 'john', 'doe', '${utils.hashPassword('password')}', 'admin'); 
`;
}
if (process.env.NODE_ENV === 'test') {
  seedersQuery = '';
}

const seeders = seedersQuery;
export default seeders;
