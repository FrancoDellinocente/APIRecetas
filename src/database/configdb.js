import { config } from 'dotenv';
config(); // Cargar las variables de entorno

const HOST = process.env.HOSTBD;
const USER = process.env.USERBD;
const PASSWORD = process.env.PASSWORDBD;
const NAMEBD = process.env.NAMEBD;
const PORTBD = process.env.PORTBD;

import { createPool } from 'mysql2/promise';
export const pool = createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: NAMEBD,
    port: PORTBD
});

import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize(NAMEBD, USER, PASSWORD, {
  host: HOST, 
  dialect: 'mysql', 
  // logging: false
});

