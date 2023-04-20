import { Button } from "antd";
import { useExportDayOffData } from "../../hooks/useExportDayOffData";

const ExportDayoff = () => {
  const { mutate: exportDayoff } = useExportDayOffData();
  return (
    <div>
      <Button onClick={exportDayoff}>Export now</Button>
    </div>
  );
};

export default ExportDayoff;
