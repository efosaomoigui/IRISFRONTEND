export const isThorized = (HasUserRoles: string[]) => {
  const access:Access = {
    Admin: false,
    Finance: false,
    Agent: false,
    Customer: false,
    Driver: false
  }
  for (let i = 0; i < HasUserRoles.length; i++) {
    if (HasUserRoles.includes('Admin')) {
      access.Admin = true;
    }

    if (HasUserRoles.includes('Finance')) {
      access.Finance = true;
    }

    if (HasUserRoles.includes('Agent')) {
      access.Agent = true;
    }

    if (HasUserRoles.includes('Customer')) {
      access.Customer = true;
    }
  }
  return access;
}

export interface Access{
  Admin:boolean
  Finance:boolean
  Agent:boolean
  Customer:boolean
  Driver:boolean
}
