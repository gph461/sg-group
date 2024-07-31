import { DeveloperDto } from '~backend/developer/developer.dto';
import { getData } from '~libs/helpers';
import { Api } from '.';

export default {
  async getAllDeveloper(): Promise<DeveloperDto[]> {
    return getData<DeveloperDto[]>(await Api.client('/developer').get('list'));
  },
  async getDeveloper(developer_id: number): Promise<DeveloperDto> {
    return getData<DeveloperDto>(
      await Api.client('/developer').get(`${developer_id}`)
    );
  },
};
