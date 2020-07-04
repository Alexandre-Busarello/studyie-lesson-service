import { ContentTypeVo } from '@app/domain/content/types';

export interface LessonDto {
  name: string,
  thumbUrl: string,
  videoUrl: string,
  description: string,
  contentsType: Array<ContentTypeVo>,
  tutorExternalId: string
}
