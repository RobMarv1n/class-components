import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/:id', (request) => {
    const { id } = request.params;
    console.log('MSW intercepted:', id);
    if (id === '1') {
      return HttpResponse.json({
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: { name: 'Earth' },
        location: { name: 'Citadel of Ricks' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      });
    }

    if (id === '999') {
      return HttpResponse.json(
        { message: 'Character not found' },
        { status: 404 }
      );
    }

    if (id === '500') {
      return HttpResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }

    return HttpResponse.json(
      { message: 'Character not found' },
      { status: 404 }
    );
  }),
];
