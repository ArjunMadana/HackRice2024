'use client'
import React, { useState } from "react";
import { FaCog, FaList } from "react-icons/fa";

const Heading: React.FC = () => {
    const [hovered, setHovered] = useState<number | null>(null); // Track hovered button index

    return (
        <div style={styles.container} className="mr-5">
            <button
                style={hovered === 0 ? { ...styles.button, ...styles.hover } : styles.button}
                onMouseEnter={() => setHovered(0)}
                onMouseLeave={() => setHovered(null)}
            >
                <FaCog style={styles.icon} />
            </button>
            <button
                style={hovered === 1 ? { ...styles.button, ...styles.hover } : styles.button}
                onMouseEnter={() => setHovered(1)}
                onMouseLeave={() => setHovered(null)}
            >
                <FaList style={styles.icon} />
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        gap: "10px", // Adjust the gap between buttons if needed
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "15px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out", // Smooth transition for hover effects
    },
    hover: {
        transform: "scale(1.1)", // Slightly increase size on hover
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow effect
    },
    icon: {
        fontSize: "40px", // Adjust the size of the icon if needed
    },
};

export default Heading;
