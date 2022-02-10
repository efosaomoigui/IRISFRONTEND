import { useEffect, useState } from "react";
import agent from "../../../../../setup/axios/AxiosAgent";
import LoadingComponent from "../../../../LoadingComponent";
import { IFleetModel } from "../../ShipmentModels/ShipmentInterfaces";
import { TablesWidgetFleet } from "./TableWidgetFleet";


export function ViewFleets() {
  const [loading, setLoading] = useState(true)
  const [fleetmodel, setFleetModel] = useState<IFleetModel[]>([]);

  useEffect(() => {
    agent.Fleet.list().then((response) => {
      setFleetModel(response)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingComponent content='Loading...' />
  
  return (
    <div className='row g-5 g-xxl-8'>
      <div className='col-xl-12'>
        <TablesWidgetFleet className='mb-5 mb-xxl-8' fleet={fleetmodel} />
      </div>
    </div>
  )
}




