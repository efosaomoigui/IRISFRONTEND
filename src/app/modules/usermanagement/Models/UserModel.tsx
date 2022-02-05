import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../setup";
import { IUserModel } from "../../auth/models/AuthInterfaces";
import { getUsers } from "../UserManagementCRUD";

export const usersmodel: IUserModel[] = [
    {
        userId: "Efosa",
        firstName: "Efosa",
        lastName: "Omoigui",
        email: "efeomoigui@gmail.com",
        age: "70",
        designation: "IT Head",
        department: "IT",
        pictureUrl: "Efosa",
        isActive: "Efosa",
        organisation: "Efosa",
        status: "Efosa",
        dateCreated: "Efosa",
        dateModified: "Efosa",
        isDeleted: "Efosa",
        systemUserId: "Efosa",
        systemUserRole: "Efosa",
        passwordExpireDate: "Efosa",
        identificationImage: "Efosa",
        walletNumber: "Efosa",
    }, 
    {
        userId: "Efosa1",
        firstName: "Efosa1",
        lastName: "Omoigui",
        email: "efeomoigui1@gmail.com",
        age: "70",
        designation: "IT Head",
        department: "IT",
        pictureUrl: "Efosa",
        isActive: "Efosa",
        organisation: "Efosa",
        status: "Efosa",
        dateCreated: "Efosa",
        dateModified: "Efosa",
        isDeleted: "Efosa",
        systemUserId: "Efosa",
        systemUserRole: "Efosa",
        passwordExpireDate: "Efosa",
        identificationImage: "Efosa",
        walletNumber: "Efosa",
    }
]