// @flow

export type Document = {
  id: number,
  visual_context_id: number,
  artwork_id: number,
  name: string,
  notes: string,
  number_sewing_supports: number,
  number_fastenings: number,
  location_of_fastenings: string,
  inscriptions_on_binding: boolean,
  inscription_text: any,
  endband_present: boolean,
  uncut_fore_edges: boolean,
  fore_edge_text: string,
  bookmarks_registers: number,
  text_columns: number,
  ruling: boolean,
  rubrication: boolean,
  identity: string,
  transcription: string,
  transcription_expanded: string,
  transcription_translation: string,
  created_by_id: number
};
