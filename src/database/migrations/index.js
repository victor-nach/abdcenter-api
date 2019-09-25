import db from '../config';
import seeders from './seeders';

const migrate = async () => {
  const text = `
  DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "email" VARCHAR(128) UNIQUE NOT NULL,
    "firstName" VARCHAR(128) NOT NULL,
    "lastName" VARCHAR(128) NOT NULL,
    "hashedPassword" VARCHAR(128) NOT NULL,
    "role" VARCHAR (35) NOT NULL,
    "createdOn" TIMESTAMP NOT NULL DEFAULT (NOW())
  );
  DROP TABLE IF EXISTS halls CASCADE;
  CREATE TABLE halls(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(128)  NOT NULL,
    "hallCapacity" BIGINT NOT NULL,
    "BookingPricePerDay" NUMERIC(200, 2) NOT NULL,
    "recentDateRented" TIMESTAMP NOT NULL DEFAULT (NOW()),
    "recentTransaction" NUMERIC(200, 2) NOT NULL DEFAULT (0),
    "timesRented" BIGINT NOT NULL DEFAULT (0),
    "totalIncome" NUMERIC(200, 2) NOT NULL DEFAULT (0),
    "status" VARCHAR(128)  NOT NULL DEFAULT ('available')
  );
  `;

  await db.query(text + seeders);
};

migrate();
