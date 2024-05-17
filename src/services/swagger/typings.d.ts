declare namespace API {
  type BaseResponseUserDTO = {
    code?: number;
    message?: string;
    data?: UserDTO;
  };

  type BaseResponseUserLoginResult = {
    code?: number;
    message?: string;
    data?: UserLoginResult;
  };

  type UserDTO = {
    id?: number;
    username?: string;
    roles?: string;
    nickname?: string;
    avatar?: string;
    gender?: number;
    tags?: string;
  };

  type UserLoginRequest = {
    username?: string;
    password?: string;
    loginType?: string;
    phone?: string;
    code?: string;
  };

  type UserLoginResult = {
    token?: string;
    expireTime?: string;
  };

  type UserRegisterRequest = {
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
}
