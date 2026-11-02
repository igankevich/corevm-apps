// Demo applications listed on the menu page.
//
// Each demo is deployed separately; `url` can be relative to this page
// (e.g. "monitor/" when both live under https://<user>.github.io/corevm-apps/)
// or absolute.
//
// Fields:
//   id          unique slug, used as the list key
//   name        display name
//   description one or two sentences shown on the card
//   url         where the demo lives
//   tags        short labels shown on the card
//   status      "live" | "beta" | "soon"  (controls the badge; "soon" disables the link)

export default [
    {
        id: 'corevm-monitor',
        name: 'CoreVM Monitor',
        description:
            'Watch a CoreVM service execute in real time: frames, audio, input and per-block statistics.',
        url: 'corevm-monitor/',
        tags: ['monitor', 'stats'],
        status: 'live',
    },
    {
        id: 'jam-radio',
        name: 'JAM radio',
        description: 'Live audio stream with donations from the viewers.',
        url: 'jam-radio/',
        tags: [],
        status: 'soon',
    },
];
