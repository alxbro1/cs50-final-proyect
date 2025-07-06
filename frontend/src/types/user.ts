type User = {
  id?: number;
  isVerified?: boolean;
  appointments?: Array<{
    id?: number;
    date?: string;
    time?: string;
    service?: string;
    status?: string;
  }>;
  role?: string;
};
export type { User };