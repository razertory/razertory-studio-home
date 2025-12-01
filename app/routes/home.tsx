import type { Route } from "./+types/home";
import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from "react";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Razertory Terminal" },
		{ name: "viewport", content: "width=device-width, initial-scale=1.0" }
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

const allCommands: Record<string, { description: string; output: React.ReactNode }> = {
    "/about": {
        description: "Learn more about RAZERTORY STUDIO.",
        output: "We are a team dedicated to developing productivity tools and providing the best user experience."
    },
    "/product": {
        description: "Explore our products.",
        output: (
            <>
                ChatFrame.co - ChatFrame is a cross-platform desktop chatbot that unifies access to multiple LLM providers
                and connect them with MCP (Model Context Protocol) servers. <a href="https://ChatFrame.co" target="_blank" rel="noopener noreferrer">https://ChatFrame.co</a>
            </>
        )
    },
    "/contact": {
        description: "Get in touch with us.",
        output: "Mail to studio@razertory.com"
    },
    "/help": {
        description: "Show available commands.",
        output: "Available commands: /about, /product, /contact, /help, /clear"
    },
    "/clear": {
        description: "Clear the terminal history.",
        output: ""
    }
};
const commandKeys = Object.keys(allCommands);
const primaryCommandKeys = commandKeys.filter(c => !["/help", "/clear"].includes(c));


type HistoryItem = {
    id: number;
    command: string;
    output: React.ReactNode;
};

export default function Home({ loaderData }: Route.ComponentProps) {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [suggestionIndex, setSuggestionIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (command: string) => {
        if (command === "/clear") {
            setHistory([]);
            return;
        }
        
        const output = allCommands[command]?.output || `Command not found: ${command}. Type '/help' for available commands.`;
        setHistory(prev => [...prev, { id: prev.length, command, output }]);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (value.startsWith("/")) {
            const filtered = commandKeys.filter(c => c.startsWith(value));
            setSuggestions(filtered);
            setSuggestionIndex(-1);
        } else {
            setSuggestions([]);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (suggestions.length > 0) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSuggestionIndex(prev => (prev + 1) % suggestions.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSuggestionIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
            } else if (e.key === "Tab" || e.key === "Enter") {
                if (suggestionIndex !== -1) {
                    e.preventDefault();
                    setInput(suggestions[suggestionIndex]);
                    setSuggestions([]);
                }
            } else if (e.key === "Escape") {
                setSuggestions([]);
            }
        }

        if (e.key === "Enter") {
            if (suggestions.length > 0 && suggestionIndex !== -1) return;

            e.preventDefault();
            const value = input.trim();
            if (value === "") return;

            handleCommand(value);
            setInput("");
            setSuggestions([]);
        }
    };
    
    const prompt = ">";

	return (
        <div className="terminal-container" ref={containerRef} onClick={() => inputRef.current?.focus()}>
            <div className="scanlines"></div>

            <div className="hero-section">
                <div className="pixel-arrow">&gt;</div>
                <div className="pixel-title">RAZERTORY
					<br/>
					STUDIO
				</div>
            </div>

            <div className="tips-container">
                <div className="tips-title">Tips for getting started:</div>
                <ul className="tips-list">
                    {primaryCommandKeys.map(key => (
                        <li key={key}>
                            <span className="highlight-cmd">{key}</span> - {allCommands[key].description}
                        </li>
                    ))}
                </ul>
            </div>

            {history.map(item => (
                <div key={item.id}>
                    {item.command && (
                        <div className="input-line">
                            <span className="prompt-char">&gt;</span>
                            <span>{item.command}</span>
                        </div>
                    )}
                    <div className="output-line">{item.output}</div>
                </div>
            ))}

            {suggestions.length > 0 && (
                <div className="suggestions-container">
                    {suggestions.map((commandKey, i) => (
                        <div
                            key={commandKey}
                            className={`suggestion-item ${i === suggestionIndex ? "selected" : ""}`}
                            onClick={() => {
                                setInput(commandKey);
                                setSuggestions([]);
                                inputRef.current?.focus();
                            }}
                        >
                            <span className="suggestion-command">{commandKey}</span>
                            <span className="suggestion-description">{allCommands[commandKey].description}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="input-wrapper">
                <div className="input-line">
                    <span className="prompt-char">{prompt}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="cmd-input"
                        autoComplete="off"
                        autoFocus
                    />
                </div>
            </div>
        </div>
	);
}
