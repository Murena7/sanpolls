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
              id: 'f325af9d-9a58-40af-8e80-bd9e1ac348e3',
              userId: '5f655f24-1015-42bf-b56f-00c660b563bd',
              eventId: '42532007-fe14-4a29-8658-83a633e6e775',
              songSinger: 'Сплин',
              songName: 'Привет Андрей',
              coverSinger: 'Путин',
              voiceCount: 300,
              additionalTextInfo: 'Многие думают',
              youtubeVideoId: null,
              createdAt: '2020-07-26T17:01:29.108Z',
              updatedAt: '2020-07-26T17:01:29.108Z',
              user: {
                username: 'user5081611',
              },
              ratingPosition: 2,
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
