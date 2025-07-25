export * from './abi';
export * from './constants';
export * from './contracts'; // pastikan ini benar
export * from './isOwner';
export * from './questions';
export * from './submitScoreToSupabase';
export * from './supabaseClient';
export * from './utils';
export * from './localStorage';

// Default export tambahan
export { default as questions } from './questions';
export { default as CONTRACT_ABI } from '@/abi/abi.json';
