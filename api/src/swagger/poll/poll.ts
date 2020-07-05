export const getActivePoll = {
  tags: ['Poll'],
  description: 'Get Active Poll',
  parameters: [
    {
      in: 'query',
      name: 'take',
      schema: {
        type: 'integer',
      },
      default: 50,
      description: 'result count',
    },
    {
      in: 'query',
      name: 'skip',
      schema: {
        type: 'integer',
      },
      default: 0,
      description: 'result skip',
    },
  ],
  responses: {
    '200': {
      description: 'Data',
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
