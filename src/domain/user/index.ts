import { UserPreference } from '@app/database/schema';
import { Lesson } from '@app/database/schema';
import { LessonModel } from '@app/domain/lesson';
import { LessonDto } from '@app/domain/lesson/types';
import { PreferenceVo } from '@app/domain/user/types';

export class UserModel {
  public static async getStudentLessons(externalId: string): Promise<LessonDto> {
    const filter = { externalId };
    const userPreference = await UserPreference.findOne(filter);

    const preferences: Array<PreferenceVo> = userPreference.preferences.map(preference => {
      return {
        preferenceName: preference.preferenceName,
        priority: preference.priority
      }
    });

    return await LessonModel.getLessonsByPreferences(preferences);
  }

  public static async getTutorLessons(externalId: string): Promise<LessonDto> {
    return await LessonModel.getLessonsByUser(externalId);
  }
}
