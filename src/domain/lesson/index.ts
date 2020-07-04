import { Lesson } from '@app/database/schema';
import { LessonDto } from '@app/domain/lesson/types';

export class LessonModel {
  public static async create(lesson: LessonDto): Promise<LessonDto> {
    return await Lesson.create(lesson);
  }

  public static async getAll(): Promise<LessonDto> {
    return await Lesson.find();
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
