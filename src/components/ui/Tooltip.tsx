'use client';

import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
    content: string;
}

export default function Tooltip({ content }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState<'top' | 'bottom'>('top');
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isVisible && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const spaceAbove = rect.top;
            const spaceBelow = window.innerHeight - rect.bottom;
            setPosition(spaceAbove < 80 && spaceBelow > spaceAbove ? 'bottom' : 'top');
        }
    }, [isVisible]);

    return (
        <div style={{ position: 'relative', display: 'inline-flex' }}>
            <button
                ref={triggerRef}
                type="button"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onFocus={() => setIsVisible(true)}
                onBlur={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
                aria-label="Bilgi"
                style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                    transition: 'color 0.2s ease',
                }}
            >
                <Info size={16} />
            </button>

            {isVisible && (
                <div
                    ref={tooltipRef}
                    role="tooltip"
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        ...(position === 'top' ? { bottom: '100%', marginBottom: '0.5rem' } : { top: '100%', marginTop: '0.5rem' }),
                        zIndex: 1000,
                        background: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.8125rem',
                        color: 'var(--color-text-secondary)',
                        whiteSpace: 'nowrap',
                        maxWidth: '280px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        animation: 'fadeIn 0.15s ease-out',
                    }}
                >
                    <span style={{ whiteSpace: 'normal', display: 'block' }}>{content}</span>

                    {/* Arrow */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            ...(position === 'top'
                                ? { bottom: '-6px', borderTop: '6px solid var(--color-bg-tertiary)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent' }
                                : { top: '-6px', borderBottom: '6px solid var(--color-bg-tertiary)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent' }
                            ),
                            width: 0,
                            height: 0,
                        }}
                    />
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(4px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>
        </div>
    );
}
