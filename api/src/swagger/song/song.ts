export const getSongById = {
  tags: ['Song'],
  summary: '[PUBLIC]',
  description: 'Get Single Song Info By ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      schema: {
        type: 'string',
      },
      description: 'Song ID',
    },
  ],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            data: {
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
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};

export const postAddSong = {
  tags: ['Song'],
  summary: '[AUTH]',
  description: 'Add song to poll/event',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            eventId: {
              type: 'string',
            },
            songSinger: {
              type: 'string',
            },
            songName: {
              type: 'string',
            },
            coverSinger: {
              type: 'string',
            },
            voiceCount: {
              type: 'number',
            },
            additionalTextInfo: {
              type: 'string',
            },
            youtubeVideoId: {
              type: 'string',
            },
          },
        },
        example: {
          eventId: '54e62bfb-b6af-49a1-85c6-d8f0a59ba3f9',
          songSinger: 'Сплин',
          songName: 'Привет Андрей',
          coverSinger: 'Путин',
          voiceCount: 1,
          additionalTextInfo: 'Многие думают',
          youtubeVideoId: '',
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
