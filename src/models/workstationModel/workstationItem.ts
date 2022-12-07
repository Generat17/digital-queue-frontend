export type WorkstationResponsibilityItem = {
  workstation_responsibility_id: number;
  workstation_responsibility_name: string;
};

export type WorkstationApi = {
  workstation_id: number;
  employee_id: number;
  workstation_name: string;
  responsibility_list: WorkstationResponsibilityItem[];
};

export type WorkstationModel = {
  workstationId: number;
  employeeId: number;
  workstationName: string;
  responsibilityList: WorkstationResponsibilityItem[];
};

export const normalizeWorkstation = (
  from: WorkstationApi
): WorkstationModel => ({
  workstationId: from.workstation_id,
  employeeId: from.employee_id,
  workstationName: from.workstation_name,
  responsibilityList: from.responsibility_list,
});
