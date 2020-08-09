export const putUserToAdmin = {
  tags: ['Admin'],
  description: 'User to Admin',
  summary: '[AUTH: ADMIN]',
  parameters: [
    {
      in: 'path',
      name: 'userId',
      schema: {
        type: 'string',
      },
      description: 'User ID',
    },
  ],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            status: 'Success',
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
