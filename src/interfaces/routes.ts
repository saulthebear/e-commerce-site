export default interface IRoute {
  path: string;
  name: string;
  auth: boolean;
  admin?: boolean;
  element: React.ReactNode;
}
