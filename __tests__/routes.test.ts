import request from 'supertest';
import app from '../index'; // Votre fichier principal d'application Express

describe('Test des routes', () => {
  jest.setTimeout(10000);

  test('devrait renvoyer tous les produits', async () => {
    const response = await request(app).get('/produits');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        nomProduit: 'sac',
        nomClient: 'Elkacem',
        prix: 45,
      },
    ]);
  });
});
