// @flow

export type Place = {
  id: number,
  name: string,
  place_type: string,
  lat: number,
  long: number,
  city: string,
  state: string,
  country: string,
  url: string,
  database_value: string,
  notes: string,
  same_as: number,
  part_of: number,
  authorized_vocabulary_url,

  locations: Array<Location>
};
