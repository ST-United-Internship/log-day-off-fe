import { Button } from "antd";
import { useExportDayOffData } from "../../hooks/useExportDayOffData";

const ExportDayoff = () => {
  const { mutate: exportDayoff, isLoading: exportLoading } =
    useExportDayOffData();
  return (
    <div>
      <Button loading={exportLoading} onClick={exportDayoff}>
        Export now
      </Button>
    </div>
  );
};

export default ExportDayoff;
