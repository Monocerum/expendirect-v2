export default function PageHero({ title, subtitle, action }) {
    return (
        <section className="hero">
            <h1 key={title}>{title}</h1>
            <div className="subtitle-container">
                <img class="hero-subtitle-design" src="/assets/hero-design.png" alt="Teacup with lines."/>
                <p key={`${title}-subtitle`} className="script">
                    {subtitle}
                </p>
            </div>
            {action}
        </section>
    )
}
