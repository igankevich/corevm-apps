<template>
    <component :is="tag" class="card" :class="{ 'card--disabled': isDisabled }" v-bind="linkAttrs">
        <div class="card__top">
            <span class="card__index">{{ paddedIndex }}</span>
            <span class="card__status" :class="`card__status--${demo.status}`">
                <span class="card__status-dot" aria-hidden="true"></span>
                {{ statusLabel }}
            </span>
        </div>

        <h2 class="card__title">{{ demo.name }}</h2>
        <p class="card__description">{{ demo.description }}</p>

        <div class="card__bottom">
            <ul v-if="demo.tags && demo.tags.length" class="card__tags" aria-label="Tags">
                <li v-for="tag in demo.tags" :key="tag" class="card__tag">{{ tag }}</li>
            </ul>
            <span class="card__cta" aria-hidden="true">
                {{ isDisabled ? 'soon' : 'open' }}
                <span v-if="!isDisabled" class="card__arrow">→</span>
            </span>
        </div>
    </component>
</template>

<script>
const STATUS_LABELS = { live: 'Live', beta: 'Beta', soon: 'Coming soon' };

export default {
    name: 'DemoCard',
    props: { demo: { type: Object, required: true }, index: { type: Number, required: true } },
    computed: {
        isDisabled() {
            return this.demo.status === 'soon' || !this.demo.url;
        },
        tag() {
            return this.isDisabled ? 'div' : 'a';
        },
        linkAttrs() {
            if (this.isDisabled) {
                return { 'aria-disabled': 'true' };
            }
            return { href: this.demo.url, rel: 'noopener' };
        },
        statusLabel() {
            return STATUS_LABELS[this.demo.status] || STATUS_LABELS.live;
        },
        paddedIndex() {
            return String(this.index).padStart(2, '0');
        },
    },
};
</script>

<style scoped>
.card {
    --glow: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
    padding: 1.35rem 1.4rem 1.25rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    transition:
        border-color 0.2s ease,
        background 0.2s ease,
        transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1),
        box-shadow 0.25s ease;
    overflow: hidden;
}

/* Soft glow that appears on hover. */
.card::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: radial-gradient(28rem 12rem at 0% 0%, rgba(79, 240, 224, 0.16), transparent 60%);
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
}

/* Thin top highlight. */
.card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
    opacity: 0.6;
    pointer-events: none;
}

.card:not(.card--disabled):hover,
.card:not(.card--disabled):focus-visible {
    border-color: var(--border-hover);
    background: var(--surface-hover);
    transform: translateY(-3px);
    box-shadow:
        0 20px 40px -20px rgba(79, 240, 224, 0.35),
        0 0 0 1px rgba(79, 240, 224, 0.15);
}

.card:not(.card--disabled):hover::before,
.card:not(.card--disabled):focus-visible::before {
    opacity: 1;
}

.card--disabled {
    cursor: default;
    opacity: 0.6;
}

.card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--fg-dim);
}

.card__status {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}

.card__status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
}

.card__status--live {
    color: var(--accent);
}

.card__status--beta {
    color: var(--accent-2);
}

.card__status--soon {
    color: var(--warn);
}

.card__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--fg);
}

.card__description {
    margin: 0;
    flex: 1;
    font-size: 0.93rem;
    color: var(--fg-muted);
}

.card__bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 0.5rem;
}

.card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.card__tag {
    padding: 0.15rem 0.55rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
}

.card__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--accent);
}

.card--disabled .card__cta {
    color: var(--fg-dim);
}

.card__arrow {
    display: inline-block;
    transition: transform 0.2s ease;
}

.card:not(.card--disabled):hover .card__arrow,
.card:not(.card--disabled):focus-visible .card__arrow {
    transform: translateX(4px);
}
</style>
