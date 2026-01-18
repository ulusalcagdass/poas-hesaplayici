'use client';

import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
    content: string;
}

export default function Tooltip({ content }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState<'right' | 'left'>('right');
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const spaceRight = window.innerWidth - triggerRect.right;
            const spaceLeft = triggerRect.left;

            // Prefer right, but flip to left if not enough space
            if (spaceRight < tooltipRect.width + 20 && spaceLeft > spaceRight) {
                setPosition('left');
            } else {
                setPosition('right');
            }
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
                aria-label="Info"
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
                        top: '50%',
                        transform: 'translateY(-50%)',
                        ...(position === 'right'
                            ? { left: '100%', marginLeft: '0.5rem' }
                            : { right: '100%', marginRight: '0.5rem' }
                        ),
                        zIndex: 1000,
                        background: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.8125rem',
                        color: 'var(--color-text-secondary)',
                        whiteSpace: 'normal',
                        maxWidth: 'min(220px, 60vw)',
                        wordWrap: 'break-word',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        animation: position === 'right' ? 'fadeInRight 0.15s ease-out' : 'fadeInLeft 0.15s ease-out',
                    }}
                >
                    <span style={{ whiteSpace: 'normal', display: 'block' }}>{content}</span>

                    {/* Arrow */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            ...(position === 'right'
                                ? { left: '-6px', borderRight: '6px solid var(--color-bg-tertiary)', borderTop: '6px solid transparent', borderBottom: '6px solid transparent' }
                                : { right: '-6px', borderLeft: '6px solid var(--color-bg-tertiary)', borderTop: '6px solid transparent', borderBottom: '6px solid transparent' }
                            ),
                            width: 0,
                            height: 0,
                        }}
                    />
                </div>
            )}

            <style jsx>{`
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateY(-50%) translateX(-4px); }
                    to { opacity: 1; transform: translateY(-50%) translateX(0); }
                }
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateY(-50%) translateX(4px); }
                    to { opacity: 1; transform: translateY(-50%) translateX(0); }
                }
            `}</style>
        </div>
    );
}
