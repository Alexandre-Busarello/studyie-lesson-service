import { Router } from 'express';
import { LessonModel } from '@app/domain/lesson';
import { LessonDto } from '@app/domain/lesson/types';

const routes = Router();

routes.get('/lesson', async (req: any, res: any) => {
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
  if (!req.params?.id) {
    return req.status(400).json({ message: 'The id is necessary to update' });
  }

  const error = LessonModel.validateData(req.body);
  if (error) return res.status(400).json({ message: error });

  const lesson: LessonDto = {
    ...req.body,
    tutorExternalId: req.userId
  }

  return res.json(await LessonModel.update(req.params.id, lesson));
});

export default routes;
