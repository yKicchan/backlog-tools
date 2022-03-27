declare interface Attachment {
  id: number;
  name: string;
  size: number;
  createdUser: CreatedUser;
  created: string;
}

declare interface CreatedUser {
  id: number;
  userId: string;
  name: string;
  roleType: number;
  lang: string;
  mailAddress: string;
}
