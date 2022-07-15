export default interface IRoute {
  path: string;
  name: string;
  auth: boolean;
  element: React.ReactNode;
}
