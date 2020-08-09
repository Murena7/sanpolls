export const postSongLike = {
  tags: ['Song'],
  summary: '[AUTH]',
  description: 'Like song by id',
  parameters: [
    {
      in: 'path',
      name: 'songId',
      schema: {
        type: 'string',
      },
      description: 'Song Id',
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            likeId: {
              type: 'string',
            },
            likeStatus: {
              type: 'number',
            },
          },
        },
        example: {
          likeId: '54e62bfb-b6af-49a1-85c6-d8f0a59ba3f9',
          likeStatus: 1,
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
