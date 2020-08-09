export const postUserProfileUpdate = {
  tags: ['User'],
  summary: '[AUTH]',
  description: 'User Profile Update',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
          },
        },
        example: {
          username: 'vasia228',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'User Profile Update',
      content: {
        'application/json': {
          example: {
            data: {
              id: 'da25ca78-e2ae-4b3d-bff0-2668747d8f89',
              username: null,
              email: 'test1@test.com',
              role: 'user',
              voiceBalance: 0,
              status: 'active',
              lastLogin: null,
              createdAt: '2020-07-07T21:16:36.455Z',
              updatedAt: '2020-07-07T21:16:36.455Z',
            },
          },
        },
      },
    },
  },
};
