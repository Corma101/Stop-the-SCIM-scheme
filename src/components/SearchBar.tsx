import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apps } from "@/data/apps";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  navigateOnSelect?: boolean;
}

const CYCLING_APPS = ["Slack", "Notion", "Asana", "Figma", "GitHub"];
const PREFIX = "Search for ";

const SearchBar = ({ placeholder, className = "", onSearch, navigateOnSelect = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  // Animated placeholder cycling
  useEffect(() => {
    if (query.length > 0) return; // Don't animate when user is typing

    let appIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentApp = CYCLING_APPS[appIndex];

      if (!isDeleting) {
        charIndex++;
        setAnimatedText(PREFIX + currentApp.slice(0, charIndex) + "..");
        if (charIndex === currentApp.length) {
          // Pause before deleting
          timeout = setTimeout(() => {
            isDeleting = true;
            tick();
          }, 1800);
          return;
        }
        timeout = setTimeout(tick, 80);
      } else {
        charIndex--;
        setAnimatedText(PREFIX + currentApp.slice(0, charIndex) + (charIndex > 0 ? ".." : ".."));
        if (charIndex === 0) {
          isDeleting = false;
          appIndex = (appIndex + 1) % CYCLING_APPS.length;
          timeout = setTimeout(tick, 300);
          return;
        }
        timeout = setTimeout(tick, 50);
      }
    };

    setAnimatedText(PREFIX + "..");
    timeout = setTimeout(tick, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const filtered = query.length > 0
    ? apps.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (slug: string) => {
    setShowDropdown(false);
    setQuery("");
    if (navigateOnSelect) {
      navigate(`/scim/${slug}`);
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-1 focus-within:ring-ring">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
            onSearch?.(e.target.value);
          }}
          onFocus={() => query.length > 0 && setShowDropdown(true)}
          placeholder={animatedText || placeholder || "Search for .."}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {navigateOnSelect && (
          <kbd className="hidden rounded border bg-muted px-2 py-0.5 text-xs text-muted-foreground sm:inline-block">
            Ctrl+K
          </kbd>
        )}
      </div>

      {showDropdown && filtered.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-card p-2 shadow-lg">
          {filtered.map((app) => (
            <button
              key={app.slug}
              onClick={() => handleSelect(app.slug)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent"
            >
              <img src={app.logo} alt={app.name} className="h-8 w-8 rounded-lg" />
              <div>
                <div className="text-sm font-medium">{app.name}</div>
                <div className="text-xs text-muted-foreground">{app.category}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
