
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
            className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-mason-green transition-all duration-300 group hover:shadow-xl hover:-translate-y-1"
            style={{ transitionDelay: delay }}
        >
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-mason-blue group-hover:bg-mason-blue group-hover:text-mason-green transition-colors mb-6">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-mason-blue mb-3">{title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}
