
const TextModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.over}>
            <div style={styles.mod}>
                <div style={styles.quit_container}>
                    <button style={styles.close} onClick={onClose}>Fermer</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default TextModal

const styles = {
    over: {
        position: 'fixed',
        zIndex:2,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mod: {
        backgroundColor: 'white',
        width: "600px",
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    close : {
        padding: "5px 10px",
        position: "relative",
        right: 0,
        backgroundColor: "red",
        borderRadius: "5px",
        fontFamily: 'Poppins',
        color:"white",
        border: "none",
        cursor : "pointer",
    },
    quit_container :{
        display: "flex",
        justifyContent: "end",
    }
};
