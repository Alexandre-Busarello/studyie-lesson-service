import { UserPreference } from '@app/database/schema';
import { UserPreferenceDto, PreferenceVo } from '@app/domain/user/types';

export class UserPreferenceModel {
  public static async upsert(userPreference: UserPreferenceDto): Promise<UserPreferenceDto> {
    const filter = { externalId: userPreference.externalId };
    const options = { new: true, upsert: true };
    return await UserPreference.findOneAndUpdate(filter, userPreference, options);
  }

  public static async getAll(): Promise<UserPreferenceDto> {
    return await UserPreference.find();
  }

  public static async getUserPreferenceById(externalId: string): Promise<UserPreferenceDto> {
    return await UserPreference.find({ externalId });
  }

  public static validateData(userPreference: PreferenceVo): string {
    if (!userPreference.preferenceName) {
      return 'The preference name is required';
    }
    return null;
  }
}
