import { api } from '@/lib/axios';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  const res = await api.post('/auth/register', payload);
  return res.data;
}
