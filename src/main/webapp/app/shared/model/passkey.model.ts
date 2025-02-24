import { type IUser } from '@/shared/model/user.model';

export interface IPasskey {
  id?: string;
  label?: string;
  created?: Date;
  lastUsed?: Date;
  signatureCount?: number;
  user?: IUser | null;
}

export class Passkey implements IPasskey {
  constructor(
    public id?: string,
    public label?: string,
    public created?: Date,
    public lastUsed?: Date,
    public signatureCount?: number,
    public user?: IUser | null,
  ) {}
}
