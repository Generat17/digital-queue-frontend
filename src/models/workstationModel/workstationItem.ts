export type WorkstationApi = {
  workstation_id: number;
  employee_id: number;
  workstation_name: string;
};

export type WorkstationModel = {
  workstationId: number;
  employeeId: number;
  workstationName: string;
};

export const normalizeWorkstation = (
  from: WorkstationApi
): WorkstationModel => ({
  workstationId: from.workstation_id,
  employeeId: from.employee_id,
  workstationName: from.workstation_name,
});
