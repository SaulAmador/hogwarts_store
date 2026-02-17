import { useEffect, useState } from "react";
import { getMyProfile } from "../services/authService";

export default function Profile() {
    const [wizard, setWizard] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getMyProfile();
                setWizard(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    if (!wizard) return <p>Cargando identidad mágica...</p>;

    return (
        <main className="page profile">
            <header className="profile-header">
                <h2 className="profile-title">Identidad Mágica 🪄</h2>
                <p className="profile-subtitle">Tu registro oficial en Hogwarts Store</p>
            </header>
            <section className="profile-card">
                <div className="profile-avatar">
                    <img src="/icons/escudo.png" alt={`${wizard.house} crest`} />
                </div>
                <div className="profile-info">
                    <h3 className="profile-name">{wizard.username}</h3>
                    <p className="profile-house"><span className="label">Casa:</span> {wizard.house}</p>
                    <p className="profile-patronus"><span className="label">Patronus:</span> {wizard.patronus}</p>
                </div>
            </section>
        </main>
    );
}