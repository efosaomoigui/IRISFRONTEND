import { useEffect, useState } from "react";
import agent from "../../../../../setup/axios/AxiosAgent";
import LoadingComponent from "../../../../LoadingComponent";
import { getRoute } from "../../ShipmentManagementCRUD";
import { IRouteModel } from "../../ShipmentModels/ShipmentInterfaces";
import { TablesWidgetRoute } from "./TableWidgetRoute";


export function ViewRoutes() {

    const [loading, setLoading] = useState(true)
    const [routemodels, setRouteModel] = useState<IRouteModel[]>([])

    // //USE EFFECT HOOK
    useEffect(() => {
        agent.Route.list().then((response) => {
            setRouteModel(response)
            setLoading(false)
        })
    }, [])

    if (loading) return <LoadingComponent content='Loading...' />

    return (
        <div className='row g-5 g-xxl-8'>
            <div className='col-xl-12'>
                <TablesWidgetRoute className='mb-5 mb-xxl-8' route={routemodels} />
            </div>
        </div>
    )
}
