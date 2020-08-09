export const putSwitchPollEventStatus = {
  tags: ['Admin'],
  description: 'Switch Poll Event Status',
  summary: '[AUTH: ADMIN]',
  parameters: [
    {
      in: 'path',
      name: 'eventId',
      schema: {
        type: 'string',
      },
      description: 'Event Id',
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
