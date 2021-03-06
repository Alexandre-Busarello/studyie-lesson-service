import { Router } from 'express';
import { ContentTypeModel } from '@app/domain/content/content-type';

const routes = Router();

routes.post('/content/types', async (req: any, res: any) => {
  return res.json(await ContentTypeModel.create(req.body));
});

export default routes;
