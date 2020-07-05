import { Router } from 'express';
import { UserModel } from '@app/domain/user';
import { UserPreferenceModel } from '@app/domain/user/user-preference';
import { UserPreferenceDto } from '@app/domain/user/types';

const routes = Router();

routes.get('/student/preferences', async (req: any, res: any) => {
  return res.json(await UserPreferenceModel.getUserPreferenceById(req.userId));
});

routes.get('/user/preferences', async (req: any, res: any) => {
  return res.json(await UserPreferenceModel.getAll());
});

routes.post('/user/preferences', async (req: any, res: any) => {
  let error = null;
  const preferences = await req.body.map(preference => {
    if (!error) {
      error = UserPreferenceModel.validateData(preference);
    }
    preference.priority = preference.priority ? preference.priority : 0;
    return preference;
  });

  if (error) return res.status(400).json({ message: error });

  const userPreference: UserPreferenceDto = {
    externalId: req.userId,
    preferences
  };

  return res.json(await UserPreferenceModel.upsert(userPreference));
});

routes.get('/student/lesson', async (req: any, res: any) => {
  return res.json(await UserModel.getStudentLessons(req.userId));
});

routes.get('/tutor/lesson', async (req: any, res: any) => {
  return res.json(await UserModel.getTutorLessons(req.userId));
});

export default routes;
