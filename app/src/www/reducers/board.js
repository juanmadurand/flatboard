const initialState = {
  left: [
    {
      title: 'Youtube search!',
      comp: 'Youtube',
    },
  ],
  right: [
    {
      title: 'Xkcd for everyone',
      comp: 'Xkcd',
    },
    {
      title: 'Currency Converter',
      comp: 'Currency',
    },
  ],
};

export default function reducer(state = initialState, action = {}) {
  return state;
}
