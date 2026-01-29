export default function Profile() {
    const wizard = {
        name: "Harry Potter",
        house: "Gryffindor",
        wand: "Madera de acebo, nucleo de pluma de fenix, 11",
        patronus: "Ciervo",
        image: "/images/harry.jpg"
    };

    return (
        <main className="page profile">
            <header className="profile-header">
                <h2 className="profile-title">Identidad Magica 🪄</h2>
                <p className="profile-subtitle">Tu registro oficial en Hogwarts Store</p>
            </header>

            <section className="profile-card">
                <div className="profile-avatar" aria-label="Escudo de casa">
                    {/* Imagen de la casa */}
                    <img src="/icons/escudo.png" alt={`${wizard.house} crest`} />
                </div>

                <div className="profile-info">
                    <h3 className="profile-name">{wizard.name}</h3>
                    <p className="profile-house">
                        <span className="label">Casa:</span>{wizard.house}
                    </p>
                    <p className="profile-wand">
                        <span className="label">Varita:</span>{wizard.wand}
                    </p>

                </div>
            </section>
        </main>
    )
}