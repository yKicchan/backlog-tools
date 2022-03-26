export interface Attachment {
  id: number;
  name: string;
  size: number;
  createdUser: CreatedUser;
  created: string;
}

export interface CreatedUser {
  id: number;
  userId: string;
  name: string;
  roleType: number;
  lang: string;
  mailAddress: string;
}
