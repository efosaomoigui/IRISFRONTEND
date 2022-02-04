import { Fleetmodel } from "../../ShipmentModels/FleetModel";
import { TablesWidgetFleet } from "./TableWidgetFleet";


export function ViewFleets() {
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetFleet className='mb-5 mb-xxl-8' fleet={Fleetmodel} />
      </div>
    </div>
  )
}
