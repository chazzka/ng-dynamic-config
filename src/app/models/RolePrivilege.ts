export interface RolePrivilege {
    cfgKeyName: string;
    description: string;
    disallowForAnonymous: boolean;
    levelName: string;
    operationalPrivName: string;
    privType: string;
}