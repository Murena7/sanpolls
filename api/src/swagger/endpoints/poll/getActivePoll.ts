export const getActivePoll = {
  tags: ['Poll'],
  description: 'Get Active Poll',
  summary: '[PUBLIC]',
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            data: {
              id: '54e62bfb-b6af-49a1-85c6-d8f0a59ba3f9',
              name: 'Test Event',
              message: 'Test Message',
              endMessage: 'Test End Message',
              startDate: '2011-10-05T11:48:00.000Z',
              endDate: '2011-10-05T11:48:00.000Z',
              status: 'active',
              type: 'infinite',
              createdAt: '2020-07-07T21:45:53.440Z',
              updatedAt: '2020-07-07T21:45:53.440Z',
            },
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
    '500': {
      description: 'No active poll',
    },
  },
};
