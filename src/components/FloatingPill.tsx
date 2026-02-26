import React from 'react';

interface FloatingPillProps {
    icon: React.ElementType;
    text: string;
    className?: string;
    delay?: string;
}

export default function FloatingPill({ icon: Icon, text, className = "", delay = "0s" }: FloatingPillProps) {
    return (
        <div
            className={`absolute z-30 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg animate-float ${className}`}
            style={{ animationDelay: delay }}
        >
            <div className="p-1.5 bg-primary/10 rounded-full">
                <Icon size={14} className="text-primary" />
            </div>
            <span className="text-xs font-bold text-primary whitespace-nowrap">{text}</span>
        </div>
    );
}
