export interface ImongoUser {
  _id: string;
  googleId: string;
    username: {
        firstName: string;
        lastName: string;
    };
    profilePic: string;
    __v: number;
}
