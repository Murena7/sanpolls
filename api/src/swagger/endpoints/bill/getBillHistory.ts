export const getBillHistoryByUser = {
  tags: ['Bill'],
  summary: '[AUTH]',
  description: 'Get Bill History By User',
  parameters: [],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            data: {},
          },
        },
      },
    },
  },
};
