declare namespace API {
  type AddOrUpdateResult = {
    id?: number;
  };

  type ApiAddRequest = {
    name?: string;
    method?: string;
    url?: string;
    requestHeaders?: string;
    requestParams?: string;
    requestBody?: string;
    responseBody?: string;
    requestExample?: string;
    description?: string;
  };

  type ApiInfoVo = {
    id?: number;
    name?: string;
    method?: string;
    url?: string;
    requestHeaders?: string;
    requestParams?: string;
    requestBody?: string;
    responseBody?: string;
    requestExample?: string;
    status?: number;
    userInfo?: UserDTO;
    description?: string;
    createTime?: string;
    updateTime?: string;
  };

  type ApiQueryRequest = {
    id?: number;
    name?: string;
    method?: string;
    url?: string;
    status?: number;
    username?: string;
    description?: string;
  };

  type ApiUpdateRequest = {
    id?: number;
    name?: string;
    method?: string;
    url?: string;
    requestHeaders?: string;
    requestParams?: string;
    requestBody?: string;
    responseBody?: string;
    requestExample?: string;
    description?: string;
  };

  type BaseResponseAddOrUpdateResult = {
    code?: number;
    message?: string;
    data?: AddOrUpdateResult;
  };

  type BaseResponseListResultApiInfoVo = {
    code?: number;
    message?: string;
    data?: ListResultApiInfoVo;
  };

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

  type BaseResponseVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type DeleteRequestLong = {
    id?: number;
    ids?: number[];
  };

  type getApiInfoPageParams = {
    apiQueryRequest: ApiQueryRequest;
    pageRequest: PageRequest;
  };

  type ListResultApiInfoVo = {
    items?: ApiInfoVo[];
    total?: number;
  };

  type PageRequest = {
    pageNum?: number;
    pageSize?: number;
    sortFields?: string[];
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
