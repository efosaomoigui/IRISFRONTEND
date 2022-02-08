import { useEffect, useState } from "react";
import { getFleet } from "../../ShipmentManagementCRUD";
import { IFleetModel } from "../../ShipmentModels/ShipmentInterfaces";
import { TablesWidgetFleet } from "./TableWidgetFleet";


export function ViewFleets() {
  const [fleetmodel, setFleetModel] = useState<IFleetModel[]>([]);

  // //USE EFFECT HOOK
  useEffect(() => {
    const requestFleet = async () => {
      await getFleet()
        .then(({ data }) => {
          setFleetModel(data);

        }).
        then(() => {
          console.log("ERROR: ", "This was unable to return any data");
        });
    }

    requestFleet();

  }, []);
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetFleet className='mb-5 mb-xxl-8' fleet={fleetmodel} />
      </div>
    </div>
  )
}
