import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  tooltipTitle: string;
  text: string;
  children: React.ReactNode;
}

const MINECRAFT_COLORS: Record<string, string> = {
  "0": "var(--color-minecraft-black)",
  "1": "var(--color-minecraft-dark-blue)",
  "2": "var(--color-minecraft-dark-green)",
  "3": "var(--color-minecraft-dark-aqua)",
  "4": "var(--color-minecraft-dark-red)",
  "5": "var(--color-minecraft-dark-purple)",
  "6": "var(--color-minecraft-gold)",
  "7": "var(--color-minecraft-gray)",
  "8": "var(--color-minecraft-dark-gray)",
  "9": "var(--color-minecraft-blue)",
  a: "var(--color-minecraft-green)",
  b: "var(--color-minecraft-aqua)",
  c: "var(--color-minecraft-red)",
  d: "var(--color-minecraft-light-purple)",
  e: "var(--color-minecraft-yellow)",
  f: "var(--color-minecraft-white)",
};

type MinecraftStyleState = {
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};

const normalizeMinecraftText = (value: string) => value.replace(/\r\n|\r|\\n/g, "\n");

const getMinecraftStyle = ({
  color,
  bold,
  italic,
  underline,
  strikethrough,
}: MinecraftStyleState): React.CSSProperties => ({
  color: color || "var(--color-minecraft-gray)", // Gris por defecto si no hay color
  fontWeight: bold ? 700 : undefined,
  fontStyle: italic ? "italic" : undefined,
  textDecorationLine:
    [underline ? "underline" : null, strikethrough ? "line-through" : null]
      .filter(Boolean)
      .join(" ") || undefined,
});

const renderMinecraftText = (value: string, keyPrefix: string) => {
  const nodes: React.ReactNode[] = [];
  const formatRegex = /&([0-9a-fk-or])/gi;
  const normalizedValue = normalizeMinecraftText(value);
  let lastIndex = 0;
  let styleState: MinecraftStyleState = {};

  const pushText = (text: string) => {
    if (!text) return;
    nodes.push(
      <span key={`${keyPrefix}-${nodes.length}`} style={getMinecraftStyle(styleState)}>
        {text}
      </span>
    );
  };

  for (
    let match = formatRegex.exec(normalizedValue);
    match !== null;
    match = formatRegex.exec(normalizedValue)
  ) {
    pushText(normalizedValue.slice(lastIndex, match.index));

    const code = match[1].toLowerCase();

    if (code === "r") {
      styleState = {};
    } else if (code in MINECRAFT_COLORS) {
      styleState = {
        color: MINECRAFT_COLORS[code],
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
      };
    } else if (code === "l") {
      styleState = { ...styleState, bold: true };
    } else if (code === "o") {
      styleState = { ...styleState, italic: true };
    } else if (code === "n") {
      styleState = { ...styleState, underline: true };
    } else if (code === "m") {
      styleState = { ...styleState, strikethrough: true };
    }

    lastIndex = formatRegex.lastIndex;
  }

  pushText(normalizedValue.slice(lastIndex));

  return nodes;
};

const Tooltip = ({ tooltipTitle, text, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  const schedulePosition = (clientX: number, clientY: number) => {
    const tooltipWidth = tooltipRef.current?.offsetWidth ?? 0;
    const tooltipHeight = tooltipRef.current?.offsetHeight ?? 0;
    const cursorOffset = 15;

    let nextX = clientX + cursorOffset;
    let nextY = clientY + cursorOffset;

    if (clientX + tooltipWidth + cursorOffset > window.innerWidth) {
      nextX = clientX - tooltipWidth - cursorOffset;
    }

    if (clientY + tooltipHeight + cursorOffset > window.innerHeight) {
      nextY = clientY - tooltipHeight - cursorOffset;
    }

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      if (!tooltipRef.current) return;
      tooltipRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      frameRef.current = null;
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    schedulePosition(event.clientX, event.clientY);
  };

  const handleMouseLeave = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      if (hideTimeoutRef.current !== null) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="cursor-pointer contents"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={e => {
        if (e.touches && e.touches[0]) {
          setVisible(true);
          const t = e.touches[0];
          schedulePosition(t.clientX, t.clientY);
        }
      }}
      onTouchMove={e => {
        if (e.touches && e.touches[0]) {
          const t = e.touches[0];
          schedulePosition(t.clientX, t.clientY);
        }
      }}
      onTouchEnd={() => {
        if (hideTimeoutRef.current !== null) {
          clearTimeout(hideTimeoutRef.current);
        }
        // leave tooltip visible briefly so user can read it, then hide
        hideTimeoutRef.current = window.setTimeout(() => {
          setVisible(false);
          hideTimeoutRef.current = null;
        }, 1000 * 1.5);
      }}
    >
      {children}

      {visible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            className="tooltip fixed z-9999 pointer-events-none left-0 top-0 will-change-transform text-base font-minecraft text-shadow-mc whitespace-pre"
          >
            <div className="leading-tight text-lg whitespace-pre">
              {renderMinecraftText(tooltipTitle, "tooltip-title")}
            </div>
            <div className="mt-2 text-base whitespace-pre">
              {renderMinecraftText(text, "tooltip-text")}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
