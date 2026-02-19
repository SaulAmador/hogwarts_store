import { useEffect, useState } from "react";
import { getMyProfile } from "../services/authService";

export default function Profile() {
    const [wizard, setWizard] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ username: "", house: "", patronus: "" });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getMyProfile();
                setWizard(data);
                setEditData({ username: data.username, house: data.house, patronus: data.patronus });
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            await updateProfile(editData);
            setWizard({ ...wizard, ...editData });
            setIsEditing(false);
            alert("¡Perfil actualizado con éxito! ✨");
        } catch (error) {
            alert("Error al actualizar: " + error);
        }
    };

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
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editData.username}
                                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                                className="edit-input"
                            />
                            <select
                                value={editData.house}
                                onChange={(e) => setEditData({ ...editData, house: e.target.value })}
                                className="edit-input"
                            >
                                <option value="gryffindor">Gryffindor</option>
                                <option value="hufflepuff">Hufflepuff</option>
                                <option value="slytherin">Slytherin</option>
                                <option value="ravenclaw">Ravenclaw</option>
                            </select>
                            <input
                                type="text"
                                value={editData.patronus}
                                onChange={(e) => setEditData({ ...editData, patronus: e.target.value })}
                                className="edit-input"
                            />
                            <button onClick={handleSave} className="product-btn" style={{ marginTop: '10px' }}>Guardar Cambios</button>
                            <button onClick={() => setIsEditing(false)} className="product-btn" style={{ marginTop: '10px', marginLeft: '5px', backgroundColor: '#666' }}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <h3 className="profile-name">{wizard.username}</h3>
                            <p className="profile-house"><span className="label">Casa:</span> {wizard.house}</p>
                            <p className="profile-patronus"><span className="label">Patronus:</span> {wizard.patronus}</p>
                            <button onClick={() => setIsEditing(true)} className="product-btn" style={{ marginTop: '10px' }}>Editar Perfil</button>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}