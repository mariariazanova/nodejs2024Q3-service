import { DataBase } from '../interfaces/data-base';

const dataBase: DataBase = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favs: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

export default dataBase;
