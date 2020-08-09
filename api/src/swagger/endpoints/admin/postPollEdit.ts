export const postPollEdit = {
  tags: ['Admin'],
  summary: '[AUTH: ADMIN]',
  description: 'Edit Poll-Event REQUIRED: ADMIN Permission',
  parameters: [
    {
      in: 'path',
      name: 'pollId',
      schema: {
        type: 'string',
      },
      description: 'poll ID',
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
            endMessage: {
              type: 'string',
            },
            startDate: {
              type: 'date',
            },
            endDate: {
              type: 'date',
            },
            status: {
              type: 'enum',
            },
            type: {
              type: 'enum',
            },
          },
        },
        example: {
          name: 'Test Event',
          message: 'Test Message',
          endMessage: 'Test End Message',
          startDate: '2011-10-05T14:48:00.000',
          endDate: '2011-10-05T14:48:00.000',
          status: 'active',
          type: 'infinite',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Successful edit poll-event',
      content: {
        'application/json': {
          example: {
            data: {
              name: 'Test Event',
              message: 'Test Message',
              endMessage: 'Test End Message',
              startDate: '2011-10-05T11:48:00.000Z',
              endDate: '2011-10-05T11:48:00.000Z',
              status: 'active',
              type: 'infinite',
              createdAt: '2020-07-08T10:49:59.090Z',
              updatedAt: '2020-07-08T10:49:59.090Z',
              id: '5cd0d003-d594-4a41-b64e-962c5a0f9a1c',
            },
          },
        },
      },
    },
    '401': {
      description: 'Error user auth',
      content: {
        'application/json': {
          example: {
            errors: {
              message: 'Unauthorized',
            },
          },
        },
      },
    },
    '500': {
      description: 'Validation or other error',
    },
  },
};
