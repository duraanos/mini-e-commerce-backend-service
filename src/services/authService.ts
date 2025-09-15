import { supabase } from '../config/db';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { User, UserCredentials } from '../types/user';

export const authService = {
  async register(userData: User) {
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', userData.email)
      .single();

    if (existingUser) throw new Error('Email already in use');

    if (typeof userData.password !== 'string') {
      throw new Error('Password must be a string');
    }

    const hashedPassword = await hashPassword(userData.password);

    const { data, error } = await supabase
      .from('users')
      .insert({ ...userData, password: hashedPassword })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  },

  async login(credentials: UserCredentials) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', credentials.email)
      .single();

    if (error || !user) throw new Error('User not found');

    const isPasswordCorrect = comparePassword(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error('Invalid credentials');

    const token = generateToken(user.id);

    return { token, user };
  },
};
