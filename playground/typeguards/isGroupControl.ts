import type { GroupControlType } from '../types/Controls';

export default (data?: Record<string, any>): data is GroupControlType<any> => {
  if (!data) return false;

  return data?.groupName !== undefined && data?.controls !== undefined;
};
