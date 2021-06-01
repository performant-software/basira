// @flow

export type Routeable = {
  location: {
    pathname: string,
    state: any
  },
  history: {
    push: (route: string, state?: any) => void
  }
};
