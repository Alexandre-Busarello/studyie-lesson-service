import { Router } from 'express';
import { LessonModel } from '@app/domain/lesson';
import { LessonDto } from '@app/domain/lesson/types';

const routes = Router();

routes.get('/lesson', async (req: any, res: any) => {
  if (req.query?.q) {
    return res.json(await LessonModel.getByQuery(req.query.q));
  }
  return res.json(await LessonModel.getAll());
});

routes.post('/lesson', async (req: any, res: any) => {
  const error = LessonModel.validateData(req.body);
  if (error) return res.status(400).json({ message: error });

  const lesson: LessonDto = {
    ...req.body,
    tutorExternalId: req.userId
  }

  return res.json(await LessonModel.create(lesson));
});

routes.put('/lesson/:id', async (req: any, res: any) => {
  return res.json(await LessonModel.update(req.params.id, req.body));
});

routes.get('/lesson/:id', async (req: any, res: any) => {
  return res.json(await LessonModel.getLessonById(req.params.id));
});

export default routes;
