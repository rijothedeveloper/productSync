import dbPool from "../config/db.config";

let response: { error: any; statusCode: number; result: object | null };

export async function registerUser(user: User) {
  try {
    const query = {
      text: `INSERT INTO users (name, "userName", email, business_name, phone, password)
                VALUES ($1, $2, $3, $4, $5, $6)`,
      values: [
        user.name,
        user.userName,
        user.email,
        user.business_name,
        user.phone,
        user.password,
      ],
    };
    const result = await dbPool.query(query);
    response = { error: null, statusCode: 201, result: result.rows };
  } catch (error) {
    response = { error, statusCode: 500, result: null };
  }
  return response;
}
