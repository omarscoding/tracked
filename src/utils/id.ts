import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique UUID v4 identifier
 */
export function generateId(): string {
  return uuidv4();
}
