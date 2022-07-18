enum UserRoles {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export default interface IUser {
  _id: string;
  uid: string;
  name: string;
  email: string;
  role: UserRoles;
}

export const DEFAULT_USER: IUser = {
  _id: '',
  uid: '',
  name: '',
  email: '',
  role: UserRoles.CUSTOMER,
};

export const DEFAULT_FIRE_TOKEN = '';
