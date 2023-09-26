import jwt from "jsonwebtoken";

//=============================
// Generación De Token
//=============================
const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "1000h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No Se Pudo Generar El Token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generarJWT };
