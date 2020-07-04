import { Router } from 'express';
import { ContentTypeModel } from '@app/domain/content/content-type';

const routes = Router();

routes.get('/content', async (req: any, res: any) => {
  return res.json(await ContentTypeModel.getAll());
});

routes.post('/content', async (req: any, res: any) => {
  return res.json(await ContentTypeModel.create(req.body));
});

export default routes;
