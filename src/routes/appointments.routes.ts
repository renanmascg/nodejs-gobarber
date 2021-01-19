import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (req, res) => {
  return res.json({ message: 'minha rota de appointments' });
});

export default appointmentsRouter;
