const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./src/components/**/*.tsx",
        "./src/pages/**/*.tsx"
    ],
    darkMode: "class",
    theme: {
        colors: {
            black: "#000000",
            white: "#ffffff",
            blue: {
                DEFAULT: "#4C6FFF",
                dark: "#3754DB",
                light: "#7895FF",
                soft: "#E1E8FF",
                gradient: {
                    from: "#BB65FF",
                    to: "#4C6FFF"
                }
            },
            silver: {
                DEFAULT: "#E4ECF7",
                dark: "#A6B7D4",
                light: "#EBF2FA",
                gradient: {
                    from: "#F1F1F5",
                    to: "#E4ECF7"
                }
            },
            green: {
                DEFAULT: "#66CB9F",
                dark: "#4AAE8C",
                light: "#8CDFB3",
                soft: "#DEFFEE",
                gradient: {
                    from: "#67E9F1",
                    to: "#24E795"
                }
            },
            orange: {
                DEFAULT: "#F7936F",
                dark: "#D46A51",
                light: "#FAB592",
                soft: "#FFEDE3",
                gradient: {
                    from: "#FFEF5E",
                    to: "#F7936F"
                }
            },
            red: {
                DEFAULT: "#F16063",
                dark: "#CF4655",
                light: "#F68E87",
                soft: "#FFE6E4",
                gradient: {
                    from: "#FFC656",
                    to: "#F16063"
                }
            },
            cyan: {
                DEFAULT: "#68DBF2",
                dark: "#4CAFD0",
                light: "#8DEDF7",
                soft: "#E5FDFF",
                gradient: {
                    from: "#68DBF2",
                    to: "#509CF5"
                }
            },
            dark: {
                DEFAULT: "#16192C",
                dark: "#101225",
                light: "#505780",
                gradient: {
                    from: "#29272E",
                    to: "#27272E"
                }
            },
            grey: {
                75: "#FAFAFA",
                100: "#F7FAFC",
                200: "#EDF2F7",
                300: "#E2E8F0",
                400: "#CBD5E0",
                500: "#A0AEC0",
                600: "#718096",
                700: "#4A5568",
                800: "#2D3748",
                900: "#1A202C"
            },
            txt: {
                heading: {
                    DEFAULT: "#27272E",
                    light: "#FFFFFF"
                },
                body: {
                    DEFAULT: "#425466",
                    muted: "#7A7A9D",
                    lightmuted: "#8492A6",
                    light: "#F2F2F2"
                }
            },
            bg: {
                DEFAULT: "#FFFFFF",
                light: "#F7FAFC",
                grey: "#D5D5DC",
                dark: "#17171B"
            },
            border: {
                DEFAULT: "#EDF2F7",
                dark: "#16192C"
            },
            input: {
                border: "#E7E7E7",
                placeholder: "#B5B5BD",
                txt: "#494949"
            }
        },
        fontSize: {
            "8xl": "80px",
            "7xl": "72px",
            "6xl": "64px",
            "5xl": "56px",
            "4xl": "48px",
            "3xl": "40px",
            "2xl": "36px",
            "xl": "28px",
            "2lg": "24px",
            "lg": "20px",
            "md": "18px",
            "sm": "16px",
            "xs": "14px",
            "2xs": "12px",
            "3xs": "11px",
            "4xs": "10px",
        },
        fontWeight: {
            "light": 300,
            "normal": 400,
            "medium": 500,
            "semibold": 600,
            "bold": 700,
        },
        borderRadius: {
            "none": "0px",
            "xs": "2px",
            "sm": "4px",
            "md": "6px",
            "lg": "8px",
            "2lg": "10px",
            "xl": "12px",
            "2xl": "16px",
            "full": "999px",
        },
        extend: {
            inset: {
                "1/12": "8.33%",
                "2/12": "16.66%",
                "3/12": "25%",
                "4/12": "33.33%",
                "5/12": "41.66%",
                "6/12": "50%",
                "7/12": "58.33%",
                "8/12": "66.66%",
                "9/12": "75%",
                "10/12": "83.33%",
                "11/12": "91.66%",
            },
            width: {
                "0.75": "0.1875rem",
                "1/10": "10%",
                "2/10": "20%",
                "3/10": "30%",
                "4/10": "40%",
                "5/10": "50%",
                "6/10": "60%",
                "7/10": "70%",
                "8/10": "80%",
                "9/10": "90%",
                "1/8": "12.5%",
                "2/8": "25%",
                "3/8": "37.5%",
                "4/8": "50%",
                "5/8": "65.5%",
                "6/8": "75%",
                "7/8": "87.5%"
            },
            screens: {
                "3xl": "1766px"
            },
            boxShadow: {
                "card": "0 0 1px rgba(12, 26, 75, 0.24), 0 3px 8px -1px rgba(50, 50, 71, 0.05)"
            },
            animation: {
                fadeIn: "fadeIn 0.1s ease-in-out",
                fadeOut: "fadeOut 0.1s ease-in-out",
                backProgress: "backProgress 10s linear 1",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            },
            keyframes: {
                fadeIn: {
                    "0%": {opacity: 0},
                    "100%": {opacity: 1},
                },
                fadeOut: {
                    "0%": {opacity: 1},
                    "100%": {opacity: 0},
                },
                backProgress: {
                    "0%": {width: "100%"},
                    "100%": {width: "0%"},
                },
                pulse: {
                    "0%": {opacity: 1},
                    "50%": {opacity: 0.7},
                    "100%": {opacity: 1}
                }
            },
            transitionProperty: {
                "width": "width"
            },
            cursor: {
                "grab": "grab"
            }
        },
    },
    variants: {
        extend: {
            backgroundColor: ["active", "disabled"],
            backgroundOpacity: ["active", "disabled"],
            textColor: ["disabled"],
            cursor: ["disabled"],
            opacity: ["disabled"],
            borderColor: ["disabled"],
            borderOpacity: ["disabled"]
        },
    },
    plugins: [
        plugin(({addVariant, e, postcss}) => {
            addVariant("firefox", ({container, separator}) => {
                const isFirefoxRule = postcss.atRule({
                    name: "-moz-document",
                    params: "url-prefix()",
                });
                isFirefoxRule.append(container.nodes);
                container.append(isFirefoxRule);
                isFirefoxRule.walkRules((rule) => {
                    rule.selector = `.${e(
                        `firefox${separator}${rule.selector.slice(1)}`
                    )}`;
                });
            });
        })
    ],
};
