'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Custom styled dropdown. A visually-hidden native select keeps native form
 * submission and required-field validation working while the visible menu is
 * fully styled to match the Viza interface.
 */
export default function StyledSelect({
  options = [],
  name,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Seleccionar',
  required = false,
  disabled = false,
  className = '',
  ariaLabel,
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const optionsSignature = JSON.stringify(options);
  const normalizedOptions = useMemo(
    () => options.map((option) => typeof option === 'string'
      ? { value: option, label: option }
      : { value: String(option.value ?? ''), label: option.label ?? String(option.value ?? '') }),
    [optionsSignature],
  );

  const selectedValue = isControlled ? String(value ?? '') : String(internalValue ?? '');
  const selectedOption = normalizedOptions.find((option) => option.value === selectedValue);

  function selectValue(nextValue) {
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  useEffect(() => {
    function closeOnOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', closeOnOutside);
    return () => document.removeEventListener('pointerdown', closeOnOutside);
  }, []);

  useEffect(() => {
    if (isControlled || !rootRef.current) return undefined;
    const form = rootRef.current.closest('form');
    if (!form) return undefined;
    const reset = () => {
      setInternalValue(defaultValue);
      setOpen(false);
    };
    form.addEventListener('reset', reset);
    return () => form.removeEventListener('reset', reset);
  }, [defaultValue, isControlled]);

  useEffect(() => {
    if (open) {
      const selectedIndex = normalizedOptions.findIndex((option) => option.value === selectedValue);
      const nextIndex = selectedIndex >= 0 ? selectedIndex : 0;
      setActiveIndex(nextIndex);
      requestAnimationFrame(() => optionRefs.current[nextIndex]?.focus());
    }
  }, [open, normalizedOptions, selectedValue]);

  function moveActive(direction) {
    const nextIndex = (activeIndex + direction + normalizedOptions.length) % normalizedOptions.length;
    setActiveIndex(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  }

  function handleTriggerKeyDown(event) {
    if (disabled) return;
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen(true);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(Math.max(0, normalizedOptions.length - 1));
    }
  }

  function handleOptionKeyDown(event, index) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
      optionRefs.current[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      const lastIndex = normalizedOptions.length - 1;
      setActiveIndex(lastIndex);
      optionRefs.current[lastIndex]?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === 'Tab') {
      setOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectValue(normalizedOptions[index].value);
    }
  }

  return (
    <div ref={rootRef} className={`styled-select ${className}${open ? ' styled-select-open' : ''}`}>
      {name && (
        <select
          className="styled-select-native"
          name={name}
          value={selectedValue}
          required={required}
          aria-hidden="true"
          tabIndex={-1}
          onChange={(event) => selectValue(event.target.value)}
          onInvalid={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
            setOpen(true);
          }}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {normalizedOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      )}

      <button
        ref={triggerRef}
        type="button"
        className="styled-select-trigger"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className={selectedOption ? 'styled-select-value' : 'styled-select-placeholder'}>
          {selectedOption?.label || placeholder}
        </span>
        <svg className="styled-select-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="styled-select-menu" role="listbox" aria-label={ariaLabel || placeholder}>
          {normalizedOptions.map((option, index) => (
            <button
              ref={(node) => { optionRefs.current[index] = node; }}
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === selectedValue}
              className="styled-select-option"
              onClick={() => selectValue(option.value)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span>{option.label}</span>
              {option.value === selectedValue && <span className="styled-select-check" aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
