
export interface IRole {
    id?: number;
    name?: string;
    description?: any;
}
export interface IUser {
    id?: number;
    name?: string;
    username?: any;
    role: IRole,
    foto: any
}

export interface INomenclators {
    id?: number;
    name?: string;
    description?: any;
}

export interface IArea {
    id?: number;
    name?: string;
    description?: any;
}
export interface IDepartment {
    id?: number;
    name?: string;
    description?: any;
}
export interface ICompany {
    id?: number;
    name?: string;
    description?: any;
}
export interface IDeficiency {
    id?: number;
    name?: string;
    description?: any;
}
export interface IAction {
    id?: number;
    name?: string;
    description?: any;
}
export interface INotification {
    id?: number;
    name?: string;
    description?: any;
    date?: any;
    active?: boolean;
}

export interface IJanitor {
    id?: number;
    name?: string;
    lastname?: any;
    phone?: any;
    turn_types_id?: any;
    cleaning_companies_id?: any;
}

export interface IPreOperation {
    id?: number;
    name?: string;
    description?: any;
    users: IUser
}
export interface ILaboratory {
    id?: number;
    name?: string;
    description?: any;
}

export interface ISampleRequestForms {
    id?: number;
    name?: string;
    date?: any;
    state?: INomenclators;
}

export interface ISopLog {
    id?: number;
    status?: string;
    date?: any;
    periodo?: any;
    users: IUser
}

