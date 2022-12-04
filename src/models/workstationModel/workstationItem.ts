export type WorkstationApi = {
  workstation_id: number;
  employee_id: number;
  workstation_name: string;
  responsibility_list: number[];
  responsibility_list_name: string[];
};

export type WorkstationModel = {
  workstationId: number;
  employeeId: number;
  workstationName: string;
  responsibilityList: number[];
  responsibilityListName: string[];
};

export const normalizeWorkstation = (
  from: WorkstationApi
): WorkstationModel => ({
  workstationId: from.workstation_id,
  employeeId: from.employee_id,
  workstationName: from.workstation_name,
  responsibilityList: from.responsibility_list,
  responsibilityListName: from.responsibility_list_name,
});
