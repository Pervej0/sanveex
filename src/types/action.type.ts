export type ActionError = Record<string, string[]>;

export interface ActionResponse {
  errors: ActionError;
  error: string | null;
  success: string | null;
  status: boolean;
  formData: null;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
  errors?: ActionError;
}
