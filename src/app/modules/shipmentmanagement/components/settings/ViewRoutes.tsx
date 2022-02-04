import { routemodels } from "../../ShipmentModels/RouteModel";
import { TablesWidgetRoute } from "./TableWidgetRoute";


export function ViewRoutes() {
    return (
        <div className='row g-5 g-xxl-8'>
            <div className='col-xl-12'>
                <TablesWidgetRoute className='mb-5 mb-xxl-8' route={routemodels} />
            </div>
        </div>
    )
}
