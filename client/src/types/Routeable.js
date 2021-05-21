// @flow

export type Routeable = {
  location: {
    pathname: string
  },
  history: {
    push: (route: string, state?: any) => void
  }
};
