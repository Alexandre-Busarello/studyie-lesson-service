import { Lesson } from '@app/database/schema';
import { LessonDto } from '@app/domain/lesson/types';
import { PreferenceVo } from '@app/domain/user/types';
import { getUniqueArray } from '@app/helpers'

export class LessonModel {
  public static async create(lesson: LessonDto): Promise<LessonDto> {
    return await Lesson.create(lesson);
  }

  public static async update(id: string, lesson: LessonDto): Promise<LessonDto> {
    return await Lesson.findByIdAndUpdate(id, lesson, { new: true });
  }

  public static async getAll(): Promise<LessonDto> {
    return await Lesson.find().sort('-createdAt');
  }

  public static async getByQuery(q: string): Promise<LessonDto> {
    return await Lesson.find({ $or: [
      { name: { $regex: '.*' + q + '.*' } },
      { description: { $regex: '.*' + q + '.*' } }
    ]}).sort('-createdAt');
  }

  public static async getLessonsByPreferences(preferences: Array<PreferenceVo>): Promise<LessonDto> {
    const prefOrderByPriority = preferences.sort(
      (preferenceA, preferenceB) => preferenceA?.priority - preferenceB?.priority
    );
    const allPrefFilter = prefOrderByPriority.map(preference => {
      return { "contentsType.name": preference.preferenceName }
    });
    if (allPrefFilter.length === 0) {
      return await LessonModel.getAll();
    }
    const lessonArray = await Promise.all(allPrefFilter.map(async pref => {
      const lessonFilter = {
        $or: [pref]
      };

      return await Lesson.find(lessonFilter);
    }));

    let orderedLessons = lessonArray[0];
    const ready = await lessonArray.forEach(async (lessons, index) => {
      if (index !== 0) {
        orderedLessons = orderedLessons?.concat(lessons);
      }
    });

    return getUniqueArray(orderedLessons, '_id');
  }

  public static async getLessonsByUser(externalId: string): Promise<LessonDto> {
    return await Lesson.find({ tutorExternalId: externalId })
  }

  public static async getLessonById(id: string): Promise<LessonDto> {
    return await Lesson.findById(id);
  }

  public static validateData(lesson: LessonDto): string {
    if (!lesson.name) {
      return 'The lesson name is required';
    }
    if (!lesson.videoUrl) {
      return 'The video url is required';
    }
    if (!lesson.description) {
      return 'The description is required';
    }
    if (lesson.contentsType?.length === 0 || !lesson.contentsType) {
      return 'At least one content type is mandatory';
    }
    return null;
  }
}
