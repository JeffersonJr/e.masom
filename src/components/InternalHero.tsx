
import React from 'react';

interface InternalHeroProps {
    badge?: string;
    title: React.ReactNode;
    subtitle: string;
    centered?: boolean;
}

export default function InternalHero({ badge, title, subtitle, centered = false }: InternalHeroProps) {
    return (
        <section className={`relative pt-40 pb-24 px-6 overflow-hidden bg-background ${centered ? 'text-center' : ''}`}>
            {/* Background Gradient matching Home */}
            <div className={`absolute top-0 ${centered ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-full max-w-7xl h-full -z-10 bg-[radial-gradient(circle_at_${centered ? '50%_0%' : '20%_0%'},oklch(0.769_0.188_70.08_/_0.05)_0%,transparent_50%)]`} />

            <div className="max-w-7xl mx-auto flex flex-col items-start relative z-10">
                {badge && (
                    <div className={`inline-flex items-center gap-3 px-5 py-2.5 bg-muted/50 border border-border rounded-full text-[10px] font-black text-primary mb-12 tracking-[0.2em] uppercase ${centered ? 'mx-auto' : ''}`}>
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_oklch(0.769_0.188_70.08)]" />
                        {badge}
                    </div>
                )}

                <h1 className={`text-6xl md:text-8xl font-black tracking-tight text-primary leading-[0.95] mb-10 max-w-4xl ${centered ? 'mx-auto' : ''}`}>
                    <span className="block">{title}</span>
                </h1>

                <p className={`max-w-2xl text-xl text-muted-foreground mb-14 leading-relaxed font-medium ${centered ? 'mx-auto text-center' : ''}`}>
                    {subtitle}
                </p>
            </div>
        </section>
    );
}
