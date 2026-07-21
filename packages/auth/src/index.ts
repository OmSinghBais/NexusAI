export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  GUEST = 'GUEST',
  WORLD_OBSERVER = 'WORLD_OBSERVER',
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: Role[];
  organizationId?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  roles: Role[];
  organizationId?: string;
}
