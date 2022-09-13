export class User {
    constructor(
        public name: string,
        public username: string,
        public role: string,
        public foto: string,
        public token?: string,
    ) { }

    public get_username() {
        return this.username;
    }
    public get_token() {
        return this.token;
    }
    public get_role() {
        return this.role;
    }
}

export enum Role {
    QA = "QA",
    Admin = "ADMIN",
    Monitor="MONITOR"
}