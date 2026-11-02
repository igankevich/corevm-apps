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
        id: 'monitor',
        name: 'CoreVM Monitor',
        description:
            'Watch a CoreVM service execute in real time: frames, audio, input and per-block statistics.',
        url: 'monitor/',
        tags: ['monitor', 'stats'],
        status: 'live',
    },
    {
        id: 'quake',
        name: 'Quake',
        description:
            'The classic id Software engine compiled for RISC-V and running inside CoreVM on-chain.',
        url: 'quake/',
        tags: ['game', 'c'],
        status: 'live',
    },
    {
        id: 'busybox',
        name: 'BusyBox Shell',
        description:
            'An interactive BusyBox userland running on the CoreVM musl port, with a terminal in the browser.',
        url: 'busybox/',
        tags: ['shell', 'musl'],
        status: 'beta',
    },
    {
        id: 'hello',
        name: 'Hello, CoreVM',
        description:
            'Minimal C, C++ and Rust programs built with the CoreVM SDK. The smallest possible on-chain app.',
        url: 'hello/',
        tags: ['c', 'c++', 'rust'],
        status: 'soon',
    },
];
