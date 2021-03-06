export const getRatingList = {
  tags: ['Poll'],
  summary: '[PUBLIC]',
  description: 'Get Rating List (Data sorted by voiceCount)',
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
    {
      in: 'query',
      name: 'id',
      schema: {
        type: 'string',
      },
      description: 'Poll/Event ID',
    },
  ],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            data: [
              {
                id: '89efe94e-11db-44bb-aceb-4376b0c98986',
                userId: 'da25ca78-e2ae-4b3d-bff0-2668747d8f89',
                eventId: '54e62bfb-b6af-49a1-85c6-d8f0a59ba3f9',
                songSinger: 'Сплин',
                songName: 'Сплин - Андрей',
                coverSinger: 'Путин',
                voiceCount: 1,
                additionalTextInfo: 'Многие не думают',
                youtubeVideoId: null,
                createdAt: '2020-07-08T10:33:15.540Z',
                updatedAt: '2020-07-08T10:33:15.540Z',
              },
              {
                id: 'f188b768-ebc7-463c-b964-2b82b5a59995',
                userId: 'da25ca78-e2ae-4b3d-bff0-2668747d8f89',
                eventId: '54e62bfb-b6af-49a1-85c6-d8f0a59ba3f9',
                songSinger: 'Сплин',
                songName: 'Привет Андрей',
                coverSinger: 'Путин',
                voiceCount: 1,
                additionalTextInfo: 'Многие думают',
                youtubeVideoId: null,
                createdAt: '2020-07-08T10:33:17.120Z',
                updatedAt: '2020-07-08T10:33:17.120Z',
              },
            ],
            count: 4,
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
