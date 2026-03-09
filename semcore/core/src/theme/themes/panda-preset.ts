
    import { definePreset } from '@pandacss/dev';

    export default definePreset({
      name: '@semcore/panda-preset',
      theme: {
        tokens: {
    "colors": {
        "gray": {
            "50": {
                "value": "#f4f5f9",
                "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
            },
            "100": {
                "value": "#e0e1e9",
                "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
            },
            "200": {
                "value": "#c4c7cf"
            },
            "300": {
                "value": "#a9abb6"
            },
            "400": {
                "value": "#8a8e9b"
            },
            "500": {
                "value": "#6c6e79"
            },
            "600": {
                "value": "#484a54"
            },
            "700": {
                "value": "#2b2e38"
            },
            "800": {
                "value": "#191b23"
            },
            "white": {
                "value": "#ffffff"
            }
        },
        "blue": {
            "50": {
                "value": "#e9f7ff",
                "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
            },
            "100": {
                "value": "#c4e5fe",
                "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
            },
            "200": {
                "value": "#8ecdff"
            },
            "300": {
                "value": "#2bb3ff"
            },
            "400": {
                "value": "#008ff8"
            },
            "500": {
                "value": "#006dca"
            },
            "600": {
                "value": "#044792"
            },
            "700": {
                "value": "#002b5f"
            },
            "800": {
                "value": "#001b3d"
            }
        },
        "green": {
            "50": {
                "value": "#dbfee8",
                "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
            },
            "100": {
                "value": "#9ef2c9",
                "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
            },
            "200": {
                "value": "#59ddaa"
            },
            "300": {
                "value": "#00c192"
            },
            "400": {
                "value": "#009f81"
            },
            "500": {
                "value": "#007c65"
            },
            "600": {
                "value": "#055345"
            },
            "700": {
                "value": "#00342d"
            },
            "800": {
                "value": "#00201e"
            }
        },
        "red": {
            "50": {
                "value": "#fff0f7",
                "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
            },
            "100": {
                "value": "#ffd7df",
                "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
            },
            "200": {
                "value": "#ffaeb5"
            },
            "300": {
                "value": "#ff8786"
            },
            "400": {
                "value": "#ff4953"
            },
            "500": {
                "value": "#d1002f"
            },
            "600": {
                "value": "#8e0016"
            },
            "700": {
                "value": "#58000a"
            },
            "800": {
                "value": "#410101"
            }
        },
        "orange": {
            "50": {
                "value": "#fff3d9",
                "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
            },
            "100": {
                "value": "#ffdca2",
                "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
            },
            "200": {
                "value": "#ffb26e"
            },
            "300": {
                "value": "#ff8c43"
            },
            "400": {
                "value": "#ff642d"
            },
            "500": {
                "value": "#c33909"
            },
            "600": {
                "value": "#8b1500"
            },
            "700": {
                "value": "#551200"
            },
            "800": {
                "value": "#351000"
            }
        },
        "yellow": {
            "50": {
                "value": "#fdf7c8",
                "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
            },
            "100": {
                "value": "#fce081",
                "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
            },
            "200": {
                "value": "#fdc23c"
            },
            "300": {
                "value": "#ef9800"
            },
            "400": {
                "value": "#d87900"
            },
            "500": {
                "value": "#a75800"
            },
            "600": {
                "value": "#743a00"
            },
            "700": {
                "value": "#462500"
            },
            "800": {
                "value": "#2c1600"
            }
        },
        "violet": {
            "50": {
                "value": "#f9f2ff",
                "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
            },
            "100": {
                "value": "#edd9ff",
                "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
            },
            "200": {
                "value": "#dcb8ff"
            },
            "300": {
                "value": "#c695ff"
            },
            "400": {
                "value": "#ab6cfe"
            },
            "500": {
                "value": "#8649e1"
            },
            "600": {
                "value": "#5925ab"
            },
            "700": {
                "value": "#421983"
            },
            "800": {
                "value": "#220358"
            },
            "dusty": {
                "50": {
                    "value": "#F5F4FF",
                    "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
                },
                "100": {
                    "value": "#E2DDFF",
                    "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
                },
                "200": {
                    "value": "#BCB1E9"
                },
                "300": {
                    "value": "#A79CD6"
                },
                "400": {
                    "value": "#9083C5"
                },
                "500": {
                    "value": "#6D619F"
                },
                "600": {
                    "value": "#4D407E"
                },
                "700": {
                    "value": "#382E5E"
                },
                "800": {
                    "value": "#1D113E"
                }
            }
        },
        "pink": {
            "50": {
                "value": "#fff0ff",
                "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
            },
            "100": {
                "value": "#ffd3ff",
                "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
            },
            "200": {
                "value": "#ffa9fa"
            },
            "300": {
                "value": "#f67cf2"
            },
            "400": {
                "value": "#e14adf"
            },
            "500": {
                "value": "#b229b9"
            },
            "600": {
                "value": "#7d0480"
            },
            "700": {
                "value": "#4d0050"
            },
            "800": {
                "value": "#340439"
            }
        },
        "salad": {
            "50": {
                "value": "#ecfbcd",
                "description": "Only suitable for backgrounds. Can be completely invisible to users with low-contrast monitor or poor vision."
            },
            "100": {
                "value": "#c7ee96",
                "description": "Use only for light strokes and active backgrounds. Suitable for minimally visible elements."
            },
            "200": {
                "value": "#9bd85d"
            },
            "300": {
                "value": "#66c030"
            },
            "400": {
                "value": "#35a21e"
            },
            "500": {
                "value": "#0a7e22"
            },
            "600": {
                "value": "#005613"
            },
            "700": {
                "value": "#003509"
            },
            "800": {
                "value": "#002203"
            }
        }
    },
    "fonts": {
        "base": {
            "value": "Inter",
            "description": "Base font family."
        }
    },
    "fontSizes": {
        "fs": {
            "50": {
                "value": "10px",
                "description": "Use only for text in Badge component."
            },
            "100": {
                "value": "12px",
                "description": "Use this font-size with caution for text in some additional messages. Always check its contrast and readability."
            },
            "200": {
                "value": "14px"
            },
            "300": {
                "value": "16px"
            },
            "400": {
                "value": "20px"
            },
            "500": {
                "value": "24px"
            },
            "600": {
                "value": "32px"
            },
            "700": {
                "value": "36px"
            },
            "800": {
                "value": "48px"
            }
        }
    },
    "lineHeights": {
        "lh": {
            "100": {
                "value": "133%",
                "description": "Use with font-size-100."
            },
            "200": {
                "value": "142%",
                "description": "Use with font-size-200."
            },
            "300": {
                "value": "150%",
                "description": "Use with font-size-300."
            },
            "400": {
                "value": "120%",
                "description": "Use with font-size-400."
            },
            "500": {
                "value": "117%",
                "description": "Use with font-size-500."
            },
            "600": {
                "value": "125%",
                "description": "Use with font-size-600."
            },
            "700": {
                "value": "110%",
                "description": "Use with font-size-700."
            },
            "800": {
                "value": "117%",
                "description": "Use with font-size-800."
            }
        }
    },
    "fontWeights": {
        "semi": {
            "bold": {
                "value": "600",
                "description": "Semi-bold font weight."
            }
        },
        "bold": {
            "value": "700",
            "description": "Bold font weight."
        },
        "regular": {
            "value": "400",
            "description": "Regular font weight."
        },
        "medium": {
            "value": "500",
            "description": "Medium font weight."
        }
    },
    "letterSpacings": {
        "compact": {
            "value": "0.3",
            "description": "Compact letter spacing."
        }
    },
    "spacing": {
        "scale": {
            "indent": {
                "value": "4px",
                "description": "Base denominator of the design system."
            }
        },
        "spacing": {
            "05x": {
                "value": "2px",
                "description": "2px"
            },
            "1x": {
                "value": "4px",
                "description": "4px"
            },
            "2x": {
                "value": "8px",
                "description": "8px"
            },
            "3x": {
                "value": "12px",
                "description": "12px"
            },
            "4x": {
                "value": "16px",
                "description": "16px"
            },
            "5x": {
                "value": "20px",
                "description": "20px"
            },
            "6x": {
                "value": "24px",
                "description": "24px"
            },
            "8x": {
                "value": "32px",
                "description": "32px"
            },
            "10x": {
                "value": "40px",
                "description": "40px"
            },
            "14x": {
                "value": "56px",
                "description": "56px"
            },
            "20x": {
                "value": "80px",
                "description": "80px"
            },
            "24x": {
                "value": "96px",
                "description": "96px"
            },
            "30x": {
                "value": "120px",
                "description": "120px"
            }
        }
    },
    "radii": {
        "rounded": {
            "extra": {
                "small": {
                    "value": "2px"
                },
                "large": {
                    "value": "24px"
                }
            },
            "small": {
                "value": "4px"
            },
            "medium": {
                "value": "6px"
            },
            "large": {
                "value": "12px"
            }
        }
    },
    "sizes": {
        "screen": {
            "extra": {
                "small": {
                    "value": "320px",
                    "description": "Extra small screens (small phones)."
                }
            },
            "small": {
                "value": "768px",
                "description": "Small screens (phones and small tablets)."
            },
            "medium": {
                "value": "1200px",
                "description": "Medium screens (tablets and small laptops)."
            },
            "large": {
                "value": "1920px",
                "description": "Large screens (tablets and laptops)."
            }
        }
    },
    "zIndex": {
        "deep": {
            "value": "-999"
        },
        "overlay": {
            "value": "500"
        },
        "modal": {
            "value": "900"
        },
        "popper": {
            "value": "700"
        },
        "dropdown": {
            "value": "750"
        },
        "tooltip": {
            "value": "800"
        },
        "notice": {
            "bubble": {
                "value": "999"
            }
        }
    },
    "durations": {
        "extra": {
            "slow": {
                "value": "500",
                "description": "Should be used for more complex effects and larger scale animations (such as page transitions or moving objects on and offscreen)"
            },
            "fast": {
                "value": "100",
                "description": "Should be used for simpler effects and relatively small-sized animations (such as fades or color changes)"
            }
        },
        "slow": {
            "value": "400",
            "description": "Should be used for more larger scale animations (such as page transitions)"
        },
        "medium": {
            "value": "300",
            "description": "Should be used for more complex effects (such as Modal)"
        },
        "fast": {
            "value": "200",
            "description": "Should be used for more complex effects (such as Dropdown or Accordion)"
        }
    }
},
        semanticTokens: {
    "colors": {
        "bg": {
            "primary": {
                "neutral": {
                    "DEFAULT": {
                        "value": "rgba(30, 34, 49, 1)",
                        "description": "Primary background of the interface which contains the main data and information."
                    },
                    "hover": {
                        "value": "rgba(54, 56, 67, 1)",
                        "description": "Hover state of the primary background of the interface which contains the main data and information."
                    },
                    "active": {
                        "value": "rgba(54, 56, 67, 1)",
                        "description": "Active (selected) state of the primary background of the interface which contains the main data and information."
                    }
                },
                "info": {
                    "value": "#008ff8",
                    "description": "Accent background of the message with regular information."
                },
                "success": {
                    "value": "#009f81",
                    "description": "Accent background of the message or banner with information about the successful result."
                },
                "critical": {
                    "value": "#ff4953",
                    "description": "Accent background of a message or a banner with a critical information."
                },
                "warning": {
                    "value": "#ff642d",
                    "description": "Accent background of a message or a banner with a warning information."
                },
                "highlight": {
                    "value": "#fce081",
                    "description": "Accent background of the information you want to highlight."
                },
                "advertising": {
                    "value": "#421983",
                    "description": "Accent background for the advertising banners and controls."
                },
                "muted": {
                    "value": "#6c6e79",
                    "description": "Accented muted background for a message with regular information."
                },
                "invert": {
                    "DEFAULT": {
                        "value": "#191b23",
                        "description": "Inverted version of the primary background of the interface that contains the main data and information."
                    },
                    "hover": {
                        "value": "#2b2e38",
                        "description": "Hover state for the inverted version of the primary background of the interface that contains the main data and information."
                    },
                    "active": {
                        "value": "#484a54",
                        "description": "Active (selected) state for the inverted version of the primary background of the interface that contains the main data and information."
                    }
                },
                "feature": {
                    "highlight": {
                        "DEFAULT": {
                            "value": "rgba(30, 34, 49, 1)",
                            "description": "Primary background for highlighted controls."
                        },
                        "hover": {
                            "active": {
                                "value": "linear-gradient(90deg, #f9f2ff, #e9f7ff)",
                                "description": "Primary background for hover and active (selected) state of highlighted controls."
                            }
                        }
                    }
                }
            },
            "secondary": {
                "neutral": {
                    "DEFAULT": {
                        "value": "rgba(45, 48, 62, 1)",
                        "description": "Secondary background of the interface which contains the main data and information."
                    },
                    "hover": {
                        "value": "#e0e1e9",
                        "description": "Hover state of the secondary background of the interface which contains the main data and information."
                    },
                    "active": {
                        "value": "#c4c7cf",
                        "description": "Active (selected) state of the secondary background of the interface which contains the main data and information."
                    }
                },
                "info": {
                    "DEFAULT": {
                        "value": "rgba(52, 68, 90, 1)",
                        "description": "Secondary background of a message with regular information."
                    },
                    "hover": {
                        "value": "rgba(23, 55, 83, 1)",
                        "description": "Hover state of the secondary background of a message with regular information."
                    },
                    "active": {
                        "value": "#8ecdff",
                        "description": "Active (selected) state of the secondary background of a message with regular information."
                    }
                },
                "success": {
                    "DEFAULT": {
                        "value": "#dbfee8",
                        "description": "Secondary background of the message with success information you want to accent."
                    },
                    "hover": {
                        "value": "#9ef2c9",
                        "description": "Hover state of the secondary background of the message with success information you want to accent."
                    },
                    "active": {
                        "value": "#59ddaa",
                        "description": "Active (selected) state of the secondary background of the message with success information you want to accent."
                    }
                },
                "critical": {
                    "DEFAULT": {
                        "value": "#fff0f7",
                        "description": "Secondary background of the message with critical information you want to accent."
                    },
                    "hover": {
                        "value": "#ffd7df",
                        "description": "Hover state of the secondary background of the message with critical information you want to accent."
                    },
                    "active": {
                        "value": "#ffaeb5",
                        "description": "Active (selected) state of the secondary background of the message with critical information you want to accent."
                    }
                },
                "warning": {
                    "DEFAULT": {
                        "value": "#fff3d9",
                        "description": "Secondary background of the message with warning information you want to accent."
                    },
                    "hover": {
                        "value": "#ffdca2",
                        "description": "Hover state of the secondary background of the message with warning information you want to accent."
                    },
                    "active": {
                        "value": "#ffb26e",
                        "description": "Active (selected) state of the secondary background of the message with critical information you want to accent."
                    }
                },
                "highlight": {
                    "DEFAULT": {
                        "value": "#fdf7c8",
                        "description": "Secondary background of the information you want to highlight."
                    },
                    "hover": {
                        "value": "#fce081",
                        "description": "Hover state of the secondary background of the information you want to highlight."
                    },
                    "active": {
                        "value": "#fdc23c",
                        "description": "Active (selected) state of the secondary background of the information you want to highlight."
                    }
                },
                "advertising": {
                    "DEFAULT": {
                        "value": "rgba(75, 49, 125, 1)",
                        "description": "Secondary background for the advertising message you want to accent."
                    },
                    "hover": {
                        "value": "#edd9ff",
                        "description": "Hover state of the secondary background for the advertising message you want to accent."
                    },
                    "active": {
                        "value": "#dcb8ff",
                        "description": "Active (selected) state of the secondary background for the advertising message you want to accent."
                    }
                },
                "feature": {
                    "highlight": {
                        "value": "linear-gradient(90deg, #f9f2ff, #e9f7ff)",
                        "description": "Secondary background for the highlighted message."
                    }
                }
            },
            "highlight": {
                "results": {
                    "value": "rgba(239, 152, 0, 0.4)",
                    "description": "Highlighting the search results."
                },
                "focus": {
                    "value": "rgba(0, 143, 248, 0.2)",
                    "description": "Focusing values in the input."
                }
            }
        },
        "text": {
            "primary": {
                "DEFAULT": {
                    "value": "#f4f5f9",
                    "description": "Primary text."
                },
                "invert": {
                    "value": "#ffffff",
                    "description": "Inverted version of the primary text."
                }
            },
            "secondary": {
                "DEFAULT": {
                    "value": "#a9abb6",
                    "description": "Secondary text."
                },
                "invert": {
                    "value": "rgba(255, 255, 255, 0.75)",
                    "description": "Inverted version of the secondary text."
                }
            },
            "placeholder": {
                "value": "#8a8e9b",
                "description": "Placeholder text only."
            },
            "success": {
                "DEFAULT": {
                    "value": "rgba(68, 209, 164, 1)",
                    "description": "Text associated with success states and data."
                },
                "hover": {
                    "active": {
                        "value": "#055345",
                        "description": "Hover and active states for the text associated with success states and data."
                    }
                }
            },
            "critical": {
                "DEFAULT": {
                    "value": "rgba(255, 155, 148, 1)",
                    "description": "Text associated with critical states and data."
                },
                "hover": {
                    "active": {
                        "value": "#8e0016",
                        "description": "Hover and active states for the text associated with critical states and data."
                    }
                }
            },
            "link": {
                "DEFAULT": {
                    "value": "#8ecdff",
                    "description": "Link text."
                },
                "hover": {
                    "active": {
                        "value": "#2bb3ff",
                        "description": "Hover and active states for the link text."
                    }
                },
                "invert": {
                    "DEFAULT": {
                        "value": "#8ecdff",
                        "description": "Inverted version of the link text. Use on dark background only."
                    },
                    "hover": {
                        "value": "#2bb3ff",
                        "description": "Hover and active states of the inverted version of the link text. Use on dark background only."
                    }
                },
                "visited": {
                    "value": "#8649e1",
                    "description": "Visited link text."
                }
            },
            "hint": {
                "DEFAULT": {
                    "value": "#a9abb6",
                    "description": "Hint link text."
                },
                "hover": {
                    "active": {
                        "value": "#e0e1e9",
                        "description": "Hover and active states of the hint link text."
                    }
                },
                "invert": {
                    "DEFAULT": {
                        "value": "#c4c7cf",
                        "description": "Inverted version of the hint link text."
                    },
                    "hover": {
                        "active": {
                            "value": "#a9abb6",
                            "description": "Hover and active states of the inverted version of the hint link text."
                        }
                    }
                }
            },
            "large": {
                "secondary": {
                    "value": "#a9abb6",
                    "description": "Secondary text. Use with font-size ≥20px."
                },
                "info": {
                    "DEFAULT": {
                        "value": "#008ff8",
                        "description": "Link text with font-size ≥20px."
                    },
                    "hover": {
                        "active": {
                            "value": "#006dca",
                            "description": "Hover and active states of the link text with font-size ≥20px."
                        }
                    }
                },
                "success": {
                    "DEFAULT": {
                        "value": "#009f81",
                        "description": "Text with font-size ≥20px associated with success states and data."
                    },
                    "hover": {
                        "active": {
                            "value": "#007c65",
                            "description": "Hover and active states of the text with font-size ≥20px associated with success states and data."
                        }
                    }
                },
                "critical": {
                    "DEFAULT": {
                        "value": "#ff4953",
                        "description": "Text with font-size ≥20px associated with critical states and data."
                    },
                    "hover": {
                        "active": {
                            "value": "#d1002f",
                            "description": "Hover and active states of the text with font-size ≥20px associated with critical states and data."
                        }
                    }
                }
            },
            "advertising": {
                "value": "#421983",
                "description": "Advertising text."
            },
            "feature": {
                "highlight": {
                    "DEFAULT": {
                        "value": "linear-gradient(90deg, #8649e1, #006dca)",
                        "description": "Text for highlighted features."
                    },
                    "hover": {
                        "active": {
                            "value": "linear-gradient(90deg, #421983, #002b5f)",
                            "description": "Text for hover and active states of highlighted features."
                        }
                    }
                }
            }
        },
        "border": {
            "primary": {
                "DEFAULT": {
                    "value": "#484a54",
                    "description": "Neutral primary border."
                },
                "invert": {
                    "value": "#ffffff",
                    "description": "Inverted version of the neutral primary border. Use it for borders on the dark or color background."
                }
            },
            "secondary": {
                "DEFAULT": {
                    "value": "#484a54",
                    "description": "Subtle secondary border."
                },
                "invert": {
                    "value": "rgba(255, 255, 255, 0.3)",
                    "description": "Inverted version of the neutral secondary border. Use it for borders on the dark or color background."
                }
            },
            "info": {
                "DEFAULT": {
                    "value": "#8ecdff",
                    "description": "Subtle secondary border in the informational message."
                },
                "active": {
                    "value": "#c4e5fe",
                    "description": "Active border in focused input filed."
                }
            },
            "success": {
                "DEFAULT": {
                    "value": "#59ddaa",
                    "description": "Subtle secondary border in the successful message and input field."
                },
                "active": {
                    "value": "#dbfee8",
                    "description": "Active border in the focused input field with valid state."
                }
            },
            "critical": {
                "DEFAULT": {
                    "value": "#ffaeb5",
                    "description": "Subtle secondary border in the critical message and invalid input field."
                },
                "active": {
                    "value": "rgba(253, 182, 177, 1)",
                    "description": "Active border in the focused input field with invalid state, and active state of the other components with invalid state."
                }
            },
            "warning": {
                "DEFAULT": {
                    "value": "#ffb26e",
                    "description": "Subtle secondary border in the warning message."
                },
                "active": {
                    "value": "#c33909",
                    "description": "Active border in components with warning intention."
                }
            },
            "tooltip": {
                "invert": {
                    "value": "#6c6e79",
                    "description": "Border of the Tooltip with dark theme."
                }
            },
            "table": {
                "accent": {
                    "value": "#a9abb6",
                    "description": "Accent borders in the Table: for the accordion in the table and for the header of the secondary table."
                }
            },
            "date": {
                "picker": {
                    "range": {
                        "comparison": {
                            "value": "#8649e1",
                            "description": "Border color of the second period for the comparison mode in the DatePicker."
                        }
                    }
                }
            },
            "feature": {
                "highlight": {
                    "DEFAULT": {
                        "value": "linear-gradient(90deg, #c695ff, #2bb3ff)",
                        "description": "Primary border for highlighted controls."
                    },
                    "active": {
                        "value": "linear-gradient(90deg, #ab6cfe, #008ff8)",
                        "description": "Primary border for the active state of highlighted controls."
                    },
                    "secondary": {
                        "value": "linear-gradient(90deg, #dcb8ff, #8ecdff)",
                        "description": "Secondary border for highlighted controls."
                    }
                }
            }
        },
        "control": {
            "switch": {
                "bg": {
                    "value": "#a9abb6",
                    "description": "Subtle background of the Switch control."
                }
            },
            "primary": {
                "info": {
                    "DEFAULT": {
                        "value": "#008ff8",
                        "description": "Background of the regular primary control."
                    },
                    "hover": {
                        "value": "#006dca",
                        "description": "Hover state of the regular primary control."
                    },
                    "active": {
                        "value": "#044792",
                        "description": "Active (selected) state of the regular primary control."
                    }
                },
                "success": {
                    "DEFAULT": {
                        "value": "#009f81",
                        "description": "Background of the primary control with successful theme."
                    },
                    "hover": {
                        "value": "#007c65",
                        "description": "Hover state of the primary control with successful theme."
                    },
                    "active": {
                        "value": "#055345",
                        "description": "Active (selected) state of the primary control with successful theme."
                    }
                },
                "critical": {
                    "DEFAULT": {
                        "value": "#ff4953",
                        "description": "Background of the primary control with danger theme."
                    },
                    "hover": {
                        "value": "#d1002f",
                        "description": "Hover state of the primary control with danger theme."
                    },
                    "active": {
                        "value": "#8e0016",
                        "description": "Active (selected) state of the primary control with danger theme."
                    }
                },
                "brand": {
                    "DEFAULT": {
                        "value": "#ff642d",
                        "description": "Background of the primary brand colored control."
                    },
                    "hover": {
                        "value": "#c33909",
                        "description": "Hover state of the primary brand colored control."
                    },
                    "active": {
                        "value": "#c33909",
                        "description": "Active state of the primary brand colored control."
                    }
                },
                "advertising": {
                    "DEFAULT": {
                        "value": "#5925ab",
                        "description": "Background of the advertising primary control."
                    },
                    "hover": {
                        "value": "#421983",
                        "description": "Hover state of the advertising primary control."
                    },
                    "active": {
                        "value": "#8649e1",
                        "description": "Active (selected) state of the advertising primary control."
                    }
                },
                "invert": {
                    "DEFAULT": {
                        "value": "rgba(30, 34, 49, 1)",
                        "description": "Inverted background of the primary control."
                    },
                    "hover": {
                        "value": "rgba(43, 46, 57, 1)",
                        "description": "Hover state of the inverted primary control."
                    },
                    "active": {
                        "value": "rgba(43, 46, 57, 1)",
                        "description": "Active (selected) state of the inverted primary control."
                    }
                },
                "feature": {
                    "highlight": {
                        "DEFAULT": {
                            "value": "linear-gradient(90deg, #ab6cfe, #008ff8)",
                            "description": "Background of the highlighted primary control."
                        },
                        "hover": {
                            "value": "linear-gradient(90deg, #8649e1, #006dca)",
                            "description": "Hover state of the highlighted primary control."
                        },
                        "active": {
                            "value": "linear-gradient(90deg, #5925ab, #044792)",
                            "description": "Active (selected) state of the highlighted primary control."
                        }
                    }
                }
            },
            "secondary": {
                "neutral": {
                    "DEFAULT": {
                        "value": "rgba(138, 142, 155, 0.1)",
                        "description": "Background of the regular secondary control."
                    },
                    "hover": {
                        "value": "rgba(138, 142, 155, 0.2)",
                        "description": "Hover state of the regular secondary control."
                    },
                    "active": {
                        "value": "rgba(138, 142, 155, 0.3)",
                        "description": "Active (selected) state of the regular secondary control."
                    }
                },
                "info": {
                    "DEFAULT": {
                        "value": "rgba(0, 143, 248, 0.1)",
                        "description": "Background of the accent secondary control."
                    },
                    "hover": {
                        "value": "rgba(0, 143, 248, 0.2)",
                        "description": "Hover state of the accent secondary control."
                    },
                    "active": {
                        "value": "rgba(0, 143, 248, 0.3)",
                        "description": "Active (selected) state of the accent secondary control."
                    }
                },
                "invert": {
                    "DEFAULT": {
                        "value": "rgba(255, 255, 255, 0.05)",
                        "description": "Background of the inverted version of the secondary control."
                    },
                    "hover": {
                        "value": "rgba(255, 255, 255, 0.1)",
                        "description": "Hover state of the inverted version of the secondary control."
                    },
                    "active": {
                        "value": "rgba(255, 255, 255, 0.3)",
                        "description": "Active (selected) state of the inverted version of the secondary control."
                    }
                },
                "feature": {
                    "highlight": {
                        "DEFAULT": {
                            "value": "linear-gradient(90deg, #f9f2ff, #e9f7ff)",
                            "description": "Background of the highlighted secondary control."
                        },
                        "hover": {
                            "value": "linear-gradient(90deg, #f2e4ff, #d6edfe)",
                            "description": "Hover state of the highlighted secondary control."
                        },
                        "active": {
                            "value": "linear-gradient(90deg, #edd9ff, #c4e5fe)",
                            "description": "Active (selected) state of the highlighted secondary control."
                        }
                    }
                }
            },
            "tertiary": {
                "neutral": {
                    "DEFAULT": {
                        "value": "rgba(138, 142, 155, 0)",
                        "description": "Background of the regular tertiary control."
                    },
                    "hover": {
                        "value": "rgba(138, 142, 155, 0.2)",
                        "description": "Hover state of the regular tertiary control."
                    },
                    "active": {
                        "value": "rgba(138, 142, 155, 0.3)",
                        "description": "Active (selected) state of the regular tertiary control."
                    }
                },
                "info": {
                    "DEFAULT": {
                        "value": "rgba(0, 143, 248, 0)",
                        "description": "Background of the accent and link-lookalike tertiary control."
                    },
                    "hover": {
                        "value": "rgba(0, 143, 248, 0.2)",
                        "description": "Hover state of the accent and link-lookalike tertiary control."
                    },
                    "active": {
                        "value": "rgba(0, 143, 248, 0.3)",
                        "description": "Active (selected) state of the accent and link-lookalike tertiary control."
                    }
                },
                "invert": {
                    "DEFAULT": {
                        "value": "rgba(255, 255, 255, 0)",
                        "description": "Background of the inverted version of the tertiary control."
                    },
                    "hover": {
                        "value": "rgba(255, 255, 255, 0.1)",
                        "description": "Hover state of the inverted version of the tertiary control."
                    },
                    "active": {
                        "value": "rgba(255, 255, 255, 0.3)",
                        "description": "Active (selected) state of the inverted version of the tertiary control."
                    }
                }
            }
        },
        "icon": {
            "primary": {
                "neutral": {
                    "DEFAULT": {
                        "value": "#a9abb6",
                        "description": "Primary neutral icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#c4c7cf",
                            "description": "Hover and active (selected) states of the primary neutral icon."
                        }
                    }
                },
                "info": {
                    "DEFAULT": {
                        "value": "#006dca",
                        "description": "Primary link-lookalike icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#044792",
                            "description": "Hover and active (selected) states of the primary link-lookalike icon."
                        }
                    }
                },
                "success": {
                    "DEFAULT": {
                        "value": "#009f81",
                        "description": "Primary success icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#007c65",
                            "description": "Hover and active (selected) states of the primary successful icon."
                        }
                    }
                },
                "critical": {
                    "DEFAULT": {
                        "value": "#ff4953",
                        "description": "Primary critical icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#d1002f",
                            "description": "Hover and active (selected) states of the primary critical icon."
                        }
                    }
                },
                "warning": {
                    "DEFAULT": {
                        "value": "#ff642d",
                        "description": "Primary warning icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#c33909",
                            "description": "Hover and active (selected) states of the primary warning icon."
                        }
                    }
                },
                "invert": {
                    "DEFAULT": {
                        "value": "#ffffff",
                        "description": "Inverted version of the primary icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#e0e1e9",
                            "description": "Hover and active (selected) states of the inverted version of the primary icon."
                        }
                    }
                },
                "feature": {
                    "highlight": {
                        "DEFAULT": {
                            "value": "#8649e1",
                            "description": "Primary highlighted icon."
                        },
                        "hover": {
                            "active": {
                                "value": "#6B3AB4",
                                "description": "Violet background color for the hover and active states of the primary highlighted icon. It’s created using a CSS filter with a brightness(0.8), applied to the violet-500 color."
                            }
                        }
                    }
                }
            },
            "secondary": {
                "neutral": {
                    "DEFAULT": {
                        "value": "#c4c7cf",
                        "description": "Secondary neutral icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#e0e1e9",
                            "description": "Hover and active (selected) states of the secondary neutral icon."
                        }
                    }
                },
                "info": {
                    "DEFAULT": {
                        "value": "#2bb3ff",
                        "description": "Secondary link-lookalike icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#008ff8",
                            "description": "Hover and active (selected) states of the secondary link-lookalike icon."
                        }
                    }
                },
                "success": {
                    "DEFAULT": {
                        "value": "#00c192",
                        "description": "Secondary success icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#009f81",
                            "description": "Hover and active (selected) states of the secondary successful icon."
                        }
                    }
                },
                "critical": {
                    "DEFAULT": {
                        "value": "#ff8786",
                        "description": "Secondary critical icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#ff4953",
                            "description": "Hover and active (selected) states of the secondary critical icon."
                        }
                    }
                },
                "warning": {
                    "DEFAULT": {
                        "value": "#ff8c43",
                        "description": "Secondary warning icon."
                    },
                    "hover": {
                        "active": {
                            "value": "#ff642d",
                            "description": "Hover and active (selected) states of the secondary warning icon."
                        }
                    }
                }
            },
            "non": {
                "interactive": {
                    "value": "#f4f5f9",
                    "description": "Color for the default non-interactive icon."
                }
            }
        },
        "illustration": {
            "red": {
                "value": "#FF788F",
                "description": "⚠️ Use only for illustrations."
            },
            "orange": {
                "value": "#FFB26E",
                "description": "⚠️ Use only for illustrations."
            },
            "yellow": {
                "value": "#FFE84D",
                "description": "⚠️ Use only for illustrations."
            },
            "salad": {
                "value": "#C7FA73",
                "description": "⚠️ Use only for illustrations."
            },
            "green": {
                "value": "#45E0A8",
                "description": "⚠️ Use only for illustrations."
            },
            "blue": {
                "value": "#6EDBFF",
                "description": "⚠️ Use only for illustrations."
            },
            "violet": {
                "value": "#B880FF",
                "description": "⚠️ Use only for illustrations."
            },
            "pink": {
                "value": "#FF7AD1",
                "description": "⚠️ Use only for illustrations."
            }
        },
        "date": {
            "picker": {
                "cell": {
                    "DEFAULT": {
                        "value": "rgba(30, 34, 49, 1)",
                        "description": "Default date-picker cell background."
                    },
                    "current": {
                        "DEFAULT": {
                            "value": "#2b2e38",
                            "description": "Color for marking the cell with the current date, month or year in the date-picker."
                        },
                        "invert": {
                            "value": "rgba(255, 255, 255, 0.5)",
                            "description": "Color for marking the active cell with the current date, month or year in the date-picker."
                        }
                    },
                    "hover": {
                        "value": "#484a54",
                        "description": "Hover state of the default date-picker cell background."
                    },
                    "range": {
                        "DEFAULT": {
                            "value": "#002b5f",
                            "description": "Background for the cell which is included in the date range in the date-picker."
                        },
                        "hover": {
                            "value": "#044792",
                            "description": "Hover state of the background for the cell which is included in the date range in the date-picker."
                        }
                    },
                    "active": {
                        "DEFAULT": {
                            "value": "#2bb3ff",
                            "description": "Active (selected) date-picker cell background."
                        },
                        "hover": {
                            "value": "#008ff8",
                            "description": "Hover for the active (selected) date-picker cell background."
                        }
                    },
                    "comparison": {
                        "active": {
                            "DEFAULT": {
                                "value": "#8649e1",
                                "description": "Active (selected) date-picker cell background for comparison periods."
                            },
                            "hover": {
                                "value": "#5925ab",
                                "description": "Hover for the active (selected) date-picker cell background for comparison periods."
                            }
                        }
                    }
                }
            }
        },
        "dropdown": {
            "menu": {
                "item": {
                    "DEFAULT": {
                        "value": "rgba(54, 56, 67, 1)",
                        "description": "Default background color for the list item in the dropdown-menu."
                    },
                    "hover": {
                        "value": "rgba(79, 82, 93, 1)",
                        "description": "Hover state of the default background color for the list item in the dropdown-menu."
                    },
                    "selected": {
                        "DEFAULT": {
                            "value": "rgba(66, 103, 123, 1)",
                            "description": "Active (selected) state of the default background color for the list item in the dropdown-menu."
                        },
                        "hover": {
                            "value": "rgba(75, 117, 139, 1)",
                            "description": "Hover state for the selected state of the default background color for the list item in the dropdown-menu."
                        }
                    }
                }
            }
        },
        "feature": {
            "popover": {
                "bg": {
                    "DEFAULT": {
                        "value": "#fce081",
                        "description": "Color of the FeaturePopover background with accent theme."
                    },
                    "neutral": {
                        "value": "#1D113E",
                        "description": "Color of the FeaturePopover background with neutral theme."
                    }
                },
                "dot": {
                    "outer": {
                        "border": {
                            "value": "#fce081",
                            "description": "Color of the outer border of the FeaturePopover.Spot for FeaturePopover with accent theme."
                        }
                    },
                    "neutral": {
                        "DEFAULT": {
                            "value": "#00c192",
                            "description": "Color of the FeaturePopover.Spot for FeaturePopover with neutral theme."
                        },
                        "outer": {
                            "border": {
                                "value": "#00c192",
                                "description": "Color of the outer border of the FeaturePopover.Spot for FeaturePopover with neutral theme."
                            }
                        }
                    }
                }
            }
        },
        "progress": {
            "bar": {
                "DEFAULT": {
                    "bg": {
                        "DEFAULT": {
                            "value": "#484a54",
                            "description": "Background color of the ProgressBar."
                        },
                        "hover": {
                            "value": "#c4c7cf",
                            "description": "Hover state of the background color of the ProgressBar."
                        },
                        "invert": {
                            "DEFAULT": {
                                "value": "rgba(255, 255, 255, 0.2)",
                                "description": "Inverted version of the background color of the ProgressBar."
                            },
                            "hover": {
                                "value": "rgba(255, 255, 255, 0.4)",
                                "description": "Hover state for the inverted version of the background color of the ProgressBar."
                            }
                        }
                    },
                    "value": {
                        "gradient": {
                            "value": "linear-gradient(-45deg, rgba(0, 159, 129, 0.9) 25%, rgba(0, 159, 129, 1) 0%, rgba(0, 159, 129, 1) 50%, rgba(0, 159, 129, 0.9) 0%, rgba(0, 159, 129, 0.9) 75%, rgba(0, 159, 129, 1) 0%)",
                            "description": "Value with gradient for the ProgressBar."
                        }
                    }
                },
                "pattern": {
                    "gradient": {
                        "value": "linear-gradient(-45deg, rgba(224, 225, 233, 0.9) 25%, rgba(224, 225, 233, 1) 0%, rgba(224, 225, 233, 1) 50%, rgba(224, 225, 233, 0.9) 0%, rgba(224, 225, 233, 0.9) 75%, rgba(224, 225, 233, 1) 0%)",
                        "description": "Null value gradient for the ProgressBar."
                    }
                },
                "value": {
                    "bg": {
                        "value": "#000000",
                        "description": "Base value background for the ProgressBar. It is used to create gradients for the values."
                    }
                }
            }
        },
        "skeleton": {
            "bg": {
                "DEFAULT": {
                    "value": "#484a54",
                    "description": "Default color for the Skeleton."
                },
                "invert": {
                    "value": "rgba(255, 255, 255, 0.3)",
                    "description": "Inverted version of the default color for the Skeleton."
                }
            }
        },
        "table": {
            "th": {
                "primary": {
                    "cell": {
                        "DEFAULT": {
                            "value": "rgba(62, 64, 75, 1)",
                            "description": "Background of the header cell in the primary Table."
                        },
                        "hover": {
                            "value": "rgba(83, 85, 97, 1)",
                            "description": "Background of the hovered header cell in the primary Table."
                        },
                        "active": {
                            "value": "rgba(108, 110, 121, 1)",
                            "description": "Background of the active header cell in the primary Table."
                        }
                    }
                },
                "secondary": {
                    "cell": {
                        "value": "rgba(62, 64, 75, 1)",
                        "description": "Background of the header cell in the secondary Table."
                    }
                },
                "gradient": {
                    "value": "linear-gradient(to right, rgba(224, 225, 233, 0) 0%, rgba(224, 225, 233, 1) 100%)",
                    "description": "Background gradient for sorting icon that absolute positioned in the table head."
                }
            },
            "td": {
                "cell": {
                    "DEFAULT": {
                        "value": "#191b23",
                        "description": "Background of the default cell in the Table."
                    },
                    "hover": {
                        "value": "#2b2e38",
                        "description": "Background of the default hovered cell in the Table."
                    },
                    "active": {
                        "value": "#2b2e38",
                        "description": "Background of the default active cell in the Table."
                    },
                    "unread": {
                        "value": "#f4f5f9",
                        "description": "Background of the unread cell in the Table."
                    },
                    "accordion": {
                        "value": "rgba(54, 56, 67, 1)",
                        "description": "Background of the cell inside an Accordion in the Table."
                    },
                    "selected": {
                        "DEFAULT": {
                            "value": "rgba(43, 54, 69, 1)",
                            "description": "Background of the selected cell in the Table."
                        },
                        "hover": {
                            "value": "#c4e5fe",
                            "description": "Background of the hovered selected cell in the Table."
                        },
                        "active": {
                            "value": "#c4e5fe",
                            "description": "Background of the active selected cell in the Table."
                        }
                    },
                    "new": {
                        "DEFAULT": {
                            "value": "#dbfee8",
                            "description": "Background of the cell with new information in the Table."
                        },
                        "hover": {
                            "value": "#9ef2c9",
                            "description": "Background of the hovered cell with new information in the Table."
                        },
                        "active": {
                            "value": "#9ef2c9",
                            "description": "Background of the active cell with new information in the Table."
                        }
                    },
                    "critical": {
                        "DEFAULT": {
                            "value": "#fff0f7",
                            "description": "Background of the cell with critical information in the Table."
                        },
                        "hover": {
                            "value": "#ffd7df",
                            "description": "Background of the hovered cell with critical information in the Table."
                        },
                        "active": {
                            "value": "#ffd7df",
                            "description": "Background of the active cell with critical information in the Table."
                        }
                    },
                    "warning": {
                        "DEFAULT": {
                            "value": "#fff3d9",
                            "description": "Background of the cell with warning information in the Table."
                        },
                        "hover": {
                            "value": "#ffdca2",
                            "description": "Background of the hovered cell with warning information in the Table."
                        },
                        "active": {
                            "value": "#ffdca2",
                            "description": "Background of the active cell with warning information in the Table."
                        }
                    }
                }
            }
        },
        "brand": {
            "primary": {
                "value": "#dcb8ff",
                "description": "Primary brand color."
            },
            "secondary": {
                "value": "#421983",
                "description": "Secondary brand color."
            },
            "pinterest": {
                "value": "#bd081c",
                "description": "Pinterest brand color."
            },
            "instagram": {
                "value": "#e4405f",
                "description": "Instagram brand color."
            },
            "youtube": {
                "value": "#ff0000",
                "description": "Youtube brand color."
            },
            "facebook": {
                "value": "#1877F2",
                "description": "Facebook brand color."
            },
            "linkedIn": {
                "value": "#0A66C2",
                "description": "LinkedIn brand color."
            },
            "twitter": {
                "value": "#1D9BF0",
                "description": "Twitter brand color."
            },
            "google": {
                "blue": {
                    "value": "#1a0dab",
                    "description": "Google brand color for the link."
                },
                "green": {
                    "value": "#016723",
                    "description": "Google green brand color for the link."
                },
                "my": {
                    "business": {
                        "value": "#1a73e8",
                        "description": "Google My Business brand color."
                    }
                }
            }
        },
        "keyboard": {
            "focus": {
                "outline": {
                    "value": "#008ff8",
                    "description": "Color for default keyboard focus outline styles."
                },
                "invalid": {
                    "outline": {
                        "value": "#ff4953",
                        "description": "Color for keyboard focus outline styles for elements with invalid state."
                    }
                },
                "valid": {
                    "outline": {
                        "value": "#009f81",
                        "description": "Color for keyboard focus outline styles for elements with valid state."
                    }
                },
                "invert": {
                    "outline": {
                        "value": "rgba(255, 255, 255, 0.8)",
                        "description": "Color for keyboard focus outline styles to use on the dark and color background."
                    }
                },
                "feature": {
                    "highlight": {
                        "outline": {
                            "value": "linear-gradient(90deg, #ab6cfe, #008ff8)",
                            "description": "Color for keyboard focus outline styles for highlighted controls."
                        }
                    }
                }
            }
        },
        "overlay": {
            "primary": {
                "value": "rgba(25, 27, 35, 0.7)",
                "description": "Use for cover the content under the modal dialogs."
            },
            "secondary": {
                "value": "rgba(25, 27, 35, 0.4)",
                "description": "Use for the secondary modal dialogs that were opened upon the other modal dialogs."
            },
            "limitation": {
                "primary": {
                    "value": "#f4f5f9",
                    "description": "Use as a primary cover of the content under the messages about limitations."
                },
                "secondary": {
                    "value": "rgba(255, 255, 255, 0.85)",
                    "description": "Use as a secondary cover of the content under the messages about limitations."
                }
            }
        },
        "tooltip": {
            "default": {
                "value": "#484a54",
                "description": "Default Tooltip background."
            },
            "warning": {
                "value": "rgba(160, 13, 42, 1)",
                "description": "Warning Tooltip background."
            },
            "invert": {
                "value": "#191b23",
                "description": "Inverted version of the default Tooltip background."
            }
        },
        "neighbor": {
            "location": {
                "neutral": {
                    "value": "rgba(255, 255, 255, 0.5)",
                    "description": "Neutral border of the components that are combined with neighbor-location property."
                },
                "invert": {
                    "value": "rgba(0, 0, 0, 0.5)",
                    "description": "Inverted border of the components that are combined with neighbor-location property."
                }
            }
        },
        "scroll": {
            "area": {
                "shadow": {
                    "left": {
                        "value": "linear-gradient(to right, rgba(25, 27, 35, 0.1) 20.55%, rgba(255, 255, 255, 0.0001) 100%)",
                        "description": "Left-to-right fade shadow for the ScrollArea."
                    },
                    "right": {
                        "value": "linear-gradient(to left, rgba(25, 27, 35, 0.1) 20.55%, rgba(255, 255, 255, 0.0001) 100%)",
                        "description": "Right-to-left fade shadow for the ScrollArea."
                    },
                    "top": {
                        "value": "linear-gradient(to bottom, rgba(25, 27, 35, 0.1) 20.55%, rgba(255, 255, 255, 0.0001) 100%)",
                        "description": "Top-to-bottom fade shadow for the ScrollArea."
                    },
                    "bottom": {
                        "value": "linear-gradient(to top, rgba(25, 27, 35, 0.1) 20.55%, rgba(255, 255, 255, 0.0001) 100%)",
                        "description": "Bottom-to-top fade shadow for the ScrollArea."
                    }
                },
                "dropdown": {
                    "menu": {
                        "left": {
                            "value": "linear-gradient(to right, rgba(255, 255, 255, 1) 34.38%, rgba(255, 255, 255, 0) 100%)",
                            "description": "Left-to-right fade shadow for the ScrollArea inside the DropdownMenu."
                        },
                        "right": {
                            "value": "linear-gradient(to left, rgba(255, 255, 255, 1) 34.38%, rgba(255, 255, 255, 0) 100%)",
                            "description": "Right-to-left fade shadow for the ScrollArea inside the DropdownMenu."
                        },
                        "bottom": {
                            "value": "linear-gradient(to top, rgba(43, 46, 56, 1) 34.38%, rgba(54, 56, 67, 0) 100%)",
                            "description": "Bottom-to-top fade shadow for the ScrollArea inside the DropdownMenu."
                        },
                        "top": {
                            "value": "linear-gradient(to bottom, rgba(43, 46, 56, 1) 34.38%, rgba(54, 56, 67, 0) 100%)",
                            "description": "Top-to-bottom fade shadow for the ScrollArea inside the DropdownMenu."
                        }
                    }
                }
            },
            "bar": {
                "background": {
                    "value": "rgba(25, 27, 35, 0.3)",
                    "description": "Background color for ScrollBar."
                }
            }
        },
        "tag": {
            "primary": {
                "gray": {
                    "normal": {
                        "value": "rgba(69, 70, 81, 1)",
                        "description": "Gray background color for the primary tag."
                    },
                    "hover": {
                        "active": {
                            "value": "#e0e1e9",
                            "description": "Gray background color for the hover and active states of the primary tag."
                        }
                    },
                    "text": {
                        "value": "#f4f5f9",
                        "description": "Gray text for the primary gray tag."
                    }
                },
                "blue": {
                    "normal": {
                        "value": "rgba(7, 77, 141, 1)",
                        "description": "Blue background color for primary tag."
                    },
                    "hover": {
                        "active": {
                            "value": "#c4e5fe",
                            "description": "Blue background color for the hover and active states of the primary tag."
                        }
                    },
                    "text": {
                        "value": "#e9f7ff",
                        "description": "Blue text for the primary blue tag."
                    }
                },
                "green": {
                    "normal": {
                        "value": "rgba(9, 99, 82, 1)",
                        "description": "Green background color for the primary tag."
                    },
                    "hover": {
                        "active": {
                            "value": "#9ef2c9",
                            "description": "Green background color for the hover and active states of the primary tag."
                        }
                    },
                    "text": {
                        "value": "#dbfee8",
                        "description": "Green text for the primary green tag."
                    }
                },
                "orange": {
                    "normal": {
                        "value": "rgba(156, 49, 11, 1)",
                        "description": "Orange background color for the primary tag."
                    },
                    "hover": {
                        "active": {
                            "value": "#ffdca2",
                            "description": "Orange background color for the hover and active states of the primary tag."
                        }
                    },
                    "text": {
                        "value": "#fff3d9",
                        "description": "Orange text for the primary orange tag."
                    }
                },
                "red": {
                    "normal": {
                        "value": "rgba(160, 13, 42, 1)",
                        "description": "Red background color for the primary tag."
                    },
                    "hover": {
                        "active": {
                            "value": "#ffd7df",
                            "description": "Red background color for the hover and active states of the primary tag."
                        }
                    },
                    "text": {
                        "value": "#fff0f7",
                        "description": "Red text for the primary red tag."
                    }
                },
                "violet": {
                    "normal": {
                        "value": "rgba(95, 62, 157, 1)",
                        "description": "Violet background color for the primary tag."
                    },
                    "hover": {
                        "active": {
                            "value": "#edd9ff",
                            "description": "Violet background color for the hover and active states of the primary tag."
                        }
                    },
                    "text": {
                        "value": "rgba(244, 245, 249, 1)",
                        "description": "Violet text for the primary violet tag."
                    }
                },
                "yellow": {
                    "normal": {
                        "value": "rgba(252, 224, 129, 0.5)",
                        "description": "Yellow background color for the primary tag."
                    },
                    "hover": {
                        "active": {
                            "value": "#fce081",
                            "description": "Yellow background color for the hover and active states of the primary tag."
                        }
                    },
                    "text": {
                        "value": "#a75800",
                        "description": "Yellow text for the primary yellow tag."
                    }
                },
                "white": {
                    "normal": {
                        "value": "rgba(255, 255, 255, 0.15)",
                        "description": "Primary white tag."
                    },
                    "hover": {
                        "active": {
                            "value": "rgba(255, 255, 255, 0.3)",
                            "description": "Hover and active (selected) state of the primary white tag."
                        }
                    },
                    "text": {
                        "value": "#ffffff",
                        "description": "White text for the primary white tag."
                    }
                }
            },
            "secondary": {
                "normal": {
                    "value": "#ffffff",
                    "description": "Background color for the default secondary tag."
                },
                "hover": {
                    "active": {
                        "value": "#f4f5f9",
                        "description": "Hover and active (selected) states of the background color for the default secondary tag."
                    }
                },
                "white": {
                    "normal": {
                        "value": "rgba(255, 255, 255, 0)",
                        "description": "White secondary tag."
                    },
                    "hover": {
                        "active": {
                            "value": "rgba(255, 255, 255, 0.1)",
                            "description": "Active state of the secondary white tag."
                        }
                    },
                    "text": {
                        "value": "#ffffff",
                        "description": "White text for the secondary white tag."
                    }
                },
                "gray": {
                    "text": {
                        "value": "#6c6e79",
                        "description": "Gray text for the default secondary tag."
                    }
                }
            }
        },
        "chart": {
            "palette": {
                "order": {
                    "1": {
                        "value": "#2bb3ff",
                        "description": "1 color in the default list of colors for charts."
                    },
                    "2": {
                        "value": "#59ddaa",
                        "description": "2 color in the default list of colors for charts."
                    },
                    "3": {
                        "value": "#ff642d",
                        "description": "3 color in the default list of colors for charts."
                    },
                    "4": {
                        "value": "#f67cf2",
                        "description": "4 color in the default list of colors for charts."
                    },
                    "5": {
                        "value": "#fdc23c",
                        "description": "5 color in the default list of colors for charts."
                    },
                    "6": {
                        "value": "#ab6cfe",
                        "description": "6 color in the default list of colors for charts."
                    },
                    "7": {
                        "value": "#ff8786",
                        "description": "7 color in the default list of colors for charts."
                    },
                    "8": {
                        "value": "#9bd85d",
                        "description": "8 color in the default list of colors for charts."
                    },
                    "9": {
                        "value": "#008ff8",
                        "description": "9 color in the default list of colors for charts."
                    },
                    "10": {
                        "value": "#00c192",
                        "description": "10 color in the default list of colors for charts."
                    },
                    "11": {
                        "value": "#ffb26e",
                        "description": "11 color in the default list of colors for charts."
                    },
                    "12": {
                        "value": "#e14adf",
                        "description": "12 color in the default list of colors for charts."
                    },
                    "13": {
                        "value": "#ef9800",
                        "description": "13 color in the default list of colors for charts."
                    },
                    "14": {
                        "value": "#dcb8ff",
                        "description": "14 color in the default list of colors for charts."
                    },
                    "15": {
                        "value": "#ff4953",
                        "description": "15 color in the default list of colors for charts."
                    },
                    "16": {
                        "value": "#66c030",
                        "description": "16 color in the default list of colors for charts."
                    },
                    "17": {
                        "value": "#8ecdff",
                        "description": "17 color in the default list of colors for charts."
                    },
                    "18": {
                        "value": "#009f81",
                        "description": "18 color in the default list of colors for charts."
                    },
                    "19": {
                        "value": "#ff8c43",
                        "description": "19 color in the default list of colors for charts."
                    },
                    "20": {
                        "value": "#ffa9fa",
                        "description": "20 color in the default list of colors for charts."
                    },
                    "21": {
                        "value": "#d87900",
                        "description": "21 color in the default list of colors for charts."
                    },
                    "22": {
                        "value": "#c695ff",
                        "description": "22 color in the default list of colors for charts."
                    },
                    "23": {
                        "value": "#ffaeb5",
                        "description": "23 color in the default list of colors for charts."
                    },
                    "24": {
                        "value": "#35a21e",
                        "description": "24 color in the default list of colors for charts."
                    },
                    "total": {
                        "amount": {
                            "value": "#8a8e9b",
                            "description": "Use it to show total value."
                        }
                    },
                    "other": {
                        "data": {
                            "value": "#c4c7cf",
                            "description": "Use it to indicate voids, missing or some other data."
                        }
                    },
                    "null": {
                        "value": "#e0e1e9",
                        "description": "Use it to show null value."
                    }
                }
            },
            "grid": {
                "line": {
                    "value": "#e0e1e9",
                    "description": "Default chart grid line."
                },
                "x": {
                    "axis": {
                        "value": "#c4c7cf",
                        "description": "X-axis line on the chart grid."
                    }
                },
                "y": {
                    "accent": {
                        "hover": {
                            "line": {
                                "value": "#a9abb6",
                                "description": "Accent line for the hover state on the chart grid."
                            }
                        }
                    }
                },
                "text": {
                    "label": {
                        "value": "#6c6e79",
                        "description": "Text label on the chart grid."
                    }
                },
                "bar": {
                    "chart": {
                        "hover": {
                            "value": "rgba(196, 199, 207, 0.3)",
                            "description": "Background color for the hover state of a bar on the chart grid."
                        },
                        "base": {
                            "bg": {
                                "value": "#e0e1e9",
                                "description": "Default background color of a bar in the BarChart."
                            }
                        }
                    }
                },
                "period": {
                    "bg": {
                        "value": "rgba(196, 199, 207, 0.2)",
                        "description": "Use for highlighting a period on the chart grid."
                    },
                    "pattern": {
                        "value": "rgba(25, 27, 35, 0.15)",
                        "description": "Stripe color for diagonal pattern background."
                    }
                },
                "border": {
                    "value": "#191b23",
                    "description": "Border for distinguishing data sets and chart dots on the chart grid."
                }
            },
            "x": {
                "axis": {
                    "accent": {
                        "period": {
                            "active": {
                                "value": "#8a8e9b",
                                "description": "Background color for the clickable date on the X-axis of the chart grid."
                            }
                        },
                        "data": {
                            "start": {
                                "tracking": {
                                    "value": "rgba(0, 159, 129, 0.2)",
                                    "description": "Background color for the \"Start tracking\" date on the X-axis of the chart grid."
                                }
                            }
                        }
                    }
                }
            }
        },
        "header": {
            "bg": {
                "value": "#382E5E"
            },
            "border": {
                "primary": {
                    "value": "#382E5E"
                },
                "secondary": {
                    "value": "rgba(255,255,255, 0.15)"
                }
            }
        },
        "sidebar": {
            "nav": {
                "control": {
                    "hover": {
                        "value": "rgba(224, 225, 233, 0.7)"
                    },
                    "active": {
                        "value": "#E2DDFF"
                    },
                    "text": {
                        "normal": {
                            "value": "#6D619F"
                        },
                        "active": {
                            "value": "#4D407E"
                        }
                    },
                    "icon": {
                        "normal": {
                            "value": "#9083C5"
                        },
                        "active": {
                            "value": "#4D407E"
                        }
                    }
                }
            }
        }
    },
    "opacity": {
        "disabled": {
            "value": "0.3",
            "description": "Use for the disabled state of all kind of the controls and elements."
        }
    },
    "shadows": {
        "box": {
            "shadow": {
                "card": {
                    "DEFAULT": {
                        "value": "0px 0px 1px 0px rgba(25, 27, 35, 0.16), 0px 1px 2px 0px rgba(25, 27, 35, 0.12)",
                        "description": "Default shadow of the Card."
                    },
                    "hover": {
                        "value": "3px 3px 30px 0px rgba(25, 27, 35, 0.15)",
                        "description": "Hover state for the shadow of the Card with hover state."
                    }
                },
                "dnd": {
                    "value": "0px 0px 1px 0px rgba(25, 27, 35, 0.16), 0px 12px 40px 0px rgba(25, 27, 35, 0.16)",
                    "description": "Shadow for show that element are being drag-and-drop."
                },
                "modal": {
                    "value": "0px 3px 8px 0px rgba(25, 27, 35, 0.2)",
                    "description": "Default shadow if the Modal window."
                },
                "popper": {
                    "value": "0px 1px 15px 0px rgba(25, 27, 35, 0.6)",
                    "description": "Default shadow of all Poppers, Dropdowns and Tooltips."
                },
                "float": {
                    "control": {
                        "DEFAULT": {},
                        "hover": {}
                    }
                }
            }
        },
        "keyboard": {
            "focus": {
                "invalid": {
                    "value": "0px 0px 0px 3px rgba(255, 73, 83, 0.5)",
                    "description": "Keyboard focus styles for elements with invalid state."
                },
                "valid": {
                    "value": "0px 0px 0px 3px rgba(0, 159, 129, 0.5)",
                    "description": "Keyboard focus styles for elements with valid state."
                },
                "invert": {
                    "value": "0px 0px 0px 3px rgba(255, 255, 255, 0.8)",
                    "description": "Keyboard focus styles for use on dark backgrounds."
                },
                "DEFAULT": {
                    "value": "0px 0px 0px 3px rgba(0, 143, 248, 0.5)",
                    "description": "Default keyboard focus box-shadow styles."
                }
            }
        }
    },
    "sizes": {
        "form": {
            "control": {
                "s": {
                    "value": "20px",
                    "description": "Small size of the controls. Use it for small interactive addons. Avoid using it with the main actions."
                },
                "m": {
                    "value": "28px",
                    "description": "Default size of the controls."
                },
                "l": {
                    "value": "40px",
                    "description": "Large size of the controls."
                }
            }
        }
    },
    "radii": {
        "addon": {
            "rounded": {
                "value": "4px",
                "description": "Use for rounding addons and small controls like Checkbox."
            }
        },
        "badge": {
            "rounded": {
                "value": "6px",
                "description": "Use for rounding Badge."
            }
        },
        "chart": {
            "rounded": {
                "value": "2px",
                "description": "Use for rounding big and small charts like bar, histogram and others."
            }
        },
        "counter": {
            "rounded": {
                "value": "12px",
                "description": "Use for rounding Counter."
            }
        },
        "tag": {
            "rounded": {
                "value": "24px",
                "description": "Use for rounding Tag."
            }
        },
        "switch": {
            "rounded": {
                "value": "24px",
                "description": "Use for rounding Switch."
            }
        },
        "control": {
            "rounded": {
                "value": "6px",
                "description": "Use for rounding all form controls: Button, FilterTrigger, Input, Textarea, Pills, etc."
            }
        },
        "progress": {
            "bar": {
                "rounded": {
                    "value": "6px",
                    "description": "Use for rounding bars: ProgressBar, SliderBar, etc."
                }
            }
        },
        "surface": {
            "rounded": {
                "value": "6px",
                "description": "Use for rounding surfaces like Card, blocks, widgets, Notice, etc."
            }
        },
        "popper": {
            "rounded": {
                "value": "6px",
                "description": "Use for rounding all kinds of poppers and dropdowns."
            }
        },
        "modal": {
            "rounded": {
                "value": "12px",
                "description": "Use for rounding all kinds of big modal dialogs (e.g., Modal, Wizard)."
            }
        }
    },
    "durations": {
        "switch": {
            "value": "100",
            "description": "Use for small controls like Switch or Slider."
        },
        "popper": {
            "value": "200",
            "description": "Use for components based on popper like Tooltip, Dropdown or Filter trigger."
        },
        "control": {
            "value": "200",
            "description": "Use for small controls like Checkbox or Radio."
        },
        "modal": {
            "value": "200",
            "description": "Use for Modal, Fullscreen Modal, Side panel or other kind of windows."
        },
        "accordion": {
            "value": "200",
            "description": "Use for Accordion."
        },
        "counter": {
            "value": "200",
            "description": "Use for Summary or Counter."
        }
    }
}
      },
    });
    