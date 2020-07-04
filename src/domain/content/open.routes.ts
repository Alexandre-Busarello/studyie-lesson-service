import { Router } from 'express';
import { ContentTypeModel } from '@app/domain/content/content-type';

const routes = Router();

routes.get('/content/types', async (req: any, res: any) => {
  return res.json(await ContentTypeModel.getAll());
});

export default routes;
