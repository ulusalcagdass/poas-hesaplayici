'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

interface TooltipProps {
    content: string;
}

export default function Tooltip({ content }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isVisible && triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipWidth = 350;
            const spaceRight = window.innerWidth - triggerRect.right;

            let left: number;
            if (spaceRight >= tooltipWidth + 20) {
                // Position to the right
                left = triggerRect.right + 8;
            } else {
                // Position to the left
                left = triggerRect.left - tooltipWidth - 8;
            }

            // Keep tooltip within viewport
            left = Math.max(10, Math.min(left, window.innerWidth - tooltipWidth - 10));

            setTooltipPosition({
                top: triggerRect.top + triggerRect.height / 2,
                left: left,
            });
        }
    }, [isVisible]);

    const tooltipContent = isVisible && mounted && (
        <div
            role="tooltip"
            style={{
                position: 'fixed',
                top: tooltipPosition.top,
                left: tooltipPosition.left,
                transform: 'translateY(-50%)',
                zIndex: 99999,
                background: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                whiteSpace: 'normal',
                width: '350px',
                maxWidth: 'calc(100vw - 20px)',
                wordWrap: 'break-word',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                animation: 'fadeIn 0.15s ease-out',
                pointerEvents: 'none',
            }}
        >
            {content}
        </div>
    );

    return (
        <>
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
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                    transition: 'color 0.2s ease',
                }}
            >
                <Info size={16} />
            </button>

            {mounted && createPortal(tooltipContent, document.body)}

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </>
    );
}
