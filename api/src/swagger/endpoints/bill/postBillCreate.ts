export const postBillCreate = {
  tags: ['Bill'],
  summary: '[AUTH]',
  description: 'Create Bill Invoice',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {},
        },
        example: {
          payType: 'Obmenka',
          amount: '100',
          currency: 'RUR',
        },
      },
    },
  },
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
