import express from 'express';

const signoutRouter = express.Router();

signoutRouter.get('/api/users/signout', async (request, response) => {
  request.session = null;
  response.send({});
});

export { signoutRouter };
