export interface PermissionObject {
  id: string;
  parentCapability: string;
  invoker: string;
  caveats: Array<any>;
  date: number;
}
