<template>
    <main class="page">
        <header class="hero">
            <p class="hero__eyebrow">
                <span class="hero__dot" aria-hidden="true"></span>
                CoreVM
            </p>
            <h1 class="hero__title">Demo applications</h1>
            <p class="hero__lead">
                Real programs compiled to RISC-V and executed on-chain inside CoreVM. Pick one below
                to open it.
            </p>
            <p class="hero__meta">
                <span class="hero__count">{{ liveCount }}</span>
                {{ liveCount === 1 ? 'demo' : 'demos' }} online
                <template v-if="upcomingCount">
                    <span class="hero__sep" aria-hidden="true">/</span>
                    {{ upcomingCount }} coming soon
                </template>
            </p>
        </header>

        <section class="demos" aria-label="Demo applications">
            <ol class="demos__list">
                <li
                    v-for="(demo, index) in demos"
                    :key="demo.id"
                    class="demos__item"
                    :style="{ '--i': index }"
                >
                    <DemoCard :demo="demo" :index="index + 1" />
                </li>
            </ol>
        </section>

        <footer class="footer">
            <span class="footer__brand">corevm-apps</span>
            <span class="footer__sep" aria-hidden="true">·</span>
            <a
                class="footer__link"
                href="https://github.com/igankevich/corevm-apps"
                target="_blank"
                rel="noopener"
            >
                source
            </a>
        </footer>
    </main>
</template>

<script>
import DemoCard from '../components/DemoCard.vue';
import demos from '../demos.js';

export default {
    name: 'DemosView',
    components: { DemoCard },
    data() {
        return { demos };
    },
    computed: {
        liveCount() {
            return this.demos.filter((d) => d.status !== 'soon').length;
        },
        upcomingCount() {
            return this.demos.filter((d) => d.status === 'soon').length;
        },
    },
};
</script>

<style scoped>
.page {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: clamp(2.5rem, 7vw, 6rem) 1rem 3rem;
}

/* Hero */

.hero {
    margin-bottom: clamp(2rem, 5vw, 3.5rem);
}

.hero__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0 0 1rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
}

.hero__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 0 rgba(79, 240, 224, 0.6);
    animation: pulse 2.4s ease-out infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(79, 240, 224, 0.6);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(79, 240, 224, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(79, 240, 224, 0);
    }
}

.hero__title {
    margin: 0 0 1rem;
    font-size: clamp(2.2rem, 6vw, 3.8rem);
    font-weight: 650;
    line-height: 1.05;
    letter-spacing: -0.03em;
    background: linear-gradient(100deg, #ffffff 0%, var(--fg) 45%, var(--accent) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.hero__lead {
    max-width: 38rem;
    margin: 0 0 1.25rem;
    font-size: clamp(1rem, 1.6vw, 1.15rem);
    color: var(--fg-muted);
}

.hero__meta {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--fg-dim);
}

.hero__count {
    color: var(--fg);
}

.hero__sep {
    margin: 0 0.6rem;
}

/* Demo grid */

.demos__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr));
}

.demos__item {
    animation: rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
    animation-delay: calc(var(--i) * 70ms);
}

@keyframes rise {
    from {
        opacity: 0;
        transform: translateY(12px);
    }
    to {
        opacity: 1;
        transform: none;
    }
}

/* Footer */

.footer {
    margin-top: clamp(3rem, 8vw, 6rem);
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--fg-dim);
}

.footer__sep {
    margin: 0 0.6rem;
}

.footer__link {
    color: var(--fg-muted);
    transition: color 0.15s ease;
}

.footer__link:hover {
    color: var(--accent);
}
</style>
