import { ContentType } from '@app/database/schema';
import { ContentTypeDto } from '@app/domain/content/types';
import { toFirstLetterUppercase } from '@app/utils/string-utils';

export class ContentTypeModel {
  public static async create(contentType: ContentTypeDto): Promise<ContentTypeDto> {
    contentType.name = toFirstLetterUppercase(contentType.name);
    return await ContentType.create(contentType);
  }

  public static async getAll(): Promise<ContentTypeDto> {
    return await ContentType.find();
  }
}
