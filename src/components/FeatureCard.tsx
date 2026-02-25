
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    delay?: string;
}

export default function FeatureCard({ title, description, icon: Icon, delay = "0ms" }: FeatureCardProps) {
    return (
        <div
            className="p-10 bg-background border border-border rounded-xl hover:border-accent/40 transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1"
            style={{ transitionDelay: delay }}
        >
            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-all duration-500 mb-8 shadow-sm">
                <Icon size={28} />
            </div>
            <h3 className="text-2xl font-black text-primary mb-4 italic font-serif tracking-tight">{title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm font-medium italic">
                {description}
            </p>
        </div>
    );
}
