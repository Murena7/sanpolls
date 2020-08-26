import { ResponseStatusMessage } from '../../../interfaces/response';

export const getStatusObmenka = {
  tags: ['Bill'],
  summary: '[PUBLIC]',
  description: 'Get Bill Status',
  parameters: [
    {
      in: 'query',
      name: 'invoiceId',
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            data: {},
            status: ResponseStatusMessage.Success,
          },
        },
      },
    },
  },
};
