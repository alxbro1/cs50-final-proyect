type User = {
  id?: string;
  isVerified?: boolean;
  appointments?: Array<{
    id?: string;
    date?: string;
    time?: string;
    service?: string;
    status?: string;
  }>;
  role?: string;
};
export type { User };