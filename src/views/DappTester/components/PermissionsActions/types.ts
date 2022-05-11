export interface PermissionObject {
  id: string;
  parentCapability: string;
  invoker: string;
  caveats: Array<Caveats>;
  date: number;
}

interface Caveats {
  type: string;
  value: Array<string>;
}
