import { http, HttpResponse } from 'msw';
import { env } from '~/constants/env';

export const authHandlers = [
  http.get(`${env.API_URL}/auth/me`, () => {
    return HttpResponse.json(
      {
        data: {
          name: 'John Doe',
          email: 'john@mail.co',
        },
      },
      { status: 200 },
    );
  }),

  http.post(`${env.API_URL}/auth/login`, async ({ request }) => {
    const body = await request.json();
    console.log('👾 ~ login ~ body:', body);

    return HttpResponse.json(
      {
        data: {
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        },
      },
      { status: 200 },
    );
  }),
];
