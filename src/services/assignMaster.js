import axios from "axios";

export const assignMaster = async (staffId) =>
  axios.patch(`staffs/${staffId}/assign-to-master`);
