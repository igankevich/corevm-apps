<template>
    <div class="app">
        <div class="app__backdrop" aria-hidden="true"></div>
        <router-view />
    </div>
</template>

<script>
export default { name: 'App' };
</script>

<style>
.app {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    isolation: isolate;
}

.app__backdrop {
    position: fixed;
    inset: 0;
    z-index: -1;
    background:
        radial-gradient(60rem 40rem at 10% -10%, rgba(79, 240, 224, 0.12), transparent 60%),
        radial-gradient(50rem 35rem at 100% 110%, rgba(170, 102, 255, 0.14), transparent 60%),
        var(--bg);
}

/* Fine grid, faded towards the edges. */
.app__backdrop::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(to right, var(--grid) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%);
}
</style>
