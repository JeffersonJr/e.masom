
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
            className="p-8 bg-card border border-border/60 rounded-2xl hover:border-accent/30 transition-all duration-500 group hover:shadow-xl hover:shadow-accent/5"
            style={{ transitionDelay: delay }}
        >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 mb-6">
                <Icon size={22} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">{title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}

