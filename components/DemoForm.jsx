'use client';

import { useEffect, useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Front-end only; wire onSubmit to your form endpoint (e.g. HubSpot) when ready.
export default function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const successRef = useRef(null);

  useEffect(() => {
    if (submitted && successRef.current) successRef.current.focus();
  }, [submitted]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = {};
    if (!String(data.get('name') || '').trim()) {
      next.name = "We need a name to say hello properly. Add yours and you're set.";
    }
    const email = String(data.get('email') || '').trim();
    if (!email || !EMAIL_RE.test(email)) {
      next.email =
        "That email doesn't look right. Check for typos. Everything else you've typed is still here.";
    }
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  function clearError(field) {
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const rest = { ...prev };
      delete rest[field];
      return rest;
    });
  }

  if (submitted) {
    return (
      <div className="cta-form">
        <h3>Book a demo</h3>
        <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
          <span className="fs-icon">✓</span>
          <strong>Thanks, request received.</strong>
          <span>You&apos;ll hear from us within one working day.</span>
        </div>
      </div>
    );
  }

  return (
    <form className="cta-form" onSubmit={handleSubmit} noValidate>
      <h3>Book a demo</h3>
      <div className="form-row">
        <label htmlFor="f-name">Full name</label>
        <input
          id="f-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Amara Osei"
          required
          className={errors.name ? 'invalid' : undefined}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'f-name-error' : undefined}
          onInput={() => clearError('name')}
        />
        {errors.name && (
          <p className="form-error" id="f-name-error">
            {errors.name}
          </p>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="f-email">Work email</label>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="amara@company.com"
          required
          className={errors.email ? 'invalid' : undefined}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'f-email-error' : undefined}
          onInput={() => clearError('email')}
        />
        {errors.email && (
          <p className="form-error" id="f-email-error">
            {errors.email}
          </p>
        )}
      </div>
      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="f-company">Company</label>
          <input
            id="f-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
          />
        </div>
        <div className="form-row">
          <label htmlFor="f-size">Team size</label>
          <select id="f-size" name="size" defaultValue="26–100">
            <option>1–25</option>
            <option>26–100</option>
            <option>101–500</option>
            <option>500+</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary btn-lg btn-swap" type="submit">
        <span className="swap">
          <span>Book my demo</span>
          <span aria-hidden="true">Book my demo</span>
        </span>
      </button>
      <p className="form-note">No spam, no obligation. You&apos;ll hear from us within one working day.</p>
    </form>
  );
}
