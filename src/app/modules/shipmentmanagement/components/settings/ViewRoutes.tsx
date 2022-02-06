import { useEffect, useState } from "react";
import { getRoute } from "../../ShipmentManagementCRUD";
import { routemodels } from "../../ShipmentModels/RouteModel";
import { IRouteModel } from "../../ShipmentModels/ShipmentInterfaces";
import { TablesWidgetRoute } from "./TableWidgetRoute";


export function ViewRoutes() {
    const [routemodel1, setRouteModel] = useState<IRouteModel[]>([]);

    // //USE EFFECT HOOK
    useEffect(() => {
        const requestRoute = async () => {
            await getRoute()
                .then(({ data }) => {
                    setRouteModel(data);

                }).
                then(() => {
                    console.log("ERROR: ", "This was unable to return any data");
                });
        }

        requestRoute();

    }, []);

    return (
        <div className='row g-5 g-xxl-8'>
            <div className='col-xl-12'>
                <TablesWidgetRoute className='mb-5 mb-xxl-8' route={routemodel1} />
            </div>
        </div>
    )
}
