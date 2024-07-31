import { RegisterUserDto } from '~backend/user/user.dto';
import { ApiResponse, UserWithoutPassword } from '~libs/entities';
import { Api, getData } from '.';
import { LoginUserDto } from '~api/user/user.dto';

export default {
  async createUser(dto: RegisterUserDto) {
    await Api.client('/user', false).post('', dto);
  },
  async login(dto: LoginUserDto) {
    return getData<ApiResponse<{ token: string }>>(
      await Api.client('/auth', false).post('/login', dto)
    );
  },
  async logout() {
    await Api.client('/auth').post('/logout');
  },
  async fetchUser() {
    return getData<UserWithoutPassword>(
      await Api.client('/auth').get('/profile')
    );
  },
};
