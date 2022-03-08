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
        phoneNumber:"000",
        age: "70",
        designation: "IT Head", 
        department: "IT",
        pictureUrl: "Efosa",
        isActive: true,
        organisation: "Efosa",
        status: 1,
        dateCreated: "Efosa",
        dateModified: "Efosa",
        isDeleted: "Efosa",
        systemUserId: "Efosa",
        systemUserRole: "Efosa",
        passwordExpireDate: "Efosa",
        identificationImage: "Efosa",
        walletNumber: "Efosa",
    }, 

];

export class User implements IUserModel {
    constructor(init?: UserFormValues) {
      Object.assign(this, init);
    }
    userId: string =  '';
    userName: string = '';
    firstName: string =  '';
    lastName:  string = '';
    email: string = '';
    phoneNumber: string =  '';
    age: string =  '70';
    designation: string = '';
    department: string =  '';
    pictureUrl: string =  '';
    isActive:boolean =  false;
    organisation:string =  '';
    status:number =  1;
    dateCreated:string =  "Efosa";
    dateModified : string =  "Efosa";
    isDeleted: string = "Efosa";
    systemUserId: string =  "Efosa";
    systemUserRole: string = "Efosa";
    passwordExpireDate: string =  "Efosa";
    identificationImage: string = "Efosa";
    walletNumber: string =  "Efosa";  
}


export class UserFormValues {

    userId: string =  '';
    userName: string = '';
    firstName: string =  '';
    lastName:  string = '';
    email: string = '';
    phoneNumber: string =  '';
    age: string =  '70';
    designation: string = '';
    department: string =  '';
    pictureUrl: string =  '';
    isActive:boolean =  false;
    organisation:string =  '';
    status:number =  1;
    dateCreated:string =  "Efosa";
    dateModified : string =  "Efosa";
    isDeleted: string = "Efosa";
    systemUserId: string =  "Efosa";
    systemUserRole: string = "Efosa";
    passwordExpireDate: string =  "Efosa";
    identificationImage: string = "Efosa";
    walletNumber: string =  "Efosa";


    constructor(user?: UserFormValues) {
      if (user) {
        this.userName = user.userName;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.age = user.age;
        this.designation = user.designation;
        this.department = user.department;
      }
    }
}