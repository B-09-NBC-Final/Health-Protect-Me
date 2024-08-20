import { Tables } from './supabase';

export type Post = Tables<'posts'>;
export type User = Tables<'users'>;
export type Comments = Tables<'comments'>;
