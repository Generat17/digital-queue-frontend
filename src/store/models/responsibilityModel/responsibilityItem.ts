export type ResponsibilityApi = {
  responsibility_id: number;
  responsibility_name: string;
};

export type ResponsibilityModel = {
  id: number;
  name: string;
};

export const normalizeResponsibility = (
  from: ResponsibilityApi
): ResponsibilityModel => ({
  id: from.responsibility_id,
  name: from.responsibility_name,
});
