import React, {ChangeEvent, Ref, useState} from "react";
import TextInput from "./TextInput";
import ContentTransition from "../sections/ContentTransition";

interface Props {
    type: "text" | "number" | "email" | "password" | "tel" | "date" | "time" | "datetime-local" | "url";
    label: string;
    name: string;
    containerClassName?: string;
    suggestions: string[];
    [propName: string]: any;
}

const AutocompleteTextInput = React.forwardRef((props: Props, ref: Ref<HTMLInputElement> | undefined) => {

    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(props.suggestions);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [input, setInput] = useState<string>((ref as unknown as HTMLInputElement).value);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        const filtered = props.suggestions.filter(suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

        setInput(userInput);
        setFilteredSuggestions(filtered);
        setActiveSuggestionIndex(-1);
        setShowSuggestions(true);
    }

    const select = (suggestion: string) => {
        setFilteredSuggestions([]);
        setInput(suggestion);
        setActiveSuggestionIndex(-1);
        setShowSuggestions(false);
    }

    return (
        <div className={props.containerClassName}>
            <TextInput ref={ref} {...props} type={props.type} label={props.label} name={props.name} value={input}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           onChange(e);
                       }}
                       onFocus={() => setShowSuggestions(true)}
                       onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                       onKeyDown={(e: KeyboardEvent) => {
                           if (e.code === "Ender" || e.code === "Tab" && showSuggestions) {
                               setInput(filteredSuggestions[activeSuggestionIndex]);
                               setShowSuggestions(false);
                           } else if (e.code === "ArrowUp") {
                               e.preventDefault();
                               setActiveSuggestionIndex(Math.max(0, activeSuggestionIndex - 1));
                           } else if (e.code === "ArrowDown") {
                               e.preventDefault();
                               setActiveSuggestionIndex(Math.min(filteredSuggestions.length - 1, activeSuggestionIndex + 1));
                           }
                       }}
            />
            {showSuggestions && filteredSuggestions.length > 0 &&
                <ContentTransition>
                    <ul className="absolute z-20 mt-0.5 bg-white shadow-card rounded-lg">
                        {filteredSuggestions.map((suggestion, index) => {
                            return (
                                <li className={`flex text-sm py-1.5 px-6 cursor-pointer transition duration-100 rounded-lg ${index === activeSuggestionIndex ? "bg-grey-200" : "hover:bg-grey-200"}`} key={suggestion} onClick={_ => select(suggestion)}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                </ContentTransition>
            }
        </div>
    );
});

AutocompleteTextInput.displayName = "AutocompleteTextInput";
export default AutocompleteTextInput;
