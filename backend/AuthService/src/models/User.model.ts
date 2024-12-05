import dbPool from "../config/db.config";

export interface User {
  id: number | null;
  userName: string;
  name: string;
  email: string;
  busines_name: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export const getUser = async (userId: string): Promise<User | null> => {
  const query = {
    text: `SELECT id, name, "userName", email, busines_name, phone FROM "Users" WHERE id = $1`,
    values: [userId],
  };
  try {
    const result = await dbPool.query(query);
    if (result.rows.length === 0) {
      return null;
    }
    const user: User = result.rows[0];
    return result.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
