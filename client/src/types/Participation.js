// @flow

export type Participation = {
  id: number,
  person_id: number,
  participateable_id: number,
  participateable_type: string,
  role: string,
  subrole: string,
  description: string,
  certainty: string,
  notes: string
};
