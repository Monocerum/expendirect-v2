export default function PageHero({ title, subtitle, action }) {
    return (
        <section className="hero">
            <h1 key={title}>{title}</h1>
            <p key={`${title}-subtitle`} className="script">
                {subtitle}
            </p>
            {action}
        </section>
    )
}
