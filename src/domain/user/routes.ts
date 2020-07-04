import { Router } from 'express';
import { UserPreferenceModel } from '@app/domain/user/user-preference';
import { UserPreferenceDto } from '@app/domain/user/types';

const routes = Router();

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

export default routes;
