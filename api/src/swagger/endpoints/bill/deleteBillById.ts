import { ResponseStatusMessage } from '../../../interfaces/response';

export const deleteBillById = {
  tags: ['Bill'],
  summary: '[AUTH]',
  description: 'Delete Bill By Id',
  parameters: [
    {
      in: 'path',
      name: 'billId',
      schema: {
        type: 'string',
      },
      description: 'billId Id',
    },
  ],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            status: ResponseStatusMessage.Success,
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
